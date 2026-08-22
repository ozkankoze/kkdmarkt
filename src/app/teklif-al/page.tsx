import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Teklif Al",
  description:
    "İş güvenliği ekipmanları için hızlı ve toplu alım teklifi alın. Ürün listenizi iletin, aynı gün dönüş yapalım.",
  alternates: { canonical: "/teklif-al" },
};

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Teklif Al" }]} />
      <header className="mt-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Teklif Al</h1>
        <p className="mt-2 max-w-2xl text-muted">
          İhtiyacınız olan ürünleri ve adetleri yazın; en uygun fiyat ve termin bilgisiyle size
          dönelim.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-line p-6 sm:p-8">
          <Suspense fallback={<p className="text-muted">Form yükleniyor…</p>}>
            <QuoteForm />
          </Suspense>
        </div>

        <aside className="h-fit rounded-2xl bg-neutral-50 p-6">
          <h2 className="text-lg font-bold">Doğrudan iletişim</h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li>
              <span className="block text-muted">Telefon</span>
              <a href={site.contact.phoneHref} className="font-semibold hover:text-brand">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <span className="block text-muted">E-posta</span>
              <a href={`mailto:${site.contact.email}`} className="font-semibold hover:text-brand">
                {site.contact.email}
              </a>
            </li>
            <li>
              <span className="block text-muted">Adres</span>
              <span className="font-medium">
                {site.contact.address}
                <br />
                {site.contact.city}
              </span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
