import Link from "next/link";
import type { Product } from "@/data/products";
import { wixImage, wixSrcSet } from "@/lib/img";

export function ProductImage({
  src,
  alt,
  size = 500,
  className = "",
  priority = false,
}: {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={`grid place-items-center bg-neutral-100 text-neutral-300 ${className}`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="size-1/4" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="m4 16 4.5-4.5 3 3L15 11l5 5" />
          <circle cx="9" cy="9" r="1.4" />
        </svg>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={wixImage(src, size)}
      srcSet={wixSrcSet(src, [size / 2, size, size * 1.5].map(Math.round))}
      sizes={`${size}px`}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product-page/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-square overflow-hidden bg-white p-3">
        <ProductImage
          src={p.images[0]}
          alt={p.name}
          size={420}
          className="size-full object-contain transition duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-line/70 p-3.5">
        {p.brand && (
          <span className="mb-1 text-[11px] font-bold uppercase tracking-wider text-brand">
            {p.brand}
          </span>
        )}
        <h3 className="line-clamp-3 text-[14px] font-medium leading-snug text-ink">{p.name}</h3>
        <span className="mt-auto pt-3 text-[13px] font-semibold text-muted transition group-hover:text-brand">
          Detayları gör →
        </span>
      </div>
    </Link>
  );
}
