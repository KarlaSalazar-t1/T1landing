import Image from "next/image";
import { SIGNUP_URL } from "@/lib/constants";
import { CANAL_LOGOS, NEGOCIOS } from "@/components/T1FinanzasDatos";

/* ──────────────────────────────────────────────────────────────────────────
   Secciones exclusivas de la v2 del landing de Finanzas.

   Qué cambia contra la v1:
   · La primera sección abre con cuatro beneficios —el patrón de tarjetas que
     pidió Karla—, y la comparación hoja de cálculo vs. Facturación queda
     debajo como la prueba, sin título propio.
   · "Tus pedidos llegan solos" y "Funciona vendas donde vendas" se funden en
     una sola sección. Eran tres secciones seguidas contestando lo mismo
     —de dónde salen tus ventas—, y el landing lo repetía tres veces.

   Las cifras son únicamente las aprobadas: medio día al mes, 52,513 claves y
   25 facturas gratis al mes por negocio. Nada de números inventados, y el
   sistema que sugiere la clave se nombra "nuestro sistema inteligente".
   ────────────────────────────────────────────────────────────────────────── */

const Arrow = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3.5 8h9M9 4.5L12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Los iconos van de línea fina, como en la referencia: mismo grosor, mismo
   tamaño y el color de acento del landing. */
const trazo = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const IconoReloj = (
  <svg width="26" height="26" viewBox="0 0 24 24" {...trazo} aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </svg>
);

const IconoClic = (
  <svg width="26" height="26" viewBox="0 0 24 24" {...trazo} aria-hidden>
    <path d="M8.5 3.6V2M4.3 5.3 3.2 4.2M4 10H2.4M5.3 15.2 4.2 16.3" />
    <path d="M8.5 15.4a5.4 5.4 0 1 1 5.6-5.6" />
    <path d="m11.4 11.4 9 3.4-3.8 1.4-1.4 3.8-3.8-8.6Z" />
  </svg>
);

const IconoChispa = (
  <svg width="26" height="26" viewBox="0 0 24 24" {...trazo} aria-hidden>
    <path d="M10 3.2l1.7 4.3 4.3 1.7-4.3 1.7L10 15.2 8.3 10.9 4 9.2l4.3-1.7L10 3.2Z" />
    <path d="M17.2 14.1l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2Z" />
  </svg>
);

const IconoRegalo = (
  <svg width="26" height="26" viewBox="0 0 24 24" {...trazo} aria-hidden>
    <path d="M3.6 10.4h16.8v3H3.6z" />
    <path d="M5.1 13.4h13.8v7.2H5.1z" />
    <path d="M12 10.4v10.2" />
    <path d="M12 10.4S10.6 6 8.3 6a2.2 2.2 0 0 0 0 4.4H12Zm0 0s1.4-4.4 3.7-4.4a2.2 2.2 0 0 1 0 4.4H12Z" />
  </svg>
);

const BENEFICIOS = [
  {
    icono: IconoReloj,
    dato: "Medio día al mes",
    desc: "El tiempo que hoy se te va juntando ventas canal por canal para poder facturar.",
  },
  {
    icono: IconoClic,
    dato: "En un clic",
    desc: "Tus ventas en línea llegan listas: las revisas y la factura sale.",
  },
  {
    icono: IconoChispa,
    dato: "52,513 claves",
    desc: "Escribe tu producto y nuestro sistema inteligente te propone la clave que le toca.",
  },
  {
    icono: IconoRegalo,
    dato: "$0 para empezar",
    desc: "25 facturas al mes por negocio, sin tarjeta y sin contratar nada.",
  },
];

/* 1 · La primera sección de la v2: el titular, una línea de apoyo y los
   cuatro beneficios. Debajo va <T1FinanzasProblema sinEncabezado /> con la
   comparación, así que esta sección cierra sin botón. */
export function T1FinanzasBeneficios() {
  return (
    <section className="relative overflow-hidden bg-black px-5 pb-[48px] pt-[56px] tablet:px-6 tablet:pb-[64px] tablet:pt-[72px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(219,59,43,0.12) 0%, transparent 65%)", filter: "blur(55px)" }}
      />

      <div className="relative mx-auto max-w-[var(--max-w)] text-center">
        <h2
          className="mx-auto font-sora text-[30px] font-light text-white tablet:text-[52px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.12, maxWidth: 760 }}
        >
          Lo que cambia desde tu primera factura
        </h2>
        <p className="mx-auto mt-4 font-inter text-[15px] font-light text-white/55 tablet:text-[17px]" style={{ maxWidth: 620 }}>
          Hoy lo armas canal por canal. Con T1 Finanzas, ya está listo.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 text-left tablet:grid-cols-2 tablet:gap-5 desktop:grid-cols-4">
          {BENEFICIOS.map((b) => (
            <div
              key={b.dato}
              className="flex flex-col rounded-[20px] border border-white/[0.08] bg-[#121214] p-6"
            >
              <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
                <span className="shrink-0 text-white">{b.icono}</span>
                <h3 className="font-sora text-[19px] font-normal text-white tablet:text-[21px]" style={{ letterSpacing: "-0.02em" }}>
                  {b.dato}
                </h3>
              </div>
              <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.6 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 2 · De dónde salen tus ventas: los canales que llegan solos y los cuatro
   tipos de negocio, en una sola sección. En la v1 esto eran dos.

   Los logos van en una banda compacta pegada al subtítulo —no dispersos en
   media pantalla— para que se lea como una sola sección: el titular, de
   dónde llegan las ventas, y qué pasa en cada tipo de negocio. */
export function T1FinanzasOrigen() {
  return (
    <section className="relative overflow-hidden bg-[#0e0d0d] px-5 py-[72px] tablet:px-6 tablet:py-[110px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 760, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,59,43,0.10) 0%, transparent 62%)" }}
      />

      <div className="relative mx-auto max-w-[var(--max-w)] text-center">
        <h2
          className="mx-auto font-sora text-[28px] font-light text-white tablet:text-[44px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14, maxWidth: 760 }}
        >
          Todo lo que vendes, ya está aquí
        </h2>
        <p className="mx-auto font-inter text-[15px] font-light text-white/60 tablet:text-[17px]" style={{ lineHeight: 1.6, maxWidth: 520 }}>
          Si ya vendes con T1 Tienda, no tienes que conectar nada.
        </p>

        {/* La banda de canales, pegada al subtítulo */}
        <div
          className="mx-auto mt-9 flex max-w-[840px] flex-wrap items-center justify-center gap-x-6 gap-y-5 tablet:mt-11 tablet:gap-x-9"
          aria-hidden
        >
          {CANAL_LOGOS.map((c) => (
            <Image
              key={c.alt}
              src={c.src}
              alt={c.alt}
              width={40}
              height={40}
              className="h-[32px] w-[32px] object-contain tablet:h-[40px] tablet:w-[40px]"
              style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.45))" }}
            />
          ))}
        </div>

        {/* Los cuatro casos. En móvil se deslizan; desde escritorio, una fila. */}
        <div className="-mx-5 mt-12 flex gap-4 overflow-x-auto px-5 pb-2 text-left tablet:mx-0 tablet:mt-14 tablet:grid tablet:grid-cols-2 tablet:gap-5 tablet:overflow-visible tablet:px-0 tablet:pb-0 desktop:grid-cols-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NEGOCIOS.map((n) => (
            <a
              key={n.title}
              href={n.href}
              className="group flex w-[270px] shrink-0 snap-start flex-col rounded-[20px] border border-white/[0.08] bg-[#1A1A1D] p-6 no-underline transition-colors hover:border-white/20 tablet:w-auto"
            >
              <div className="flex items-center justify-between gap-2" style={{ marginBottom: 10 }}>
                <h3 className="font-sora text-[19px] font-normal text-white">{n.title}</h3>
                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-white/40 group-hover:text-white">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
              <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55 }}>
                {n.desc}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-11 flex justify-center">
          <a
            href={SIGNUP_URL}
            data-cta-text="Comienza gratis"
            data-cta-destination={SIGNUP_URL}
            data-cta-section="origen"
            className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
          >
            Comienza gratis
            {Arrow}
          </a>
        </div>
      </div>
    </section>
  );
}
