import Link from "next/link";
import ProductCard, { ProductImage } from "@/components/ProductCard";
import { categoryGroups } from "@/data/categories";
import { featuredProducts, groupCount, heroProducts, products } from "@/data/products";
import { about, brands, highlights, site } from "@/data/site";
import { wixImage } from "@/lib/img";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-48 hidden size-[42rem] rounded-full bg-brand/[0.08] blur-3xl lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-[-14rem] hidden size-[26rem] rounded-full bg-brand/5 blur-3xl lg:block"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:py-20">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
              <span className="size-1.5 rounded-full bg-brand" />
              Kişisel Koruyucu Donanım
            </p>
            <h1 className="text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl">
              Güvenlik bir seçenek değil,
              <br />
              <span className="text-brand">zorunluluktur.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
              Baştan ayağa sertifikalı iş güvenliği ekipmanları. {products.length}+ ürün,{" "}
              {categoryGroups.length} ana kategori, {brands.length}+ global marka — tek tedarikçiden.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/teklif-al"
                className="rounded-full bg-brand px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-600"
              >
                Hemen Teklif Al
              </Link>
              <a
                href={`https://wa.me/${site.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-line px-7 py-3.5 font-semibold text-ink transition hover:border-brand hover:text-brand"
              >
                WhatsApp&apos;tan sor
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm font-medium text-muted">
              {["EN sertifikalı ürünler", "Toplu alım avantajı", "Hızlı tedarik"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg
                    className="size-4 text-brand"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Ürün vitrini */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand via-brand-600 to-brand-700"
            />
            <div
              aria-hidden
              className="absolute inset-0 rounded-[2rem] opacity-[0.06] [background-image:repeating-linear-gradient(45deg,#fff_0_18px,transparent_18px_44px)]"
            />
            <div className="relative grid grid-cols-2 gap-3 p-5 sm:gap-4 sm:p-7">
              {heroProducts.map(({ product, label }) => (
                <Link
                  key={product.slug}
                  href={`/product-page/${product.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/10 transition hover:-translate-y-1"
                >
                  <div className="aspect-square p-3">
                    <ProductImage
                      src={product.images[0]}
                      alt={product.name}
                      size={360}
                      priority
                      className="size-full object-contain"
                    />
                  </div>
                  <span className="border-t border-line px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-brand">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="h-2 w-full [background-image:repeating-linear-gradient(45deg,#fc111d_0_14px,#14181f_14px_28px)]"
        />
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
                className="grid h-28 w-48 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white px-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wixImage(b.logo, 380, 200, 90)}
                  alt={b.name}
                  className="max-h-20 w-full scale-110 object-contain"
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
