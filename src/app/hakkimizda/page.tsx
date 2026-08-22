import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { categoryGroups } from "@/data/categories";
import { about, brands, site } from "@/data/site";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: site.description,
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Hakkımızda" }]} />
      <header className="mt-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Hakkımızda</h1>
      </header>

      <p className="mt-6 text-lg leading-relaxed text-ink/85">{about.short}</p>

      <p className="mt-5 leading-relaxed text-ink/80">
        El korumadan ayak korumaya, solunum korumadan yüksekte çalışma ekipmanlarına kadar{" "}
        {categoryGroups.length} ana kategoride {products.length}&apos;den fazla ürünü tek çatı
        altında topluyoruz. Çalıştığımız {brands.length}&apos;ten fazla global ve yerli markanın
        tamamı ilgili EN standartlarına uygun, sertifikalı ürünlerden oluşuyor.
      </p>

      <p className="mt-5 leading-relaxed text-ink/80">
        Amacımız, işletmelerin iş sağlığı ve güvenliği yükümlülüklerini yerine getirirken doğru
        ürünü, doğru fiyata ve zamanında temin etmesini sağlamak. Ürün seçiminden risk analizine
        uygun donanım belirlenmesine kadar her aşamada destek veriyoruz.
      </p>

      <dl className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { k: `${products.length}+`, v: "Ürün çeşidi" },
          { k: `${brands.length}+`, v: "Marka" },
          { k: "EN", v: "Sertifikalı ürünler" },
        ].map((s) => (
          <div key={s.v} className="rounded-2xl border border-line p-6">
            <dt className="text-3xl font-extrabold text-brand">{s.k}</dt>
            <dd className="mt-1 text-sm text-muted">{s.v}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-14 rounded-2xl bg-brand-50 p-8">
        <h2 className="text-xl font-bold">Bize ulaşın</h2>
        <p className="mt-2 text-sm text-ink/75">
          {site.contact.address}, {site.contact.city}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/teklif-al"
            className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
          >
            Teklif Al
          </Link>
          <a
            href={site.contact.phoneHref}
            className="rounded-full border-2 border-brand px-6 py-3 font-semibold text-brand transition hover:bg-brand hover:text-white"
          >
            {site.contact.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
