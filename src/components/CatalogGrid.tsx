"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

const PAGE = 24;

export default function CatalogGrid({ items }: { items: Product[] }) {
  const [brand, setBrand] = useState<string>("");
  const [sort, setSort] = useState<"default" | "az" | "za">("default");
  const [shown, setShown] = useState(PAGE);

  const brands = useMemo(
    () => [...new Set(items.map((i) => i.brand).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr")),
    [items],
  );

  const filtered = useMemo(() => {
    let out = brand ? items.filter((i) => i.brand === brand) : items;
    if (sort === "az") out = [...out].sort((a, b) => a.name.localeCompare(b.name, "tr"));
    if (sort === "za") out = [...out].sort((a, b) => b.name.localeCompare(a.name, "tr"));
    return out;
  }, [items, brand, sort]);

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-neutral-50 px-6 py-16 text-center">
        <p className="font-semibold">Bu kategoride henüz ürün bulunmuyor.</p>
        <p className="mt-1 text-sm text-muted">
          İhtiyacınız olan ürün için bize ulaşın, tedarik edelim.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3 border-y border-line py-3">
        <span className="text-sm text-muted">
          <strong className="text-ink">{filtered.length}</strong> ürün
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          {brands.length > 1 && (
            <select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setShown(PAGE);
              }}
              aria-label="Markaya göre filtrele"
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium outline-none focus:border-brand"
            >
              <option value="">Tüm markalar</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            aria-label="Sırala"
            className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium outline-none focus:border-brand"
          >
            <option value="default">Önerilen sıralama</option>
            <option value="az">İsme göre (A-Z)</option>
            <option value="za">İsme göre (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.slice(0, shown).map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>

      {shown < filtered.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShown((s) => s + PAGE)}
            className="rounded-full border-2 border-brand px-8 py-3 font-semibold text-brand transition hover:bg-brand hover:text-white"
          >
            Daha fazla göster ({filtered.length - shown})
          </button>
        </div>
      )}
    </>
  );
}
