import { permanentRedirect } from "next/navigation";
import { allSubCategories } from "@/data/categories";
import { normalize } from "@/data/products";

/**
 * Wix mağaza kategori adresleri (/category/...) için kalıcı yönlendirme.
 * Eski bağlantılar ve arama motoru kayıtları kırılmasın diye tutuluyor.
 */
export default async function LegacyCategory({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const key = normalize(decoded.replace(/-/g, " "));

  const exact = allSubCategories.find((c) => c.slug === decoded);
  if (exact) permanentRedirect(`/${exact.slug}`);

  const byName = allSubCategories.find((c) => normalize(c.name) === key);
  if (byName) permanentRedirect(`/${byName.slug}`);

  permanentRedirect(`/arama?q=${encodeURIComponent(decoded.replace(/-/g, " "))}`);
}
