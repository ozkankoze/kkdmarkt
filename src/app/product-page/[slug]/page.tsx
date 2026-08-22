import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductDescription from "@/components/ProductDescription";
import { findGroup, findSubCategory } from "@/data/categories";
import { getProduct, products, productsByCategory, resolveSlug } from "@/data/products";
import { site } from "@/data/site";
import { wixImage } from "@/lib/img";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const description = p.description
    .replace(/^[^\n]*\n/, "")
    .replace(/\s+/g, " ")
    .slice(0, 300);
  return {
    title: p.name,
    description,
    alternates: { canonical: `/product-page/${p.slug}` },
    openGraph: {
      title: p.name,
      description,
      images: p.images[0] ? [wixImage(p.images[0], 1200, 1200)!] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) {
    // Eski Wix adresi olabilir — eşleşen ürüne kalıcı yönlendir
    const match = resolveSlug(slug);
    if (match) permanentRedirect(`/product-page/${match.slug}`);
    notFound();
  }

  const sub = p.categories.map(findSubCategory).find(Boolean);
  const group = sub ? findGroup(sub.groupSlug) : undefined;
  const related = sub
    ? productsByCategory(sub.slug)
        .filter((r) => r.slug !== p.slug)
        .slice(0, 5)
    : [];

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: p.name,
    description: p.description.replace(/\s+/g, " ").slice(0, 500),
    image: p.images.map((i) => wixImage(i, 1000, 1000)),
    brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined,
    sku: p.sku || undefined,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "TRY",
      url: `${site.url}/product-page/${p.slug}`,
    },
  };

  const quoteMessage = `Merhaba, "${p.name}" ürünü için fiyat teklifi almak istiyorum.`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          ...(group ? [{ href: `/${group.slug}`, label: group.name }] : []),
          ...(sub ? [{ href: `/${sub.slug}`, label: sub.name }] : []),
          { label: p.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Gallery images={p.images} alt={p.name} />

        <div>
          {p.brand && (
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-brand">{p.brand}</p>
          )}
          <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">{p.name}</h1>

          {p.sku && (
            <p className="mt-3 text-sm text-muted">
              Ürün kodu: <span className="font-medium text-ink">{p.sku}</span>
            </p>
          )}

          <div className="mt-6 rounded-2xl border border-line bg-neutral-50 p-5">
            <p className="text-sm font-semibold">Fiyat bilgisi ve stok durumu</p>
            <p className="mt-1 text-sm text-muted">
              Adet bazlı ve toplu alım fiyatlarımız için teklif talebinde bulunun.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/teklif-al?urun=${encodeURIComponent(p.name)}`}
                className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
              >
                Teklif İste
              </Link>
              <a
                href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(quoteMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#25D366] px-6 py-3 font-semibold text-[#128C7E] transition hover:bg-[#25D366] hover:text-white"
              >
                WhatsApp
              </a>
              <a
                href={site.contact.phoneHref}
                className="rounded-full border border-line px-6 py-3 font-semibold transition hover:border-brand hover:text-brand"
              >
                {site.contact.phone}
              </a>
            </div>
          </div>

          <div className="mt-8">
            <ProductDescription blocks={p.blocks} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold">Benzer Ürünler</h2>
            {sub && (
              <Link href={`/${sub.slug}`} className="text-sm font-semibold text-brand hover:underline">
                {sub.name} →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
