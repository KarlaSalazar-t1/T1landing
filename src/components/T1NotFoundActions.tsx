"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const LINKS = [
  { name: "T1 Tienda", desc: "Crea y vende en línea", href: "/productos/t1tienda" },
  { name: "T1 Envíos", desc: "Envía al mejor precio", href: "/productos/t1envios" },
  { name: "T1 Pagos", desc: "Cobra en línea", href: "/productos/t1pagos" },
  { name: "T1 POS", desc: "Vende en tu tienda física", href: "/productos/t1pos" },
  { name: "T1 Finanzas", desc: "Factura tus ventas", href: "/productos/t1finanzas" },
];

const onClick = (target: string) => track("404_click", { target, path: window.location.pathname });

/* CTA único al home general. Sin botón "atrás": quien venía navegando ya
   tiene el back del navegador, y a quien llega de fuera lo sacaría de T1. */
export function T1NotFoundHomeCTA() {
  useEffect(() => {
    track("404_view", { path: window.location.pathname, referrer: document.referrer || null });
  }, []);

  return (
    <a
      href="/"
      onClick={() => onClick("home")}
      className="inline-flex h-[46px] items-center justify-center rounded-full bg-[#DB3B2B] px-7 font-inter text-[14px] font-semibold text-white no-underline transition-all duration-200 hover:scale-[1.03] hover:bg-[#C0332A] tablet:h-[48px]"
    >
      Vuelve al inicio
    </a>
  );
}

/* Lista de productos (referencia: 404 de Shopify) — filas con nombre,
   descripción y flecha (sin círculo), separadas por línea. Toda la fila es link. */
export function T1NotFoundLinks() {
  return (
    <nav aria-label="Productos de T1" className="w-full">
      <p className="mb-2 font-inter text-[13px] font-normal text-white/55 tablet:text-[14px]">Sigue navegando por T1</p>
      <ul className="m-0 list-none p-0">
        {LINKS.map((l) => (
          <li key={l.href} className="border-b border-white/15 last:border-b-0">
            <a
              href={l.href}
              onClick={() => onClick(l.href)}
              className="group flex items-center justify-between gap-4 py-3 no-underline tablet:py-4"
            >
              <span className="flex flex-col gap-0.5">
                <span className="font-sora text-[19px] font-light text-white transition-colors duration-150 group-hover:text-[#FFB4A8] tablet:text-[24px]" style={{ letterSpacing: "-0.02em" }}>
                  {l.name}
                </span>
                <span className="font-inter text-[13px] font-light text-white/55 tablet:text-[14px]">{l.desc}</span>
              </span>
              <svg className="shrink-0 text-white/60 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#FFB4A8]" width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
