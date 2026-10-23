"use client";

import { useEffect } from "react";
import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import HeroBackground from "@/components/HeroBackground";
import { track } from "@/lib/analytics";

/* Íconos = SVGs de producto usados como máscara (así toman el color que
   queramos sobre el degradado: blanco en reposo, coral en hover). */
const CARDS = [
  { name: "T1 Tienda", desc: "Crea tu tienda en línea y vende en marketplaces.", href: "/productos/t1tienda", icon: "/img/icon-tienda.svg" },
  { name: "T1 Envíos", desc: "Compara paqueterías y envía al mejor precio.", href: "/productos/t1envios", icon: "/img/icon-envios.svg" },
  { name: "T1 Pagos", desc: "Cobra en línea con tarjeta, transferencia y links de pago.", href: "/productos/t1pagos", icon: "/img/icon-pagos.svg" },
  { name: "T1 POS", desc: "Vende en tu tienda física con el mismo inventario.", href: "/productos/t1pos", icon: "/img/icon-pos.svg" },
  { name: "T1 Finanzas", desc: "Factura tus ventas y lleva tus cuentas en orden.", href: "/productos/t1finanzas", icon: "/img/icon-finanzas.svg" },
  { name: "Precios", desc: "Consulta los planes y comisiones de cada producto.", href: "/precios", icon: "/img/icon-precios.svg" },
];

const onClick = (target: string) => track("404_click", { target, path: window.location.pathname, version: "v2" });

/* V2 de la 404 (referencia: Stripe) — sin el número 404: título + texto con
   "Vuelve al inicio", y debajo una cuadrícula de cards (ícono, nombre, descripción). */
export default function T1NotFoundV2() {
  useEffect(() => {
    track("404_view", { path: window.location.pathname, referrer: document.referrer || null, version: "v2" });
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <T1Navbar pageType="sublanding" />

      <section className="relative overflow-hidden px-5 pb-36 pt-[92px] tablet:px-10 tablet:pb-52 tablet:pt-[150px]">
        <HeroBackground fadeHeight={480} />

        <div className="relative z-[1] mx-auto max-w-[1120px]">
          <div className="flex flex-col items-start">
            <h1
              className="font-sora text-[32px] font-light text-white tablet:text-[48px] lg:text-[56px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 12 }}
            >
              Página no encontrada
            </h1>
            <p className="font-inter text-[15px] font-light text-white/70 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              El enlace cambió o está mal escrito. Elige a dónde quieres ir.
            </p>
            {/* Link secundario (no botón rojo) para no competir con el CTA
                "Comienza gratis" del navbar; las cards son la acción principal. */}
            <a
              href="/"
              onClick={() => onClick("home")}
              className="group mt-4 inline-flex items-center gap-1.5 font-inter text-[14px] font-medium text-white no-underline underline-offset-4 hover:underline tablet:text-[15px]"
            >
              <svg className="transition-transform duration-200 group-hover:-translate-x-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Vuelve al inicio
            </a>
          </div>

          <nav aria-label="Productos de T1" className="mt-8 grid grid-cols-2 gap-2.5 tablet:mt-12 tablet:grid-cols-3 tablet:gap-4">
            {CARDS.map((c) => (
              <a
                key={c.href}
                href={c.href}
                onClick={() => onClick(c.href)}
                className="group relative flex flex-col rounded-[16px] border border-white/[0.12] bg-white/[0.06] p-4 no-underline backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/[0.10] tablet:rounded-[20px] tablet:p-6"
              >
                <span
                  aria-hidden
                  className="mb-3 block h-[26px] w-[26px] bg-white transition-colors duration-200 group-hover:bg-[#FFB4A8] tablet:mb-5 tablet:h-[32px] tablet:w-[32px]"
                  style={{ WebkitMask: `url(${c.icon}) left center / contain no-repeat`, mask: `url(${c.icon}) left center / contain no-repeat` }}
                />
                <span className="flex items-center gap-1.5 font-sora text-[16px] font-normal text-white tablet:text-[20px]" style={{ letterSpacing: "-0.02em" }}>
                  {c.name}
                  <svg className="text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span className="mt-1 font-inter text-[12px] font-light leading-[1.45] text-white/60 tablet:mt-2 tablet:text-[14px]">{c.desc}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <T1Footer />
    </main>
  );
}
