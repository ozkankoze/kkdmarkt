import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CatalogGrid from "@/components/CatalogGrid";
import { allSubCategories, categoryGroups, findGroup, findSubCategory } from "@/data/categories";
import { categoryCount, productsByCategory, productsByGroup } from "@/data/products";
import { standards } from "@/data/site";
import { getStandard } from "@/data/standards";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...categoryGroups.map((g) => ({ slug: g.slug })),
    ...allSubCategories.map((c) => ({ slug: c.slug })),
    ...standards.map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const group = findGroup(slug);
  const sub = findSubCategory(slug);
  const std = getStandard(slug);
  const title = group?.name ?? sub?.name ?? std?.title;
  if (!title) return {};
  const description = std
    ? std.intro
    : `${title} ürünleri — KKDMARKT iş güvenliği ekipmanları. Sertifikalı, kaliteli ve hızlı tedarik.`;
  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title, description },
  };
}

export default async function SlugPage({ params }: Params) {
  const { slug } = await params;
  const group = findGroup(slug);
  const sub = findSubCategory(slug);
  const std = getStandard(slug);

  if (group) {
    const items = productsByGroup(group.slug);
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Breadcrumbs items={[{ label: group.name }]} />
        <header className="mb-8 mt-4">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{group.name}</h1>
          <p className="mt-2 text-muted">
            {group.children.length} alt kategoride {items.length} ürün.
          </p>
        </header>

        <ul className="mb-10 flex flex-wrap gap-2">
          {group.children.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium transition hover:border-brand hover:text-brand"
              >
                {c.name}
                <span className="text-xs text-muted">{categoryCount(c.slug)}</span>
              </Link>
            </li>
          ))}
        </ul>

        <CatalogGrid items={items} />
      </div>
    );
  }

  if (sub) {
    const items = productsByCategory(sub.slug);
    const parent = findGroup(sub.groupSlug)!;
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Breadcrumbs
          items={[{ href: `/${parent.slug}`, label: parent.name }, { label: sub.name }]}
        />
        <header className="mb-8 mt-4">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{sub.name}</h1>
          <p className="mt-2 text-muted">
            {parent.name} · {items.length} ürün
          </p>
        </header>

        <ul className="mb-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {parent.children.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}`}
                className={`inline-flex whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                  c.slug === sub.slug
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-white hover:border-brand hover:text-brand"
                }`}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <CatalogGrid items={items} />
      </div>
    );
  }

  if (std) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Breadcrumbs items={[{ label: std.title }]} />
        <article className="mt-4">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{std.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{std.intro}</p>
          <div className="prose-tr mt-8 text-[15px] text-ink/85">{std.body}</div>
        </article>
        <div className="mt-12 rounded-2xl border border-line bg-neutral-50 p-6">
          <h2 className="text-lg font-bold">Diğer standart rehberleri</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {standards
              .filter((s) => s.slug !== std.slug)
              .map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-brand hover:underline">
                    {s.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }

  notFound();
}
