"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Doc = { s: string; n: string; b: string; i?: string };

function normalize(s: string) {
  return s
    .toLocaleLowerCase("tr")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

let cache: { docs: Doc[]; keys: string[] } | null = null;

export default function SearchBox({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(cache);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  async function load() {
    if (cache) return;
    try {
      const res = await fetch("/search-index.json");
      const docs: Doc[] = await res.json();
      cache = { docs, keys: docs.map((d) => normalize(`${d.n} ${d.b}`)) };
      setData(cache);
    } catch {
      /* sessizce geç */
    }
  }

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    if (!data || q.trim().length < 2) return [];
    const terms = normalize(q).split(" ").filter(Boolean);
    if (!terms.length) return [];
    const out: { d: Doc; score: number }[] = [];
    for (let i = 0; i < data.docs.length; i++) {
      const key = data.keys[i];
      let score = 0;
      let ok = true;
      for (const t of terms) {
        const at = key.indexOf(t);
        if (at === -1) {
          ok = false;
          break;
        }
        score += at === 0 ? 3 : 1;
      }
      if (ok) out.push({ d: data.docs[i], score });
      if (out.length > 400) break;
    }
    return out.sort((a, b) => b.score - a.score).slice(0, 8).map((o) => o.d);
  }, [q, data]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/arama?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <form onSubmit={submit} role="search">
        <div
          className={`flex items-center gap-2 rounded-full border border-line bg-white px-4 shadow-sm transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15 ${
            compact ? "h-11" : "h-12 md:h-13"
          }`}
        >
          <svg
            className="size-5 shrink-0 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
              setActive(0);
            }}
            onFocus={() => {
              load();
              setOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active] && open) {
                e.preventDefault();
                setOpen(false);
                router.push(`/product-page/${results[active].s}`);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            type="search"
            placeholder="Aramak istediğiniz ürünün adını yazın."
            aria-label="Ürün ara"
            className="h-full w-full bg-transparent text-[15px] outline-none placeholder:text-muted"
          />
        </div>
      </form>

      {open && q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-line bg-white shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-5 text-sm text-muted">
              Sonuç bulunamadı. Farklı bir kelime deneyin.
            </p>
          ) : (
            <>
              <ul>
                {results.map((r, i) => (
                  <li key={r.s}>
                    <Link
                      href={`/product-page/${r.s}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 ${
                        i === active ? "bg-brand-50" : "hover:bg-neutral-50"
                      }`}
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-white">
                        {r.i ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`${r.i}/v1/fit/w_88,h_88,q_85/file.png`}
                            alt=""
                            className="size-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-[10px] font-semibold text-brand">KKD</span>
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{r.n}</span>
                        {r.b && <span className="block text-xs text-muted">{r.b}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => submit()}
                className="block w-full border-t border-line px-4 py-3 text-center text-sm font-semibold text-brand hover:bg-brand-50"
              >
                &ldquo;{q}&rdquo; için tüm sonuçlar
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
