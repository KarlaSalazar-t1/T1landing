"use client";

import { useState } from "react";

/* Preguntas frecuentes — COMPONENTE COMPARTIDO por las landings de producto
   (Tienda, Envíos, Pagos) y todas sus sublandings, para que se vean iguales.
   Hover en cada pregunta (texto + ícono) para que se note que se puede
   expandir / colapsar. */

export type Faq = { q: string; a: string };

export function FAQItem({ q, a }: Faq) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="group w-full cursor-pointer border-b border-white/10 py-5 text-left"
    >
      <div className="flex items-center justify-between gap-4">
        <span className={`font-inter text-[16px] font-medium transition-colors duration-200 group-hover:text-[#FF6F5E] tablet:text-[18px] ${open ? "text-[#FF6F5E]" : "text-white"}`}>{q}</span>
        <span
          className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border transition-all duration-200 group-hover:border-white/40 group-hover:bg-white/[0.08] group-hover:text-white ${
            open ? "rotate-45 border-white/40 bg-white/[0.08] text-white" : "border-white/15 text-white/55"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </span>
      </div>
      <div className="grid transition-all duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="pr-10 pt-3 font-inter text-[15px] font-light leading-relaxed text-white/60 tablet:text-[16px]">{a}</p>
        </div>
      </div>
    </button>
  );
}

export function T1FAQSection({ faqs, title = "Preguntas frecuentes" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="bg-black px-5 py-[80px] tablet:px-6 tablet:py-[110px]">
      <div className="mx-auto max-w-[760px]">
        <h2 className="mb-8 text-center font-sora text-[28px] font-light text-white tablet:mb-12 tablet:text-[40px]" style={{ letterSpacing: "-0.03em" }}>
          {title}
        </h2>
        <div className="border-t border-white/10">
          {faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}
