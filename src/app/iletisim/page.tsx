import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: `KKDMARKT iletişim bilgileri — ${site.contact.phone}, ${site.contact.email}, ${site.contact.city}.`,
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  const q = encodeURIComponent(`${site.contact.address} ${site.contact.city}`);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumbs items={[{ label: "İletişim" }]} />
      <header className="mt-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">İletişim</h1>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <dl className="space-y-6">
            <div>
              <dt className="text-sm font-semibold text-muted">Telefon</dt>
              <dd className="mt-1 text-lg">
                <a href={site.contact.phoneHref} className="font-bold hover:text-brand">
                  {site.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">E-posta</dt>
              <dd className="mt-1 text-lg">
                <a href={`mailto:${site.contact.email}`} className="font-bold hover:text-brand">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Adres</dt>
              <dd className="mt-1 leading-relaxed">
                {site.contact.address}
                <br />
                {site.contact.city}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/teklif-al"
              className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
            >
              Teklif Al
            </Link>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-[#25D366] px-6 py-3 font-semibold text-[#128C7E] transition hover:bg-[#25D366] hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line">
          <iframe
            title="KKDMARKT konum"
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            className="h-80 w-full lg:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
