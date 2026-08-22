import type { Block } from "@/data/products";

/** "Marka: Locksan" gibi anahtar:değer satırlarını ayırır */
function asSpec(items: { x: string }[]) {
  const parsed = items.map((i) => {
    const at = i.x.indexOf(":");
    if (at > 0 && at < 40) {
      const k = i.x.slice(0, at).trim();
      const v = i.x.slice(at + 1).trim();
      if (k && v) return { k, v };
    }
    return null;
  });
  const hit = parsed.filter(Boolean).length;
  return hit >= 3 && hit / items.length >= 0.7 ? parsed : null;
}

export default function ProductDescription({ blocks }: { blocks: Block[] }) {
  if (!blocks?.length) return null;

  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        if (b.t === "h") {
          return (
            <h2
              key={i}
              className="pt-4 text-[17px] font-bold text-ink first:pt-0"
            >
              {b.x}
            </h2>
          );
        }

        if (b.t === "p") {
          return (
            <p key={i} className="text-[15px] leading-relaxed text-ink/80">
              {b.x}
            </p>
          );
        }

        const spec = asSpec(b.items);
        if (spec) {
          return (
            <dl key={i} className="overflow-hidden rounded-xl border border-line">
              {b.items.map((item, j) => {
                const row = spec[j];
                return row ? (
                  <div
                    key={j}
                    className="flex gap-4 border-b border-line/70 px-4 py-2.5 text-[14px] last:border-0 odd:bg-neutral-50/60"
                  >
                    <dt className="w-40 shrink-0 font-semibold text-ink/70">{row.k}</dt>
                    <dd className="text-ink">{row.v}</dd>
                  </div>
                ) : (
                  <div
                    key={j}
                    className="border-b border-line/70 px-4 py-2.5 text-[14px] last:border-0 odd:bg-neutral-50/60"
                  >
                    {item.x}
                    {item.sub && (
                      <ul className="mt-1 space-y-0.5 pl-4 text-ink/75">
                        {item.sub.map((s, k) => (
                          <li key={k} className="list-disc">
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </dl>
          );
        }

        return (
          <ul key={i} className="space-y-1.5">
            {b.items.map((item, j) => (
              <li key={j} className="flex gap-2.5 text-[15px] leading-relaxed text-ink/80">
                <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand" />
                <span>
                  {item.x}
                  {item.sub && (
                    <ul className="mt-1.5 space-y-1 pl-1">
                      {item.sub.map((s, k) => (
                        <li key={k} className="flex gap-2 text-[14px] text-ink/70">
                          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-ink/30" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </span>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
