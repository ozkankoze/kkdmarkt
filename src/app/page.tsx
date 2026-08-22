import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categoryGroups } from "@/data/categories";
import { featuredProducts, groupCount, products } from "@/data/products";
import { about, brands, highlights, site } from "@/data/site";
import { wixImage } from "@/lib/img";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-900">
        {site.hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={wixImage(site.hero, 1800, 900, 85)}
            alt=""
            className="absolute inset-0 size-full object-cover opacity-70"
            fetchPriority="high"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 lg:py-32">
          <p className="mb-4 inline-flex rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            Kişisel Koruyucu Donanım
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Güvenlik bir seçenek değil,{" "}
            <span className="text-brand">zorunluluktur.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Kaliteli KKD ürünleriyle çalışanlarınız güvende, işiniz emin ellerde.{" "}
            {products.length}+ ürün, {categoryGroups.length} ana kategori.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/teklif-al"
              className="rounded-full bg-brand px-6 py-3.5 font-semibold text-white transition hover:bg-brand-600"
            >
              Hemen Teklif Al
            </Link>
            <Link
              href="/markalarimiz"
              className="rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-ink"
            >
              Markalarımız
            </Link>
          </div>
        </div>
      </section>

      {/* Güven bandı */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-line px-0 sm:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="bg-white px-6 py-7">
              <h2 className="text-base font-bold text-brand">{h.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kategoriler */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Ürün Kategorileri</h2>
            <p className="mt-2 text-muted">Baştan ayağa komple koruma ekipmanları.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categoryGroups.map((g) => (
            <Link
              key={g.slug}
              href={`/${g.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg hover:shadow-black/5"
            >
              <div>
                <h3 className="text-base font-bold leading-snug transition group-hover:text-brand">
                  {g.name}
                </h3>
                <p className="mt-1 text-xs text-muted">{g.children.length} alt kategori</p>
              </div>
              <span className="mt-6 text-sm font-semibold text-brand">
                {groupCount(g.slug)} ürün →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Markalar */}
      <section className="border-y border-line bg-neutral-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Markalarımız</h2>
            <Link href="/markalarimiz" className="text-sm font-semibold text-brand hover:underline">
              Tümünü gör →
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-4">
            {[...brands, ...brands].map((b, i) => (
              <div
                key={`${b.name}-${i}`}
                className="grid h-24 w-40 shrink-0 place-items-center rounded-xl border border-line bg-white px-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wixImage(b.logo, 220, 120, 90)}
                  alt={b.name}
                  className="max-h-14 w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Öne çıkan ürünler */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold sm:text-4xl">En Çok Tercih Edilenler</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* Hakkımızda */}
      <section className="bg-brand-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-brand sm:text-4xl">Hakkımızda</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/80">{about.short}</p>
            <Link
              href="/hakkimizda"
              className="mt-7 inline-flex rounded-full border-2 border-brand px-6 py-3 font-semibold text-brand transition hover:bg-brand hover:text-white"
            >
              Devamını Gör
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {[
              { k: `${products.length}+`, v: "Ürün çeşidi" },
              { k: `${brands.length}+`, v: "Global marka" },
              { k: `${categoryGroups.length}`, v: "Ana kategori" },
              { k: "EN", v: "Sertifikalı ürünler" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-white p-6">
                <dt className="text-3xl font-extrabold text-brand">{s.k}</dt>
                <dd className="mt-1 text-sm text-muted">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              İhtiyacınıza özel toplu alım teklifi
            </h2>
            <p className="mt-2 text-white/85">
              Ürün listenizi iletin, aynı gün içinde fiyat teklifi hazırlayalım.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/teklif-al"
              className="rounded-full bg-white px-6 py-3.5 font-semibold text-brand transition hover:bg-white/90"
            >
              Teklif Formu
            </Link>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/60 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp&apos;tan yaz
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
