import Link from "next/link";
import Logo from "./Logo";
import { site, standards } from "@/data/site";
import { categoryGroups } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-brand bg-neutral-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="text-2xl" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
          <div className="mt-5 flex gap-2">
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold transition hover:border-brand hover:text-brand"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold transition hover:border-brand hover:text-brand"
            >
              E-posta
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold text-brand">Ürün Grupları</h3>
          <ul className="space-y-2 text-sm">
            {categoryGroups.map((g) => (
              <li key={g.slug}>
                <Link href={`/${g.slug}`} className="text-muted transition hover:text-brand">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold text-brand">Standartlar</h3>
          <ul className="space-y-2 text-sm">
            {standards.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="text-muted transition hover:text-brand">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold text-brand">İletişim</h3>
          <address className="space-y-3 text-sm not-italic text-muted">
            <p>
              {site.contact.address}
              <br />
              {site.contact.city}
            </p>
            <p>
              <a href={site.contact.phoneHref} className="font-semibold text-ink hover:text-brand">
                {site.contact.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.contact.email}`}
                className="font-semibold text-ink hover:text-brand"
              >
                {site.contact.email}
              </a>
            </p>
          </address>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <Link href="/hakkimizda" className="text-muted transition hover:text-brand">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/markalarimiz" className="text-muted transition hover:text-brand">
                Markalarımız
              </Link>
            </li>
            <li>
              <Link href="/teklif-al" className="text-muted transition hover:text-brand">
                Teklif Al
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
          </p>
          <p>Fiyatlar ve stok durumu için lütfen teklif talebinde bulunun.</p>
          <p>
            Web tasarım:{" "}
            <a
              href="https://www.medya333.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink transition hover:text-brand"
            >
              Medya 333
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
