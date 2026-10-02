import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import Image from "next/image";
import { BotonApp, Chip, VentanaApp } from "@/components/T1FinanzasUI";
import { FUENTE, UI } from "@/components/T1FinanzasTokens";

/* ──────────────────────────────────────────────────────────────────────────
   Hero de T1 Finanzas.

   El panel es la pantalla de Facturación del producto, hecha en código: las
   mismas columnas (fecha, documento, receptor, total, estado y cobro), los
   mismos tipos de documento —factura de venta, global, devolución y recibo
   de pago— y los mismos estados. Al estar en código se ve nítido en
   cualquier pantalla y no se corta.
   ────────────────────────────────────────────────────────────────────────── */

type Fila = {
  fecha: string;
  tipo: string;
  receptor: string;
  total: string;
  estado: string;
  tono: "verde" | "ambar";
};

/* La tabla va simplificada a propósito: cuatro renglones, una línea por celda
   y sin la columna de cobro. La pantalla real tiene más datos; aquí basta con
   que se entienda qué es y qué documentos emite. */
const FILAS: Fila[] = [
  { fecha: "03/09/2026", tipo: "Factura de venta", receptor: "Acme", total: "$17,400.00", estado: "Pagada", tono: "verde" },
  { fecha: "01/09/2026", tipo: "Factura global", receptor: "Público en general", total: "$58,000.00", estado: "Registrada", tono: "verde" },
  { fecha: "28/08/2026", tipo: "Nota de crédito", receptor: "Acme", total: "$4,640.00", estado: "Registrada", tono: "verde" },
  { fecha: "20/08/2026", tipo: "Recibo de pago", receptor: "Talleres San Miguel", total: "$3,480.00", estado: "Registrada", tono: "verde" },
];

const COLS = "68px minmax(0,1.1fr) minmax(0,1fr) 88px 78px";

function PanelFacturacion() {
  return (
    <VentanaApp className="max-w-[560px]" cromo="escritorio">
      <div className="px-4 pb-4 pt-3.5 tablet:px-5 tablet:pb-5 tablet:pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-bold" style={{ fontSize: 15, color: UI.texto }}>
            Facturación
          </p>
          <BotonApp>Crear factura</BotonApp>
        </div>

        <div className="mt-3.5 overflow-hidden rounded-[10px] border" style={{ borderColor: UI.borde }}>
          {/* Escritorio: la tabla con sus cinco columnas. */}
          <div
            className="hidden items-center border-b px-3.5 py-2 tablet:grid"
            style={{ gridTemplateColumns: COLS, borderColor: UI.bordeSuave, background: "#FBFBFA" }}
          >
            {["Fecha", "Documento", "Receptor", "Total", "Estado"].map((h, i) => (
              <span
                key={h}
                className="font-semibold uppercase"
                style={{ fontSize: 8.5, letterSpacing: "0.05em", color: UI.tenue, textAlign: i === 3 ? "right" : "left" }}
              >
                {h}
              </span>
            ))}
          </div>

          {FILAS.map((f) => (
            <div key={f.tipo + f.fecha} className="border-b last:border-b-0" style={{ borderColor: UI.bordeSuave }}>
              {/* Escritorio */}
              <div className="hidden items-center px-3.5 py-3 tablet:grid" style={{ gridTemplateColumns: COLS }}>
                <span style={{ fontSize: 10, color: UI.tenue }}>{f.fecha}</span>
                <span className="min-w-0 pr-2 font-medium" style={{ fontSize: 11, color: UI.texto }}>
                  {f.tipo}
                </span>
                <span className="min-w-0 truncate pr-2" style={{ fontSize: 11, color: UI.suave }}>
                  {f.receptor}
                </span>
                <span className="text-right font-semibold" style={{ fontSize: 11, color: UI.texto }}>
                  {f.total}
                </span>
                <span className="text-right">
                  <Chip size={9} tono={f.tono}>
                    {f.estado}
                  </Chip>
                </span>
              </div>

              {/* Móvil: dos renglones por factura, sin columnas que se corten. */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 tablet:hidden">
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate font-medium" style={{ fontSize: 11.5, color: UI.texto }}>
                    {f.tipo}
                  </span>
                  <span className="block truncate" style={{ fontSize: 10, color: UI.tenue }}>
                    {f.receptor} · {f.fecha}
                  </span>
                </span>
                <span className="shrink-0 text-right leading-tight">
                  <span className="block font-semibold" style={{ fontSize: 11.5, color: UI.texto }}>
                    {f.total}
                  </span>
                  <span className="mt-1 block">
                    <Chip size={9} tono={f.tono}>
                      {f.estado}
                    </Chip>
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VentanaApp>
  );
}

/* Aviso flotante: una venta que acaba de entrar y está lista para facturar.
   Es lo que promete el título —vendes y facturas en el mismo lugar— contado
   con la interfaz. Entra con un pequeño rebote y luego flota. */
function AvisoVenta() {
  return (
    <div
      className="flex items-center gap-3 rounded-[14px] border bg-white px-3.5 py-3"
      style={{
        fontFamily: FUENTE,
        borderColor: UI.bordeSuave,
        boxShadow: "0 22px 50px rgba(0,0,0,0.30)",
        animation: "fadeSlideIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s both, float 5s ease-in-out 1.3s infinite",
      }}
    >
      <span className="relative flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border bg-white" style={{ borderColor: UI.borde }}>
        <Image src="/img/meli-iso.svg" alt="" width={32} height={32} className="h-[17px] w-[17px] object-contain" />
        <span className="absolute -right-[2px] -top-[2px] h-[9px] w-[9px] rounded-full border-2 border-white" style={{ background: UI.rojo }} />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block whitespace-nowrap font-bold" style={{ fontSize: 11.5, color: UI.texto }}>
          Nueva venta por facturar
        </span>
        <span className="block whitespace-nowrap" style={{ fontSize: 10.5, color: UI.tenue }}>
          Mercado Libre · $12,996.00
        </span>
      </span>
      {/* En móvil el botón sobra: la tarjeta ya es angosta. */}
      <span
        className="ml-1 hidden shrink-0 rounded-[8px] px-2.5 py-1.5 font-semibold text-white tablet:inline-block"
        style={{ background: UI.rojo, fontSize: 10.5 }}
      >
        Facturar
      </span>
    </div>
  );
}

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function T1FinanzasHero() {
  return (
    <div className="relative overflow-hidden">
      <HeroBackground fadeHeight={340} />

      <section className="relative z-10 flex min-h-[78svh] flex-col justify-center px-5 pb-20 pt-36 tablet:min-h-[84svh] tablet:px-6 tablet:pb-24 tablet:pt-44">
        <div className="mx-auto flex w-full max-w-[var(--max-w)] flex-col">
          <div className="grid grid-cols-1 items-center gap-8 tablet:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] tablet:gap-12">
            {/* Izquierda */}
            <div className="flex flex-col items-center text-center tablet:items-start tablet:text-left">
              <h1
                className="font-sora text-[34px] font-light leading-[1.1] text-white tablet:text-[52px] desktop:text-[54px]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Vende y factura
                <br />
                en el mismo lugar
              </h1>
              <p className="mt-4 max-w-[480px] font-inter text-[15px] font-light leading-[1.55] text-white/80 tablet:text-[17px]">
                Tus pedidos de Mercado Libre, Amazon, TikTok Shop y más llegan listos para
                facturar en un clic.
              </p>
              <a
                href={SIGNUP_URL}
                data-cta-location="hero"
                data-cta-text="Comienza gratis"
                data-cta-destination={SIGNUP_URL}
                className="mt-8 hidden h-[52px] items-center justify-center gap-2 rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600 tablet:inline-flex"
              >
                Comienza gratis
                {ArrowRight}
              </a>
            </div>

            {/* Derecha — la pantalla de Facturación */}
            <div className="relative flex justify-center [perspective:1600px]">
              <div
                className="w-full max-w-[560px] tablet:[transform:rotateY(-7deg)_rotateX(2deg)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <PanelFacturacion />
              </div>

              {/* El aviso cuelga de la esquina del panel, sin inclinarse. */}
              <div className="pointer-events-none absolute -bottom-7 left-2 z-20 w-[244px] tablet:-bottom-8 tablet:-left-8 tablet:w-[302px]">
                <AvisoVenta />
              </div>
            </div>

            {/* CTA móvil */}
            <a
              href={SIGNUP_URL}
              data-cta-location="hero"
              data-cta-text="Comienza gratis"
              data-cta-destination={SIGNUP_URL}
              className="mt-1 inline-flex h-[52px] items-center justify-center gap-2 justify-self-center rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600 tablet:hidden"
            >
              Comienza gratis
              {ArrowRight}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
