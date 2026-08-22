/**
 * Wix "Katalog → Ürünleri Dışa Aktar" CSV dosyasını src/data/products.json'a çevirir.
 *
 * Kullanım:  npm run import:wix -- /yol/catalog_products.csv
 *
 * CSV yapısı (Wix yeni katalog export'u):
 *   fieldType = PRODUCT  → ürün satırı
 *   fieldType = MEDIA    → aynı handle'a ait görsel satırı
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = process.argv[2];

if (!file || !existsSync(resolve(file))) {
  console.error("Kullanım: npm run import:wix -- <catalog_products.csv>");
  process.exit(1);
}

/* ---------------- CSV ayrıştırıcı ---------------- */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  const s = text.replace(/^﻿/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (inQuotes) {
      if (ch === '"') {
        if (s[i + 1] === '"') {
          cell += '"';
          i++;
        } else inQuotes = false;
      } else cell += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

/* ---------------- metin yardımcıları ---------------- */
/** Türkçe harfleri ve birleşik aksanları sadeleştirir */
function deTr(str = "") {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // birleşik aksan işaretleri (İ→i̇ sorunu)
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");
}

/** Wix'in ürün URL slug'ını birebir üretir */
function wixSlug(name = "") {
  return deTr(name)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const norm = (s = "") =>
  deTr(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

function decode(s = "") {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&rsquo;|&#8217;/g, "’")
    .replace(/&ldquo;|&#8220;/g, "“")
    .replace(/&rdquo;|&#8221;/g, "”")
    .replace(/&ndash;|&#8211;/g, "–")
    .replace(/&mdash;|&#8212;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&#0?10;/g, "\n");
}

const stripTags = (s = "") => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

/** Başlıklardan baştaki emoji ve süsleri temizler */
function cleanHeading(t = "") {
  return t
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}️‍\s•·\-–—]+/gu, "")
    .trim();
}

/**
 * Wix'te aralarındaki boşluk kaybolmuş "Etiket: açıklama" dizilerini ayırır.
 * Örn: "…güvenli kullanımHPPE + Likra iplik: Esnek…"
 */
function splitRunOn(text = "") {
  if (text.length < 120 || (text.match(/:/g) || []).length < 3) return [text];
  const parts = text
    .split(/(?<=[a-zçğıöşü)\].])(?=[A-ZÇĞİÖŞÜ0-9][^:]{2,45}:)/u)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 2 ? parts : [text];
}

/** <li> etiketlerine iç içe <ul> derinliğini yazar */
function markDepth(html) {
  let depth = 0;
  return html.replace(/<\s*(\/?)(ul|ol|li)\b[^>]*>/gi, (m, close, tag) => {
    const t = tag.toLowerCase();
    if (t === "li") return close ? "</li>" : `<li data-d="${Math.max(depth - 1, 0)}">`;
    if (close) {
      depth = Math.max(depth - 1, 0);
      return "</ul>";
    }
    depth++;
    return "<ul>";
  });
}

/**
 * Wix zengin metnini yapısal bloklara çevirir:
 *   { t:"h", x }            başlık
 *   { t:"p", x }            paragraf
 *   { t:"ul", items:[{x, sub?:[…]}] }  madde listesi
 */
function parseBlocks(html = "") {
  if (!html.trim()) return [];
  const src = markDepth(html.replace(/\r?\n/g, ""));

  const rows = [];
  const re = /<li data-d="(\d+)">([\s\S]*?)<\/li>|<p[^>]*>([\s\S]*?)<\/p>|<h([1-6])[^>]*>([\s\S]*?)<\/h\4>/gi;
  let m;
  while ((m = re.exec(src))) {
    if (m[1] !== undefined) {
      // iç içe listeleri ayıkla: dış <li> yalnızca kendi metnini alsın
      const inner = m[2].replace(/<ul>[\s\S]*?<\/ul>/gi, "");
      const text = stripTags(inner);
      if (text) rows.push({ kind: "li", depth: Number(m[1]), text });
      continue;
    }
    if (m[3] !== undefined) {
      const raw = m[3];
      const text = stripTags(raw);
      if (!text) continue;
      const withoutBold = raw
        .replace(/<span[^>]*font-weight:\s*(700|bold)[^>]*>[\s\S]*?<\/span>/gi, "")
        .replace(/<(strong|b)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
      // Kalan metin yalnızca emoji / noktalama ise başlık sayılır (örn. "📝 Ürün Açıklaması")
      const leftover = stripTags(withoutBold)
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}️‍]/gu, "")
        .replace(/[\s•·\-–—:|]/g, "");
      const isBold =
        /font-weight:\s*(700|bold)|<strong|<b\b/i.test(raw) && leftover === "";
      if (isBold && text.length < 90) {
        rows.push({ kind: "h", text: cleanHeading(text) });
        continue;
      }
      // Wix'te boşluğu kaybolmuş "Etiket: açıklama" dizilerini maddelere ayır
      const parts = splitRunOn(text);
      if (parts.length > 1) {
        for (const part of parts) rows.push({ kind: "li", depth: 0, text: part });
        continue;
      }
      rows.push({ kind: "p", text });
      continue;
    }
    if (m[5] !== undefined) {
      const text = stripTags(m[5]);
      if (text) rows.push({ kind: "h", text });
    }
  }

  // <p>/<li> hiç yoksa düz metne düş
  if (!rows.length) {
    const t = stripTags(src);
    return t ? [{ t: "p", x: t }] : [];
  }

  const blocks = [];
  for (const r of rows) {
    if (r.kind === "li") {
      let list = blocks[blocks.length - 1];
      if (!list || list.t !== "ul") {
        list = { t: "ul", items: [] };
        blocks.push(list);
      }
      if (r.depth > 0 && list.items.length) {
        const parent = list.items[list.items.length - 1];
        (parent.sub ??= []).push(r.text);
      } else {
        list.items.push({ x: r.text });
      }
    } else {
      blocks.push({ t: r.kind, x: r.text });
    }
  }
  return blocks;
}

/** Blokları meta açıklaması için düz metne çevirir */
function blocksToText(blocks) {
  return blocks
    .map((b) => {
      if (b.t === "ul")
        return b.items
          .map((i) => `• ${i.x}${i.sub ? "\n" + i.sub.map((s) => `  – ${s}`).join("\n") : ""}`)
          .join("\n");
      return b.x;
    })
    .join("\n\n")
    .trim();
}


/* ---------------- kategori eşlemesi ---------------- */
const catsSrc = readFileSync(join(__dirname, "../src/data/categories.ts"), "utf8");
const subs = [...catsSrc.matchAll(/slug:\s*"([a-z0-9-]+)",\s*name:\s*"([^"]+)"/g)].map((m) => ({
  slug: m[1],
  name: m[2],
}));
const knownSlugs = new Set(subs.map((c) => c.slug));
const byName = new Map(subs.map((c) => [norm(c.name), c.slug]));

/** Ana kategori slug'ları — ürünlerde geçse bile alt kategori sayılmaz */
const groupSlugs = new Set(
  [...catsSrc.matchAll(/slug:\s*"([a-z0-9-]+)",\s*name:\s*"[^"]+",\s*\n\s*children/g)].map(
    (m) => m[1],
  ),
);

/** Wix'te farklı adlandırılmış koleksiyonlar için el ile eşleme */
const ALIASES = {
  "yuksekte-calisma-ekipmanlari": "yuksekte-calisma",
  "el-koruma": "el-koruma-urunleri",
  "el-koruma-urunleri": "el-koruma-urunleri",
  tabanlik: "tabanliklar",
  "is-elbisesi": "is-elbiseleri",
};

const unmatched = new Map();

function mapCategories(value = "") {
  const out = [];
  for (const raw of value.split(/[;|]/).map((v) => v.trim()).filter(Boolean)) {
    const s = wixSlug(raw);
    if (ALIASES[s]) out.push(ALIASES[s]);
    else if (knownSlugs.has(s) || groupSlugs.has(s)) out.push(s);
    else if (byName.has(norm(raw))) out.push(byName.get(norm(raw)));
    else unmatched.set(s, (unmatched.get(s) ?? 0) + 1);
  }
  return [...new Set(out)];
}

/* -------- koleksiyonu olmayan ürünler için isimden kategori tahmini -------- */
const RULES = [
  [/kaynak.*eldiven|eldiven.*kaynak/, "kaynak-eldivenleri"],
  [/muayene|tek kullanimlik|lateks eldiven|pudrasiz|pudrali/, "muayene-tek-kullanimlik-is-eldivenleri"],
  [/(metal|celik) orgu/, "metal-orgu-eldivenler"],
  [/eldiven.*(isi|isiya|soguk|termal|aluminize)|(isi|isiya|soguk) .*eldiven/, "isi-eldivenleri"],
  [/eldiven.*(nitril|pu |poliuretan|kopuk|lateks)|(nitril|kopuk|poliuretan).*eldiven/, "nitril-is-eldivenleri"],
  [/deri.*eldiven|eldiven.*deri/, "deri-is-eldivenleri"],
  [/eldiven/, "mekanik-is-eldivenleri"],

  [/tabanlik/, "tabanliklar"],
  [/carik|burunluk/, "carik-celik-burunluk"],
  [/cizme|tulum yagmurluk|kasik cizme/, "cizmeler"],
  [/izole.*(ayakkabi|bot)|elektrikci (ayakkabi|bot)/, "izole-elektrikci-ayakkabilari"],
  [/ortopedik/, "ortopedik-is-ayakkabilari"],
  [/(bot|botu)\b/, "is-botlari"],
  [/ayakkabi|sandalet|sandaleti/, "is-ayakkabilari"],

  [/(gaz|toz|partikul|kombine|organik).*filtre|filtre|filtresi/, "yuz-maskesi-filtresi"],
  [/tam yuz/, "tam-yuz-maskesi"],
  [/yarim yuz/, "yarim-yuz-maskesi"],
  [/ffp|toz maske/, "toz-maskesi"],

  [/(goz|vucut|boy) dusu|gozdusu/, "vucut-ve-goz-dusu"],
  [/solusyon/, "goz-dusu-solusyonu"],
  [/gozluk|gozlugu/, "koruyucu-gozlukler"],

  [/kulaklik|kulakligi|kulak tikaci|dispanser|hijyen kiti/, "kulak-koruyucu-donanimlar"],
  [/aluminize baslik|bas korumasi|boyun korumasi/, "aluminize-baslik"],
  [/baret|kask/, "is-guvenligi-baretleri"],
  [/darbe emici|kep\b|sapka/, "darbe-emici-sapkalar"],
  [/ter bandi|cene bandi|vizor|baret aksesuar/, "baret-aksesuarlari"],

  [/onluk|onlugu/, "is-onlukleri"],
  [/mont|parka|kaban|yagmurluk/, "is-montu-ve-parkalar"],
  [/yelek|yelegi/, "yelekler"],
  [/sweatshirt|tisort|polar/, "sweatshirtler"],
  [/gomlek/, "gomlekler"],
  [/takim/, "takim-kiyafetler"],
  [/ceket/, "ceketler"],
  [/termal|corap|soguk hava pantolon/, "termal-iclik-ve-giyim"],
  [/antistatik kiyafet/, "antistatik-kiyafetler"],
  [/aleve dayanikli|alev almaz/, "alev-almaz-kiyafetler"],
  [/aluminize/, "aluminize-elbiseler"],
  [/itfaiyeci/, "itfaiyeci-elbiseleri"],

  [/karabina/, "karabina"],
  [/makara/, "makara"],
  [/kemer|kemeri/, "emniyet-kemeri"],
  [/lanyard|halat|perlon|yasam hatti|ankraj|dusus (durdurucu|tutucu)/, "ip-ve-perlon"],
  [/travma askisi|kurtarma/, "kurtarma-ekipmanlari"],

  [/asma kilit|kilidi/, "emniyet-asma-kilitler"],
  [/uyari etiket|etiketi/, "eked-uyari-etiketleri"],
  [/istasyon/, "eked-istasyon-modelleri"],
  [/coklandirici/, "coklandiricilar"],
  [/pnomatik/, "pnomatik-baglanti-kilitleme-ekipmanlari"],
  [/vana kilitleme/, "vana-kilitleme-ekipmanlari"],
  [/kablo kilitleme/, "kablo-kilitleme-ekipmanlari"],
  [/salter|devre kesici/, "salter-kilitleme-ekipmanlari"],
];

function guessCategory(name) {
  const n = norm(name);
  for (const [re, slug] of RULES) if (re.test(n)) return slug;
  return null;
}

/* ---------------- ana akış ---------------- */
const rows = parseCsv(readFileSync(resolve(file), "utf8"));
const header = rows[0].map((h) => h.trim());
const col = (name) => header.findIndex((h) => h.toLowerCase() === name.toLowerCase());

const C = {
  handle: col("handle"),
  fieldType: col("fieldType"),
  name: col("name"),
  visible: col("visible"),
  description: col("plainDescription") !== -1 ? col("plainDescription") : col("description"),
  categorySlugs: col("categorySlugs"),
  primaryCategory: col("primaryCategorySlug"),
  media: col("media"),
  ribbon: col("ribbon"),
  brand: col("brand"),
  sku: col("sku"),
};

if (C.name === -1 || C.fieldType === -1) {
  console.error("Beklenen sütunlar bulunamadı. Başlıklar:", header.slice(0, 15).join(", "));
  process.exit(1);
}

/* görselleri handle'a göre topla */
const mediaByHandle = new Map();
for (const r of rows.slice(1)) {
  if ((r[C.fieldType] || "").toUpperCase() !== "MEDIA") continue;
  const h = r[C.handle];
  const m = (r[C.media] || "").trim();
  if (!h || !m) continue;
  if (!mediaByHandle.has(h)) mediaByHandle.set(h, []);
  mediaByHandle.get(h).push(m);
}

const out = [];
const seen = new Set();
let hidden = 0;

for (const r of rows.slice(1)) {
  if ((r[C.fieldType] || "").toUpperCase() !== "PRODUCT") continue;

  const name = (r[C.name] || "").trim();
  if (!name) continue;
  if (C.visible !== -1 && (r[C.visible] || "").trim().toLowerCase() === "false") {
    hidden++;
    continue;
  }

  let slug = wixSlug(name);
  if (!slug) continue;
  if (seen.has(slug)) {
    let i = 2;
    while (seen.has(`${slug}-${i}`)) i++;
    slug = `${slug}-${i}`;
  }
  seen.add(slug);

  const handle = r[C.handle];
  const rawMedia = mediaByHandle.get(handle) ?? [];
  const inline = C.media !== -1 ? (r[C.media] || "").split(";").map((s) => s.trim()) : [];
  const images = [...new Set([...inline, ...rawMedia])]
    .filter(Boolean)
    .map((m) =>
      m.startsWith("http") ? m.split("/v1/")[0] : `https://static.wixstatic.com/media/${m}`,
    );

  let cats = mapCategories(
    [C.primaryCategory !== -1 ? r[C.primaryCategory] : "", C.categorySlugs !== -1 ? r[C.categorySlugs] : ""]
      .filter(Boolean)
      .join(";"),
  );

  const blocks = C.description !== -1 ? parseBlocks(r[C.description]) : [];

  // yalnızca ana kategoriye bağlı ya da hiç kategorisi olmayan ürünler için tahmin
  const hasSub = cats.some((c) => !groupSlugs.has(c));
  if (!hasSub) {
    const guess = guessCategory(name);
    if (guess) cats = [...new Set([...cats, guess])];
  }

  out.push({
    slug,
    name,
    brand: C.brand !== -1 ? (r[C.brand] || "").trim() : "",
    categories: cats,
    images,
    blocks,
    description: blocksToText(blocks),
    sku: C.sku !== -1 ? (r[C.sku] || "").trim() : "",
    featured: C.ribbon !== -1 ? Boolean((r[C.ribbon] || "").trim()) : false,
  });
}

writeFileSync(join(__dirname, "../src/data/products.json"), JSON.stringify(out));

const noCat = out.filter((p) => !p.categories.length);
const noImg = out.filter((p) => !p.images.length);

console.log(`✓ ${out.length} ürün içe aktarıldı  (gizli/atlanan: ${hidden})`);
console.log(`  kategorisiz: ${noCat.length}   görselsiz: ${noImg.length}`);
if (noCat.length) {
  console.log("  örnek kategorisiz:", noCat.slice(0, 5).map((p) => p.name).join(" | "));
}
if (unmatched.size) {
  console.log(`\n⚠ Menüde karşılığı olmayan ${unmatched.size} koleksiyon (çoğu marka koleksiyonu):`);
  [...unmatched.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)
    .forEach(([k, v]) => console.log(`  ${String(v).padStart(4)} × ${k}`));
}
