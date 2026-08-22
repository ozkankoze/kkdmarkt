import raw from "./products.json";
import { allSubCategories, categoryGroups } from "./categories";

export type Block =
  | { t: "h"; x: string }
  | { t: "p"; x: string }
  | { t: "ul"; items: { x: string; sub?: string[] }[] };

export type Product = {
  /** Wix ile aynı slug — /product-page/<slug> */
  slug: string;
  name: string;
  brand: string;
  /** Alt kategori slug'ları */
  categories: string[];
  images: string[];
  /** Yapısal açıklama blokları */
  blocks: Block[];
  /** Düz metin karşılığı (meta etiketleri ve arama için) */
  description: string;
  sku?: string;
  featured?: boolean;
};

export const products: Product[] = raw as Product[];

export const productBySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string) {
  return productBySlug.get(slug);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categories.includes(slug));
}

export function productsByGroup(groupSlug: string): Product[] {
  const group = categoryGroups.find((g) => g.slug === groupSlug);
  if (!group) return [];
  const kids = new Set(group.children.map((c) => c.slug));
  return products.filter((p) => p.categories.some((c) => kids.has(c)));
}

export function productsByBrand(brand: string): Product[] {
  const b = brand.toLocaleLowerCase("tr");
  return products.filter((p) => p.brand.toLocaleLowerCase("tr") === b);
}

export const brandNames = [...new Set(products.map((p) => p.brand).filter(Boolean))].sort(
  (a, b) => a.localeCompare(b, "tr"),
);

export function categoryCount(slug: string) {
  return products.reduce((n, p) => n + (p.categories.includes(slug) ? 1 : 0), 0);
}

export function groupCount(groupSlug: string) {
  return productsByGroup(groupSlug).length;
}

/** Türkçe karakterleri ve birleşik aksanları sadeleştirir */
export function fold(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
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

/** Arama ve eşleştirme için normalize edilmiş anahtar */
export function normalize(s: string) {
  return fold(s)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Bir metni Wix ile aynı biçimde slug'a çevirir (Türkçe harfler sadeleştirilmiş) */
export function toSlug(s: string) {
  return fold(s)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Eski Wix ürün adreslerini yeni slug'lara eşler.
 * 1) birebir  2) Türkçe harfler sadeleştirilmiş  3) önek  4) kelime örtüşmesi
 */
export function resolveSlug(input: string): Product | undefined {
  const raw = (() => {
    try {
      return decodeURIComponent(input);
    } catch {
      return input;
    }
  })();

  const direct = productBySlug.get(raw);
  if (direct) return direct;

  const folded = toSlug(raw);
  const byFold = productBySlug.get(folded);
  if (byFold) return byFold;

  const prefix = products.find(
    (p) => p.slug.startsWith(folded) || folded.startsWith(p.slug),
  );
  if (prefix && folded.length > 12) return prefix;

  const terms = folded.split("-").filter((t) => t.length > 2);
  if (terms.length < 2) return undefined;
  let best: { p: Product; score: number } | undefined;
  for (const p of products) {
    const parts = new Set(p.slug.split("-"));
    let hit = 0;
    for (const t of terms) if (parts.has(t)) hit++;
    const score = hit / Math.max(terms.length, parts.size);
    if (!best || score > best.score) best = { p, score };
  }
  return best && best.score >= 0.6 ? best.p : undefined;
}

export type SearchDoc = { slug: string; name: string; brand: string; image?: string; key: string };

export const searchIndex: SearchDoc[] = products.map((p) => ({
  slug: p.slug,
  name: p.name,
  brand: p.brand,
  image: p.images[0],
  key: normalize(`${p.name} ${p.brand} ${p.sku ?? ""}`),
}));

export function searchProducts(q: string, limit = 60): Product[] {
  const terms = normalize(q).split(" ").filter(Boolean);
  if (!terms.length) return [];
  const hits: { p: Product; score: number }[] = [];
  for (let i = 0; i < products.length; i++) {
    const key = searchIndex[i].key;
    let score = 0;
    let ok = true;
    for (const t of terms) {
      const at = key.indexOf(t);
      if (at === -1) {
        ok = false;
        break;
      }
      score += at === 0 ? 3 : 1;
    }
    if (ok) hits.push({ p: products[i], score });
  }
  return hits
    .sort((a, b) => b.score - a.score || a.p.name.localeCompare(b.p.name, "tr"))
    .slice(0, limit)
    .map((h) => h.p);
}

export const featuredProducts = (() => {
  const withRibbon = products.filter((p) => p.featured && p.images.length);
  if (withRibbon.length >= 12) return withRibbon.slice(0, 12);

  // Ribbon yoksa her ana kategoriden görselli birer ürün seç
  const picked: Product[] = [...withRibbon];
  const taken = new Set(picked.map((p) => p.slug));
  for (const g of categoryGroups) {
    const cand = productsByGroup(g.slug).find((p) => p.images.length && !taken.has(p.slug));
    if (cand) {
      picked.push(cand);
      taken.add(cand.slug);
    }
  }
  for (const p of products) {
    if (picked.length >= 12) break;
    if (p.images.length && !taken.has(p.slug)) {
      picked.push(p);
      taken.add(p.slug);
    }
  }
  return picked.slice(0, 12);
})();

/**
 * Anasayfa hero bölümündeki dört vitrin ürünü.
 * Değiştirmek için aşağıdaki kategori sırasını düzenlemeniz yeterli.
 */
export const heroProducts = (() => {
  const wanted = [
    { slug: "is-guvenligi-baretleri", label: "Kafa Koruma" },
    { slug: "nitril-is-eldivenleri", label: "El Koruma" },
    { slug: "is-botlari", label: "Ayak Koruma" },
    { slug: "kulak-koruyucu-donanimlar", label: "Kulak Koruma" },
  ];
  const taken = new Set<string>();
  const out: { product: Product; label: string }[] = [];
  for (const w of wanted) {
    const p = productsByCategory(w.slug).find((x) => x.images.length && !taken.has(x.slug));
    if (p) {
      taken.add(p.slug);
      out.push({ product: p, label: w.label });
    }
  }
  for (const p of products) {
    if (out.length >= 4) break;
    if (p.images.length && !taken.has(p.slug)) {
      taken.add(p.slug);
      out.push({ product: p, label: p.brand || "KKD" });
    }
  }
  return out.slice(0, 4);
})();

/** Kategori sayfalarında kullanılacak kapak görseli */
export function categoryCover(slug: string) {
  return productsByCategory(slug)[0]?.images[0];
}

export function groupCover(groupSlug: string) {
  return productsByGroup(groupSlug)[0]?.images[0];
}

export const subCategoriesWithCounts = allSubCategories.map((c) => ({
  ...c,
  count: categoryCount(c.slug),
}));
