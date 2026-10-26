"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import T1FinalCTA from "@/components/T1FinalCTA";
import { T1FAQSection } from "@/components/T1FAQ";
import {
  UnoHeroCard,
  UnoStage,
  type Scene,
  VisualCatalogo,
  VisualCobros,
  VisualCupon,
  VisualGuia,
  VisualLink,
  VisualPedidos,
  VisualProductoFoto,
  VisualTienda,
  VisualRastreo,
  VisualSobrepeso,
  VisualVentas,
} from "@/components/T1UnoStage";

/* Landing de Uno, la IA de T1 — DRAFT 4.
   Referencias: tiendanube.com/mx/soluciones/lumi y shopify.com/mx/sidekick.
   · Hero: Uno en grande, con el campo de texto escribiendo solo (Sidekick).
   · Dos escenarios con chat minimalista + el RESULTADO real al lado
     (T1UnoStage): "Tus números" para PREGUNTAR y "Pídelo" para PEDIR.
   Todo sale de TARJETAS-UNO-MOVIL.md y SOLO usa tarjetas que ya funcionan:
   nada marcado 🔒 ni ⚠ SOLO DEV (sin facturación, inventario por sucursal ni
   lote de guías). PENDIENTE: cifras reales de uso. */

/* Avatar animado de Uno con fondo transparente (paquete "Uno - estados del
   avatar"). Cada estado trae .mov HEVC con alfa (Safari/iPhone, va primero)
   y .webm VP9 con alfa (Chrome, Edge, Firefox, Android). Todos comparten el
   mismo lienzo de 738×748, así que cambiar de estado no lo mueve de lugar.
   `listo` y `aviso` son gestos de una vez: con `then`, al terminar pasa a
   ese estado en loop. Con `onView` el gesto espera a que se vea en pantalla. */
export type UnoEstado = "saludo" | "reposo" | "escuchando" | "trabajando" | "listo" | "aviso";

export function UnoVideo({ estado, then, onView = false, className = "" }: { estado: UnoEstado; then?: UnoEstado; onView?: boolean; className?: string }) {
  const [actual, setActual] = useState<UnoEstado>(estado);
  const [visible, setVisible] = useState(!onView);
  const ref = useRef<HTMLVideoElement>(null);
  const unaVez = actual === "listo" || actual === "aviso";

  useEffect(() => {
    if (!onView) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onView]);

  useEffect(() => {
    if (visible) ref.current?.play().catch(() => {});
  }, [visible, actual]);

  return (
    <video
      key={actual}
      ref={ref}
      autoPlay={visible}
      muted
      loop={!unaVez}
      playsInline
      preload="auto"
      aria-hidden
      onEnded={() => { if (unaVez && then) setActual(then); }}
      className={`pointer-events-none select-none object-contain ${className}`}
    >
      <source src={`/video/uno/uno-${actual}-safari.mov`} type='video/mp4; codecs="hvc1"' />
      <source src={`/video/uno/uno-${actual}.webm`} type="video/webm" />
    </video>
  );
}

function Pill({ children, tone = "gray" }: { children: ReactNode; tone?: "gray" | "green" | "amber" | "blue" }) {
  const tones = {
    gray: "bg-black/[0.05] text-black/70",
    green: "border border-[#16A34A]/25 bg-[rgba(34,197,94,0.08)] text-[#15803D]",
    amber: "border border-[#D97706]/25 bg-[rgba(245,158,11,0.10)] text-[#B45309]",
    blue: "border border-[#2563EB]/20 bg-[rgba(37,99,235,0.07)] text-[#1D4ED8]",
  };
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-inter text-[10px] font-semibold ${tones[tone]}`}>{children}</span>;
}

/* Diseño de la tienda (builder de T1 Tienda con Uno) */
export const TIENDA: Scene[] = [
  { chip: "Crea tu tienda", panelTitle: "Diseño de tienda", prompt: "Hazme una tienda de streetwear que se llame AURUM", reply: "Tu tienda está lista con portada, colección y tus productos.", action: "Abrir editor de tienda", Visual: ({ done }) => <VisualTienda done={done} variante="crear" /> },
  { chip: "Agrega una sección", panelTitle: "Diseño de tienda", prompt: "Agrega una sección con lo más vendido", reply: "Agregué la sección “Lo más vendido” debajo de la portada.", action: "Ver sección en el editor", Visual: ({ done }) => <VisualTienda done={done} variante="seccion" /> },
  { chip: "Cambia el estilo", panelTitle: "Diseño de tienda", prompt: "Ponle un estilo oscuro y elegante", reply: "Cambié los colores de tu tienda a un estilo oscuro.", action: "Ver cambios en el editor", Visual: ({ done }) => <VisualTienda done={done} variante="oscuro" /> },
];

/* ── Escenas. Cada una usa una tarjeta real de Uno (tipo en el comentario) ── */

export const PREGUNTAS: Scene[] = [
  // report_summary
  { chip: "Resumen de ventas", panelTitle: "Ventas", prompt: "¿Cómo me fue en ventas este mes?", reply: "Vendiste $84,320 en octubre, 32% más que el mes pasado. Tu mejor canal fue la tienda en línea.", action: "Ver reporte de ventas", Visual: VisualVentas },
  // orders_list
  { chip: "Pedidos por preparar", panelTitle: "Pedidos", prompt: "¿Qué pedidos tengo por preparar?", reply: "Tienes 12 pedidos por preparar. El más antiguo es de ayer en la tarde.", action: "Abrir en Pedidos", Visual: VisualPedidos },
  // transactions_list
  { chip: "Cobros de hoy", panelTitle: "Cobros", prompt: "¿Cuánto me queda neto de lo que cobré hoy?", reply: "Cobraste $12,480 en 18 transacciones. Después de comisiones te quedan $12,036.", action: "Ver transacciones", Visual: VisualCobros },
  // guide_tracking
  { chip: "Rastrea un envío", panelTitle: "Envíos", prompt: "¿Dónde va el envío del pedido #124?", reply: "Va en camino a Guadalajara con DHL. Llega mañana.", action: "Ver rastreo completo", Visual: VisualRastreo },
  // overweight_list
  { chip: "Sobrepesos", panelTitle: "Envíos", prompt: "¿Tengo envíos con sobrepeso?", reply: "Sí, una guía de Estafeta pesó 2.4 kg y declaraste 1 kg. El cobro extra es de $86.", action: "Ver sobrepesos", Visual: VisualSobrepeso },
];

export const PEDIDOS: Scene[] = [
  // coupon_draft
  { chip: "Crea un cupón", panelTitle: "Promociones", prompt: "Crea un cupón del 15% para sudaderas", reply: "Te preparé el cupón PROMO15. Revísalo y confírmalo para activarlo.", action: "Ver cupones", Visual: VisualCupon },
  // product_draft — alta de producto a partir de una foto
  { chip: "Producto con una foto", panelTitle: "Productos", prompt: "Crea un producto con esta foto", reply: "Listo, llené nombre, precio, categoría y descripción. Revísalo y publícalo.", action: "Abrir producto", Visual: VisualProductoFoto },
  // payment_link_preview → payment_link_result (por producto o monto libre)
  { chip: "Crea un link de pago", panelTitle: "Links de pago", prompt: "Crea un link de pago de la sudadera hueso a 3 meses sin intereses", reply: "Tu link de pago está listo para compartir.", action: "Copiar link de pago", Visual: VisualLink },
  // quote_options → shipping_label
  { chip: "Genera una guía", panelTitle: "Envíos", prompt: "Genera la guía del pedido #129 con la opción más rápida", reply: "Tu guía de DHL está lista: llega en 1 a 2 días por $168.", action: "Imprimir guía", Visual: VisualGuia },
  // column_mapping → import_summary
  { chip: "Sube tu catálogo", panelTitle: "Productos", prompt: "Sube los productos de catalogo-aurum.xlsx", reply: "Di de alta 231 productos. 5 filas tienen errores para revisar.", action: "Ver lote de importación", Visual: VisualCatalogo },
];

/* ── "Todo tu negocio" — logo de cada producto y una burbuja de pregunta
   que va cambiando sola (desfasada por tarjeta para que no cambien juntas). ── */
export const SOURCES = [
  { logo: "/img/t1tienda-logo.svg", alt: "T1 Tienda", w: 130, knows: "Ventas por canal, pedidos, productos, cupones y catálogo.", asks: ["¿Qué pedidos tengo por preparar?", "¿Cuál fue mi mejor día este mes?", "Crea un cupón del 10% para mi categoría Bazar", "¿Qué canal me vende más?"] },
  { logo: "/img/t1pagos-logo.svg", alt: "T1 Pagos", w: 137, knows: "Transacciones con comisión y neto, links de pago y métodos de cobro.", asks: ["¿Cuánto me queda neto de lo que cobré hoy?", "Crea un link de pago de $850", "¿Cuándo me liquidan lo de esta semana?", "¿Qué cobros me rechazaron hoy?"] },
  { logo: "/img/t1envios-logo.svg", alt: "T1 Envíos", w: 137, knows: "Cotizaciones, guías, rastreo, recolecciones, incidencias y sobrepesos.", asks: ["¿Dónde va el envío del pedido #124?", "Cotiza 2 kg de CDMX a Mérida", "Programa una recolección para mañana", "¿Qué envíos tienen sobrepeso?"] },
];

export function RotatingAsk({ asks, offset }: { asks: string[]; offset: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    let id = 0;
    const start = window.setTimeout(() => {
      setI((p) => (p + 1) % asks.length);
      id = window.setInterval(() => setI((p) => (p + 1) % asks.length), 3600);
    }, 3600 + offset);
    return () => { window.clearTimeout(start); window.clearInterval(id); };
  }, [asks.length, offset]);
  return (
    <div className="flex min-h-[64px] items-end justify-end">
      <div key={i} className="max-w-[92%] rounded-[16px] rounded-br-[4px] bg-[#F2F2F1] px-3.5 py-2.5 font-inter text-[13px] text-black/80" style={{ animation: "fadeSlideIn 0.45s ease-out both" }}>
        {asks[i]}
      </div>
    </div>
  );
}

export default function T1IA() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("modal-visible"); }),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    root.querySelectorAll("[data-modal-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="w-full">
      {/* ── Hero — texto izquierda, Uno en grande a la derecha (como Sidekick) ── */}
      <section className="relative overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24">
        <HeroBackground fade={false} />
        <div className="relative z-10 mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tablet:gap-12">
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]" style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 22 }}>
                {/* Juego de palabras: el "ia" de aliado va en color, en minúsculas
                    (en Sora la "l" y la "I" mayúscula se confunden: "allAdo") */}
                El al<span style={{ color: "#FFB3A6" }}>ia</span>do que tu negocio necesitaba
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                Uno, la IA de T1, entiende tu operación y te ayuda a sacarla adelante.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Comienza gratis
                </a>
              </div>
            </div>

            <div className="relative">
              <UnoHeroCard avatar={<UnoVideo estado="saludo" className="h-full w-full" />} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro — qué es Uno en un vistazo, antes de los demos ── */}
      <section className="relative bg-white px-5 py-14 tablet:px-10 tablet:py-24">
        <div className="mx-auto max-w-[1040px]">
          <div data-modal-animate className="mx-auto mb-8 max-w-[720px] text-center tablet:mb-12">
            {/* Uno escuchando: atento, justo cuando se presenta */}
            <UnoVideo estado="escuchando" className="mx-auto mb-3 block h-[96px] w-[96px] tablet:h-[120px] tablet:w-[120px]" />
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Un experto en tu negocio
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              Uno vive en tu administrador de T1 y trabaja con tus datos reales.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 text-left tablet:grid-cols-3 tablet:gap-5">
            {[
              { title: "Pregúntale", desc: "Ventas, pedidos, cobros o envíos: te responde con tus números.", icon: <path d="M5 6.5A2.5 2.5 0 017.5 4h9A2.5 2.5 0 0119 6.5v7a2.5 2.5 0 01-2.5 2.5H11l-4 3.5V16h0.5A2.5 2.5 0 015 13.5v-7z" /> },
              { title: "Pídele", desc: "Crea cupones, links de pago y guías, o sube tu catálogo.", icon: <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" /> },
              { title: "Tú decides", desc: "Nada cambia en tu negocio hasta que lo confirmas.", icon: <><circle cx="12" cy="12" r="9" /><path d="M8 12.3l2.8 2.8L16.2 9.5" /></> },
            ].map((c, i) => (
              <div key={c.title} data-stagger style={{ ["--i" as string]: i }} className="flex flex-col rounded-[20px] border border-black/[0.06] bg-[#FBFBFB] p-5 tablet:p-6">
                <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
                  {/* Ícono en oxford, mismo trazo que los beneficios de Finanzas */}
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>{c.icon}</svg>
                  <h3 className="font-sora text-[19px] font-normal text-black tablet:text-[21px]" style={{ letterSpacing: "-0.02em" }}>{c.title}</h3>
                </div>
                <p className="font-inter text-[14px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREGUNTAR — consultas: lista a la izquierda, el dato y el chat a la derecha ── */}
      <section className="relative overflow-hidden bg-[#FBFBFB] px-5 py-16 tablet:px-10 tablet:py-24">
        <UnoStage
          scenes={PREGUNTAS}
          layout="list"
          header={
            <div className="mb-6 text-center tablet:mb-8 tablet:text-left">
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
                Tus números, en segundos
              </h2>
              <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
                Pregúntale a Uno lo que quieras saber de tu negocio.
              </p>
            </div>
          }
        />
      </section>

      {/* ── Tienda, Pagos y Envíos en el mismo chat ── */}
      <section className="relative bg-white px-5 py-16 tablet:px-10 tablet:py-28">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto mb-8 max-w-[760px] text-center tablet:mb-12">
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Todo tu negocio en una sola conversación
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Uno vive en cada administrador de T1 y conoce toda tu operación.
            </p>
          </div>
          <div data-modal-animate className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden tablet:mx-auto tablet:grid tablet:max-w-[1040px] tablet:grid-cols-3 tablet:gap-5 tablet:overflow-visible tablet:px-0 tablet:pb-0">
            {SOURCES.map((s, i) => (
              <div key={s.alt} data-stagger style={{ ["--i" as string]: i }} className="tienda-card flex w-[82%] shrink-0 snap-center flex-col rounded-[20px] border border-black/[0.06] bg-[#FBFBFB] p-6 tablet:w-auto">
                <Image src={s.logo} alt={s.alt} width={s.w} height={42} className="h-[30px] w-auto self-start" style={{ marginBottom: 14 }} />
                <p className="font-inter text-[14px] font-light text-black/60" style={{ lineHeight: 1.6, marginBottom: 20 }}>{s.knows}</p>
                <div className="mt-auto">
                  <RotatingAsk asks={s.asks} offset={i * 1200} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PEDIR — acciones: chat + el cambio hecho en tu tienda ── */}
      <section className="relative overflow-hidden bg-black px-5 py-16 tablet:px-10 tablet:py-24">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto mb-8 max-w-[760px] text-center">
            {/* Uno trabajando: mira arriba y abajo, como leyendo */}
            <UnoVideo estado="trabajando" className="mx-auto mb-2 block h-[72px] w-[72px] tablet:h-[92px] tablet:w-[92px]" />
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
              Pídelo y queda hecho
            </h2>
            <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              Tú lo confirmas y lo ves al momento en tu tienda.
            </p>
          </div>
          <UnoStage scenes={PEDIDOS} dark reverse />
        </div>
      </section>

      {/* ── DISEÑAR — el builder de la tienda con Uno ── */}
      <section className="relative overflow-hidden bg-white px-5 py-16 tablet:px-10 tablet:py-24">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto mb-8 max-w-[720px] text-center">
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
              Diseña tu tienda con solo pedirlo
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              Uno arma tu tienda en línea y la cambia cuando se lo pides.
            </p>
          </div>
          <UnoStage scenes={TIENDA} separate />
        </div>
      </section>

      {/* ── Alta acompañada — alta_hub / next_steps. Oscura y a tamaño
          completo: va entre "Pídelo" y la FAQ, que también son negras, para
          que la página no brinque a blanco y regrese. ── */}
      <section className="relative overflow-hidden bg-[#0e0d0d] px-5 py-24 tablet:px-10 tablet:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10%] top-1/2 h-[560px] w-[760px] -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(219,59,43,0.16) 0%, transparent 65%)", filter: "blur(50px)" }}
        />
        <div className="relative mx-auto grid max-w-[var(--max-w)] grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] tablet:gap-16">
          <div data-modal-animate>
            <h2 className="font-sora text-[30px] font-light text-white tablet:text-[48px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }}>
              Empieza a vender con Uno a tu lado
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[19px]" style={{ lineHeight: 1.6, marginBottom: 32, maxWidth: 480 }}>
              Desde el primer día, Uno te dice qué te falta para cobrar, vender y facturar, y lo resuelve contigo paso a paso.
            </p>
            <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
              Comienza gratis
            </a>
          </div>
          <div data-modal-animate className="relative rounded-[24px] p-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
            {/* Uno salta de gusto al ver la tarjeta del alta y luego se queda en reposo */}
            <UnoVideo estado="listo" then="reposo" onView className="absolute -top-[64px] right-4 z-[2] h-[84px] w-[84px] tablet:-top-[78px] tablet:h-[100px] tablet:w-[100px]" />
            <div className="rounded-[16px] bg-white p-6 tablet:p-7">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-black/55">Tu alta</span>
                <span className="font-inter text-[13px] font-semibold text-black/60">1 de 3</span>
              </div>
              <div className="mb-3 h-[6px] overflow-hidden rounded-full bg-black/[0.06]"><span className="block h-full w-1/3 rounded-full bg-[#DB3B2B]" /></div>
              {[
                { goal: "Cobrar", status: "Completado", tone: "green" as const, detail: "Tarjeta y SPEI activos", action: null },
                { goal: "Vender", status: "Falta", tone: "amber" as const, detail: "Agrega tu primer producto", action: "Crear producto" },
                { goal: "Facturar", status: "Falta", tone: "amber" as const, detail: "Completa tus datos fiscales", action: "Completar" },
              ].map((g) => (
                <div key={g.goal} className="flex items-center gap-4 border-b border-black/[0.06] py-4 last:border-b-0 last:pb-0">
                  <span className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full ${g.tone === "green" ? "bg-[rgba(34,197,94,0.12)] text-[#15803D]" : "bg-black/[0.05] text-black/40"}`}>
                    {g.tone === "green" ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    ) : (
                      <span className="h-[9px] w-[9px] rounded-full bg-current" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 font-sora text-[16px] font-semibold text-black">{g.goal} <Pill tone={g.tone}>{g.status}</Pill></p>
                    <p className="font-inter text-[13px] text-black/55">{g.detail}</p>
                  </div>
                  {g.action && (
                    <span className="hidden shrink-0 items-center rounded-[10px] border border-black/10 px-3.5 py-2 font-inter text-[12px] font-semibold text-black/75 tablet:inline-flex">{g.action}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ — orden y temas tomados de Sidekick/Lumi ── */}
      <T1FAQSection
        faqs={[
          { q: "¿Uno tiene costo?", a: "No. Uno viene incluido en tu cuenta de T1, sin costo adicional." },
          { q: "¿Dónde encuentro a Uno?", a: "Uno vive en cada uno de los administradores de T1. Ábrelo desde el panel lateral en cualquier sección y haz tu pregunta." },
          { q: "¿Qué puede hacer Uno?", a: "Consulta tus ventas, pedidos, transacciones y envíos; cotiza y genera guías, programa recolecciones, crea productos, cupones y links de pago, importa tu catálogo y configura tus métodos de pago y de entrega." },
          { q: "¿Puede hacer cambios en mi negocio?", a: "Sí, pero siempre te muestra una propuesta antes. Nada se aplica hasta que eliges Aplicar o Confirmar." },
          { q: "¿Qué hace diferente a Uno de otras herramientas de IA?", a: "Uno trabaja con los datos reales de tu tienda, tus cobros y tus envíos, y puede hacer cambios en ellos. No te da consejos genéricos: te responde con tus números." },
          { q: "¿Necesito conocimientos técnicos?", a: "No. Le escribes como le escribirías a alguien de tu equipo, sin fórmulas ni filtros." },
        ]}
      />

      <T1FinalCTA
        title={
          <>
            <UnoVideo estado="saludo" className="mx-auto mb-4 block h-[88px] w-[88px] tablet:h-[110px] tablet:w-[110px]" />
            Tu próxima gran decisión empieza con una pregunta
          </>
        }
        description="Crea tu cuenta gratis y pregúntale a Uno cómo va tu negocio hoy."
      />
    </div>
  );
}
