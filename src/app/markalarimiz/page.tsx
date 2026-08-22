import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { brands } from "@/data/site";
import { brandNames } from "@/data/products";
import { wixImage } from "@/lib/img";

export const metadata: Metadata = {
  title: "Markalarımız",
  description:
    "KKDMARKT bünyesinde bulunan iş güvenliği markaları: Ansell, 3M, Coverguard, Base, Cofra, Delta Plus, Honeywell, Uvex ve daha fazlası.",
  alternates: { canonical: "/markalarimiz" },
};

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Markalarımız" }]} />
      <header className="mt-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Markalarımız</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Dünyanın önde gelen kişisel koruyucu donanım üreticileriyle çalışıyoruz.
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {brands.map((b) => {
          const hasProducts = brandNames.some(
            (n) => n.toLocaleLowerCase("tr") === b.name.toLocaleLowerCase("tr"),
          );
          const card = (
            <div className="grid h-32 place-items-center rounded-2xl border border-line bg-white p-5 transition hover:border-brand hover:shadow-lg hover:shadow-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={wixImage(b.logo, 260, 140, 90)}
                alt={b.name}
                className="max-h-16 w-full object-contain"
                loading="lazy"
              />
            </div>
          );
          return (
            <li key={b.name}>
              {hasProducts ? (
                <Link href={`/arama?q=${encodeURIComponent(b.name)}`} title={`${b.name} ürünleri`}>
                  {card}
                </Link>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
