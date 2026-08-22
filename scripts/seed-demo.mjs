/**
 * Geçici demo verisi üretir.
 * Gerçek Wix CSV export'u geldiğinde `npm run import:wix -- <dosya.csv>` ile
 * src/data/products.json üzerine yazılır ve bu script'e gerek kalmaz.
 */
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const catsSrc = readFileSync(join(__dirname, "../src/data/categories.ts"), "utf8");

// categories.ts içinden slug/name çiftlerini kaba biçimde okur
const subs = [...catsSrc.matchAll(/\{ slug: "([a-z0-9-]+)", name: "([^"]+)" \}/g)].map((m) => ({
  slug: m[1],
  name: m[2],
}));
const multiline = [...catsSrc.matchAll(/\{\s*slug: "([a-z0-9-]+)",\s*name: "([^"]+)",\s*\}/g)].map(
  (m) => ({ slug: m[1], name: m[2] }),
);
const all = [...subs, ...multiline].filter(
  (v, i, a) => a.findIndex((x) => x.slug === v.slug) === i,
);

const brands = [
  "Ansell",
  "Coverguard",
  "Base",
  "Cofra",
  "3M",
  "Activehand",
  "Locksan",
  "Starline",
  "Uvex",
  "Delta Plus",
  "Honeywell",
  "Mekap",
];

const out = [];
let n = 0;
for (const c of all) {
  const count = 4;
  for (let i = 1; i <= count; i++) {
    n++;
    const brand = brands[n % brands.length];
    const name = `${brand} ${c.name} Modeli ${i}`;
    out.push({
      slug: `${c.slug}-demo-${i}`,
      name,
      brand,
      categories: [c.slug],
      images: [],
      description: `📝 Ürün Açıklaması\nBu bir örnek kayıttır. Gerçek ürün verisi Wix export'u içe aktarıldığında burada görünecektir.\n\n⭐ Öne Çıkan Özellikler\n • ${c.name} kategorisinde profesyonel kullanım\n • İlgili EN standartlarına uygun\n • Dayanıklı ve konforlu yapı`,
      sku: `DEMO-${String(n).padStart(4, "0")}`,
      featured: n % 37 === 0,
    });
  }
}

writeFileSync(join(__dirname, "../src/data/products.json"), JSON.stringify(out, null, 0));
console.log(`${out.length} demo ürün yazıldı (${all.length} kategori).`);
