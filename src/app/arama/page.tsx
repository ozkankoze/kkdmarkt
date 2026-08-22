import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CatalogGrid from "@/components/CatalogGrid";
import { searchProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Arama",
  robots: { index: false, follow: true },
};

async function Results({ q }: { q: string }) {
  const items = q ? searchProducts(q, 240) : [];
  return (
    <>
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          {q ? <>&ldquo;{q}&rdquo; için sonuçlar</> : "Ürün ara"}
        </h1>
        <p className="mt-2 text-muted">
          {q ? `${items.length} ürün bulundu.` : "Yukarıdaki arama kutusunu kullanabilirsiniz."}
        </p>
      </header>
      {q && <CatalogGrid items={items} />}
    </>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Arama" }]} />
      <Suspense fallback={<p className="py-10 text-muted">Aranıyor…</p>}>
        <Results q={q.trim()} />
      </Suspense>
    </div>
  );
}
