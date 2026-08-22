"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import { categoryGroups } from "@/data/categories";
import { site } from "@/data/site";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`size-3.5 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Slogan bandı */}
      <div className="bg-brand text-white">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[13px] font-medium tracking-wide">
          &ldquo;{site.slogan}&rdquo;
        </p>
      </div>

      {/* Üst satır */}
      <div className="border-b border-line/70">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:py-4">
          <Logo className="text-2xl md:text-[28px]" />

          <div className="mx-auto hidden w-full max-w-xl lg:block">
            <SearchBox />
          </div>

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Link
              href="/markalarimiz"
              className={`rounded-full px-3 py-2 text-sm font-semibold transition hover:text-brand ${
                pathname === "/markalarimiz" ? "text-brand" : "text-ink"
              }`}
            >
              Markalarımız
            </Link>
            <a
              href={site.contact.phoneHref}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink transition hover:text-brand"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4Z" />
              </svg>
              {site.contact.phone}
            </a>
            <Link
              href="/teklif-al"
              className="rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Teklif Al
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Menüyü aç"
            className="ml-auto grid size-10 place-items-center rounded-lg border border-line lg:hidden"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        {/* Mobil arama */}
        <div className="px-4 pb-3 lg:hidden">
          <SearchBox compact />
        </div>
      </div>

      {/* Kategori çubuğu */}
      <nav
        aria-label="Ürün kategorileri"
        className="hidden border-b border-line bg-white lg:block"
        onMouseLeave={() => setOpenGroup(null)}
      >
        <div className="mx-auto flex max-w-7xl items-stretch gap-0.5 overflow-x-auto px-4 no-scrollbar">
          <Link
            href="/"
            className={`flex items-center whitespace-nowrap px-2 py-3 text-[12.5px] font-semibold transition xl:px-3 xl:text-[14px] ${
              pathname === "/" ? "text-brand" : "text-ink hover:text-brand"
            }`}
          >
            Anasayfa
          </Link>
          {categoryGroups.map((g) => {
            const isOpen = openGroup === g.slug;
            const isActive = pathname === `/${g.slug}` || g.children.some((c) => pathname === `/${c.slug}`);
            return (
              <div key={g.slug} className="static" onMouseEnter={() => setOpenGroup(g.slug)}>
                <Link
                  href={`/${g.slug}`}
                  aria-expanded={isOpen}
                  className={`flex h-full items-center gap-1 whitespace-nowrap px-2 py-3 text-[12.5px] font-semibold transition xl:px-3 xl:text-[14px] ${
                    isActive || isOpen ? "text-brand" : "text-ink hover:text-brand"
                  }`}
                >
                  {g.name}
                  <Chevron className={isOpen ? "rotate-180 transition" : "transition"} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mega menü */}
        {openGroup && (
          <div className="absolute inset-x-0 top-full border-y border-line bg-white shadow-lg">
            <div className="mx-auto max-w-7xl px-4 py-6">
              {categoryGroups
                .filter((g) => g.slug === openGroup)
                .map((g) => (
                  <div key={g.slug}>
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-bold">{g.name}</h2>
                      <Link
                        href={`/${g.slug}`}
                        className="text-sm font-semibold text-brand hover:underline"
                      >
                        Tümünü gör →
                      </Link>
                    </div>
                    <ul className="grid grid-cols-4 gap-x-6 gap-y-1">
                      {g.children.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/${c.slug}`}
                            className="block rounded-md px-2 py-1.5 text-[14px] text-ink transition hover:bg-brand-50 hover:text-brand"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobil menü */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <Logo className="text-xl" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Menüyü kapat"
                className="grid size-9 place-items-center rounded-lg border border-line"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-3">
              <Link href="/" className="block rounded-lg px-3 py-2.5 font-semibold">
                Anasayfa
              </Link>
              {categoryGroups.map((g) => (
                <div key={g.slug} className="border-b border-line/60 last:border-0">
                  <button
                    onClick={() => setMobileGroup(mobileGroup === g.slug ? null : g.slug)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-semibold"
                  >
                    {g.name}
                    <Chevron className={mobileGroup === g.slug ? "rotate-180" : ""} />
                  </button>
                  {mobileGroup === g.slug && (
                    <ul className="pb-2">
                      <li>
                        <Link
                          href={`/${g.slug}`}
                          className="block rounded-lg px-6 py-2 text-sm font-semibold text-brand"
                        >
                          Tümünü gör
                        </Link>
                      </li>
                      {g.children.map((c) => (
                        <li key={c.slug}>
                          <Link href={`/${c.slug}`} className="block rounded-lg px-6 py-2 text-sm">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <Link href="/markalarimiz" className="mt-1 block rounded-lg px-3 py-2.5 font-semibold">
                Markalarımız
              </Link>
              <Link href="/hakkimizda" className="block rounded-lg px-3 py-2.5 font-semibold">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="block rounded-lg px-3 py-2.5 font-semibold">
                İletişim
              </Link>
            </div>
            <div className="border-t border-line p-4">
              <Link
                href="/teklif-al"
                className="block rounded-full bg-brand px-4 py-3 text-center font-semibold text-white"
              >
                Teklif Al
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
