import Image from "next/image";
import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import { Chip, VentanaApp } from "@/components/T1FinanzasUI";
import AvisoPedido from "@/components/T1FinanzasAvisoPedido";
import { UI } from "@/components/T1FinanzasTokens";

/* ──────────────────────────────────────────────────────────────────────────
   Hero de T1 Finanzas.

   El panel es la pantalla de Inicio del producto, hecha en código: el mes del
   negocio con sus tres números y la actividad reciente por canal. Encima va
   la tarjeta de "Nuevo pedido por facturar", que es la que cuenta la promesa
   del título. El aviso amarillo de cobranza no se dibuja: en la página se ve
   el producto, no sus notificaciones.
   ────────────────────────────────────────────────────────────────────────── */

/* ── Los tres números del mes ── */
const RESUMEN = [
  { k: "Canales listos para facturar solos", v: "3", d: "Actívalos para que facturen solos." },
  { k: "Pedidos por facturar", v: "7", d: "" },
  { k: "Ventas sin factura este mes", v: "$18,720.00", d: "Júntalas en tu factura global." },
];

/* ── La actividad reciente, con los nombres de la plataforma ── */
type Actividad = {
  fecha: string;
  canal: string;
  logo: string;
  receptor: string;
  tipo: string;
  global?: boolean;
  total: string;
  estado: "Registrada" | "Cancelada";
};

const ACTIVIDAD: Actividad[] = [
  { fecha: "04/09/2026", canal: "Tienda Nube", logo: "/img/tiendanube.svg", receptor: "Comercializadora Delta", tipo: "Factura de venta", total: "$34,500.00", estado: "Registrada" },
  { fecha: "03/09/2026", canal: "Mercado Libre", logo: "/img/meli-iso.svg", receptor: "Público en general", tipo: "Factura de venta", global: true, total: "$28,750.00", estado: "Registrada" },
  { fecha: "02/09/2026", canal: "TikTok Shop", logo: "/img/tiktokshop.svg", receptor: "María González López", tipo: "Factura de venta", total: "$4,980.00", estado: "Registrada" },
  { fecha: "01/09/2026", canal: "Shopify", logo: "/img/shopify.svg", receptor: "Distribuidora Monterrey", tipo: "Recibo de pago", total: "$12,200.00", estado: "Registrada" },
];

const COLS = "72px minmax(0,1fr) minmax(0,1.15fr) 92px 84px";

function PanelInicio() {
  return (
    <VentanaApp className="max-w-[640px]" cromo="nunca">
      {/* Saludo, con el degradado cálido de la pantalla real */}
      <div
        className="px-4 pb-4 pt-4 tablet:px-6 tablet:pb-5 tablet:pt-5"
        style={{ background: "linear-gradient(180deg, rgba(226,64,47,0.09) 0%, rgba(226,64,47,0) 100%)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-bold" style={{ fontSize: 16, color: UI.texto }}>
              Hola, Luis
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-2 tablet:flex">
            {["Ver facturas", "Nueva factura"].map((b) => (
              <span
                key={b}
                className="whitespace-nowrap rounded-[9px] border bg-white px-3 py-[7px] font-semibold"
                style={{ fontSize: 11, color: UI.texto, borderColor: UI.borde }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-5 pt-1 tablet:px-6">
        <div className="grid grid-cols-3 gap-2 tablet:gap-3">
          {RESUMEN.map((r) => (
            <div key={r.k} className="rounded-[10px] border px-3 py-2.5" style={{ borderColor: UI.borde }}>
              <span className="block leading-tight" style={{ fontSize: 9.5, color: UI.suave }}>
                {r.k}
              </span>
              <span className="mt-1 block font-bold" style={{ fontSize: 17, color: UI.texto, letterSpacing: "-0.02em" }}>
                {r.v}
              </span>
              {r.d && (
                <span className="mt-0.5 hidden leading-tight tablet:block" style={{ fontSize: 9, color: UI.tenue }}>
                  {r.d}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-bold" style={{ fontSize: 12, color: UI.texto }}>
            Actividad reciente
          </p>
          <span className="hidden tablet:block" style={{ fontSize: 10, color: UI.suave }}>
            Ver facturas
          </span>
        </div>

        <div className="mt-2 overflow-hidden rounded-[10px] border" style={{ borderColor: UI.borde }}>
          <div
            className="hidden items-center gap-3 border-b px-3.5 py-2 tablet:grid"
            style={{ gridTemplateColumns: COLS, borderColor: UI.bordeSuave, background: "#FBFBFA" }}
          >
            {["Fecha", "Canal", "Receptor", "Total", "Estado"].map((h, i) => (
              <span
                key={h}
                className="font-semibold uppercase"
                style={{ fontSize: 8.5, letterSpacing: "0.05em", color: UI.tenue, textAlign: i === 3 ? "right" : "left" }}
              >
                {h}
              </span>
            ))}
          </div>

          {ACTIVIDAD.map((a) => (
            <div key={a.fecha + a.canal} className="border-b last:border-b-0" style={{ borderColor: UI.bordeSuave }}>
              {/* Escritorio */}
              <div className="hidden items-center gap-3 px-3.5 py-2.5 tablet:grid" style={{ gridTemplateColumns: COLS }}>
                <span style={{ fontSize: 10, color: UI.tenue }}>{a.fecha}</span>
                <span className="flex min-w-0 items-center gap-2">
                  <Image src={a.logo} alt="" width={18} height={18} className="h-[15px] w-[15px] shrink-0 object-contain" />
                  <span className="truncate" style={{ fontSize: 10.5, color: UI.suave }}>
                    {a.canal}
                  </span>
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate font-medium" style={{ fontSize: 11, color: UI.texto }}>
                    {a.receptor}
                  </span>
                  <span className="mt-[3px] flex items-center gap-1">
                    <Chip size={8.5}>{a.tipo}</Chip>
                    {a.global && <Chip size={8.5}>Global</Chip>}
                  </span>
                </span>
                <span className="text-right font-semibold" style={{ fontSize: 11, color: UI.texto }}>
                  {a.total}
                </span>
                <span>
                  <Chip size={9} tono="verde">
                    {a.estado}
                  </Chip>
                </span>
              </div>

              {/* Móvil: dos renglones, sin columnas que se corten */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 tablet:hidden">
                <Image src={a.logo} alt="" width={20} height={20} className="h-[17px] w-[17px] shrink-0 object-contain" />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate font-medium" style={{ fontSize: 11, color: UI.texto }}>
                    {a.receptor}
                  </span>
                  <span className="block truncate" style={{ fontSize: 9.5, color: UI.tenue }}>
                    {a.canal} · {a.tipo}
                  </span>
                </span>
                <span className="shrink-0 text-right leading-tight">
                  <span className="block font-semibold" style={{ fontSize: 11, color: UI.texto }}>
                    {a.total}
                  </span>
                  <span className="mt-1 block">
                    <Chip size={8.5} tono="verde">
                      {a.estado}
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
          <div className="grid grid-cols-1 items-center gap-8 tablet:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] tablet:gap-10">
            {/* Izquierda */}
            <div className="flex flex-col items-center text-center tablet:items-start tablet:text-left">
              <h1
                className="font-sora text-[34px] font-light leading-[1.1] text-white tablet:text-[50px] desktop:text-[54px]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Factura tus ventas
                <br />
                en un clic
              </h1>
              <p className="mt-4 max-w-[460px] font-inter text-[15px] font-light leading-[1.55] text-white/80 tablet:text-[17px]">
                Tus pedidos de Mercado Libre, Amazon, TikTok Shop y más llegan listos para facturar,
                y cualquier otra venta la facturas en minutos.
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

            {/* Derecha — la pantalla de Inicio */}
            <div className="relative flex justify-center [perspective:1600px]">
              <div
                className="w-full max-w-[640px] tablet:[transform:rotateY(-6deg)_rotateX(2deg)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <PanelInicio />
              </div>

              {/* El aviso cuelga de la esquina del panel, sin inclinarse. */}
              <div className="pointer-events-none absolute -bottom-7 left-2 z-20 w-[244px] tablet:-bottom-8 tablet:-left-10 tablet:w-[302px]">
                <AvisoPedido />
              </div>
            </div>

            {/* CTA en móvil */}
            <div className="flex flex-col items-center tablet:hidden">
              <a
                href={SIGNUP_URL}
                data-cta-location="hero"
                data-cta-text="Comienza gratis"
                data-cta-destination={SIGNUP_URL}
                className="mt-1 inline-flex h-[52px] items-center justify-center gap-2 rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600"
              >
                Comienza gratis
                {ArrowRight}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
