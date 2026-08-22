"use client";

import { useState } from "react";
import { ProductImage } from "./ProductCard";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const list = images.length ? images : [""];

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {list.length > 1 && (
        <ul className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible no-scrollbar">
          {list.map((src, idx) => (
            <li key={idx}>
              <button
                onClick={() => setI(idx)}
                aria-label={`Görsel ${idx + 1}`}
                aria-current={i === idx}
                className={`grid size-18 place-items-center overflow-hidden rounded-xl border-2 bg-white p-1.5 transition ${
                  i === idx ? "border-brand" : "border-line hover:border-brand/50"
                }`}
              >
                <ProductImage src={src} alt="" size={120} className="size-full object-contain" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex-1 overflow-hidden rounded-2xl border border-line bg-white p-6">
        <div className="aspect-square">
          <ProductImage
            src={list[i] || undefined}
            alt={alt}
            size={900}
            priority
            className="size-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
