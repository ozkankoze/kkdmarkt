import type { MetadataRoute } from "next";
import { allSubCategories, categoryGroups } from "@/data/categories";
import { products } from "@/data/products";
import { site, standards } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hakkimizda`, lastModified: now, priority: 0.5 },
    { url: `${base}/markalarimiz`, lastModified: now, priority: 0.6 },
    { url: `${base}/teklif-al`, lastModified: now, priority: 0.7 },
    { url: `${base}/iletisim`, lastModified: now, priority: 0.5 },
    ...categoryGroups.map((g) => ({
      url: `${base}/${g.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...allSubCategories.map((c) => ({
      url: `${base}/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...standards.map((s) => ({ url: `${base}/${s.slug}`, lastModified: now, priority: 0.4 })),
    ...products.map((p) => ({
      url: `${base}/product-page/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
