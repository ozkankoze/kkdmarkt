import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const products = JSON.parse(
  readFileSync(join(__dirname, "../src/data/products.json"), "utf8"),
);

const index = products.map((p) => ({
  s: p.slug,
  n: p.name,
  b: p.brand || "",
  ...(p.images?.[0] ? { i: p.images[0] } : {}),
}));

writeFileSync(join(__dirname, "../public/search-index.json"), JSON.stringify(index));
console.log(`search-index.json: ${index.length} kayıt`);
