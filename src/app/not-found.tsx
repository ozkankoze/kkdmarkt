import Link from "next/link";
import { categoryGroups } from "@/data/categories";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-extrabold sm:text-3xl">Sayfa bulunamadı</h1>
      <p className="mt-3 text-muted">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Aşağıdaki kategorilerden devam
        edebilirsiniz.
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {categoryGroups.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/${g.slug}`}
              className="inline-flex rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-brand hover:text-brand"
            >
              {g.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition hover:bg-brand-600"
      >
        Anasayfaya dön
      </Link>
    </div>
  );
}
