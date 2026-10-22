"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const LINKS = [
  { name: "T1 Tienda", href: "/productos/t1tienda" },
  { name: "T1 Envíos", href: "/productos/t1envios" },
  { name: "T1 Pagos", href: "/productos/t1pagos" },
  { name: "T1 POS", href: "/productos/t1pos" },
  { name: "T1 Finanzas", href: "/productos/t1finanzas" },
];

/* Acciones de la 404: un solo CTA al home general + accesos a productos.
   Sin botón "atrás": quien venía navegando ya tiene el back del navegador, y a
   quien llega de fuera lo sacaría de T1. */
export default function T1NotFoundActions() {
  useEffect(() => {
    track("404_view", { path: window.location.pathname, referrer: document.referrer || null });
  }, []);

  const onClick = (target: string) => track("404_click", { target, path: window.location.pathname });

  return (
    <>
      <a
        href="/"
        onClick={() => onClick("home")}
        className="inline-flex h-[46px] w-[160px] items-center justify-center rounded-full bg-[#DB3B2B] tablet:h-[48px] tablet:w-[172px] font-inter text-[14px] font-semibold text-white no-underline transition-all duration-200 hover:scale-[1.03] hover:bg-[#C0332A]"
      >
        Ve al inicio
      </a>

      {/* Accesos directos: pills con borde + flecha para que lean como links,
          hover en coral como el mega menú. */}
      <nav aria-label="Productos de T1" className="mt-10 flex w-full max-w-[880px] flex-col items-center gap-4 border-t border-white/[0.10] pt-6 tablet:mt-14 tablet:pt-8">
        <p className="font-inter text-[14px] font-normal text-white/50">Sigue navegando por T1</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => onClick(l.href)}
              className="group inline-flex h-[36px] items-center gap-1.5 rounded-full border border-white/15 px-3.5 font-inter text-[13px] tablet:h-[40px] tablet:px-4 tablet:text-[14px] font-normal text-white/85 no-underline transition-colors duration-150 hover:border-[#FF6F5E]/60 hover:text-[#FF6F5E]"
            >
              {l.name}
              <svg className="text-white/40 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-[#FF6F5E]" width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
