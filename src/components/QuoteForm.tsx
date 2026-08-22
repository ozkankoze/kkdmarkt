"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/data/site";

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";

export default function QuoteForm() {
  const sp = useSearchParams();
  const [sent, setSent] = useState<null | "wa" | "mail">(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    products: sp.get("urun") ?? "",
    note: "",
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function compose() {
    return [
      "Teklif Talebi",
      "",
      `Ad Soyad: ${form.name}`,
      form.company && `Firma: ${form.company}`,
      `Telefon: ${form.phone}`,
      form.email && `E-posta: ${form.email}`,
      "",
      `Ürünler: ${form.products}`,
      form.note && `Not: ${form.note}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function submit(e: React.FormEvent, channel: "wa" | "mail") {
    e.preventDefault();
    const body = compose();
    if (channel === "wa") {
      window.open(
        `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(body)}`,
        "_blank",
        "noopener",
      );
    } else {
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
        "Teklif Talebi - " + (form.company || form.name),
      )}&body=${encodeURIComponent(body)}`;
    }
    setSent(channel);
  }

  return (
    <form className="space-y-4" onSubmit={(e) => submit(e, "wa")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Ad Soyad *</span>
          <input
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={field}
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Firma</span>
          <input
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className={field}
            autoComplete="organization"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Telefon *</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={field}
            autoComplete="tel"
            placeholder="05xx xxx xx xx"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">E-posta</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={field}
            autoComplete="email"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Ürünler ve adetler *</span>
        <textarea
          required
          rows={4}
          value={form.products}
          onChange={(e) => set("products", e.target.value)}
          className={field}
          placeholder="Örn: Ansell HyFlex 11-920 – 50 çift, S3 iş botu 42 numara – 20 adet"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Ek not</span>
        <textarea
          rows={3}
          value={form.note}
          onChange={(e) => set("note", e.target.value)}
          className={field}
          placeholder="Teslimat adresi, termin, özel istekler…"
        />
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white transition hover:brightness-95"
        >
          WhatsApp ile gönder
        </button>
        <button
          type="button"
          onClick={(e) => submit(e, "mail")}
          className="rounded-full border-2 border-brand px-7 py-3.5 font-semibold text-brand transition hover:bg-brand hover:text-white"
        >
          E-posta ile gönder
        </button>
      </div>

      {sent && (
        <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-ink">
          {sent === "wa"
            ? "WhatsApp penceresi açıldı — mesajı göndermeyi unutmayın."
            : "E-posta uygulamanız açıldı — mesajı göndermeyi unutmayın."}
        </p>
      )}

      <p className="text-xs text-muted">
        * Zorunlu alanlar. Talebiniz {site.contact.phone} numaralı hattımıza / {site.contact.email}{" "}
        adresine iletilir.
      </p>
    </form>
  );
}
