"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import T1FinalCTA from "@/components/T1FinalCTA";
import { T1FAQSection } from "@/components/T1FAQ";

/* Landing de Uno, la IA de T1 — DRAFT 3.
   Referencias: tiendanube.com/mx/soluciones/lumi y shopify.com/mx/sidekick.
   El chat copia el panel real de Uno (respuesta en texto plano, sin avatar ni
   estrellitas, con copiar / me gusta / no me gusta y la tarjeta debajo).
   Dos secciones con trabajos distintos:
     · "Tus números, en segundos"  → PREGUNTAR (consultas, Uno responde).
     · "Pídelo y queda hecho"       → PEDIR (Uno prepara el cambio y tú lo
       confirmas). Mismo formato que "Todas tus ventas, en un solo lugar" de
       Finanzas (T1FinanzasPilares).
   Todo sale de TARJETAS-UNO-MOVIL.md y SOLO usa tarjetas que ya funcionan:
   nada marcado 🔒 ni ⚠ SOLO DEV (sin facturación, inventario por sucursal ni
   lote de guías). PENDIENTE: cifras reales de uso. */

/* ── Piezas del panel de Uno ── */

function UnoAvatar({ size = 24 }: { size?: number }) {
  return <Image src="/img/uno-avatar.svg" alt="" width={size} height={size} className="inline-block shrink-0" unoptimized />;
}

function Label({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-2">
      <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.08em] text-black/55">{children}</span>
      {right}
    </div>
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

function Delta({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-1.5 py-0.5 font-inter text-[9px] font-bold text-[#15803D]">▲ {children}</span>;
}

function Btn({ children, ghost = false }: { children: ReactNode; ghost?: boolean }) {
  return (
    <span className={`inline-flex items-center rounded-[9px] px-3 py-1.5 font-inter text-[11px] font-semibold ${ghost ? "border border-black/10 bg-white text-black/75" : "bg-[#DB3B2B] text-white"}`}>
      {children}
    </span>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="mt-3 rounded-[14px] border border-black/[0.08] bg-white p-3.5">{children}</div>;
}

function Row({ left, right, sub }: { left: ReactNode; right: ReactNode; sub?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-black/[0.05] py-1.5 last:border-b-0">
      <div className="min-w-0">
        <p className="truncate font-inter text-[11px] font-medium text-black">{left}</p>
        {sub && <p className="truncate font-inter text-[10px] text-black/45">{sub}</p>}
      </div>
      <span className="shrink-0 font-inter text-[11px] font-semibold text-black">{right}</span>
    </div>
  );
}

function Switch({ on }: { on: boolean }) {
  return (
    <span className={`relative inline-block h-[16px] w-[28px] shrink-0 rounded-full transition-colors ${on ? "bg-[#DB3B2B]" : "bg-black/15"}`}>
      <span className="absolute top-[2px] h-[12px] w-[12px] rounded-full bg-white shadow-sm" style={{ left: on ? 14 : 2 }} />
    </span>
  );
}

/* ── Conversaciones. Cada una pinta una tarjeta real de Uno (tipo en el
   comentario). PREGUNTAS = consultas; PEDIDOS = acciones con confirmación. ── */

type Convo = { chip: string; area: string; q: string; text: string; card: ReactNode };

const PREGUNTAS: Convo[] = [
  {
    // report_summary
    chip: "Resumen de ventas",
    area: "Tienda",
    q: "Dame un resumen de mis ventas del último periodo",
    text: "Vendiste $84,320 en octubre, 32% más que el periodo anterior.",
    card: (
      <Card>
        <p className="font-sora text-[13px] font-semibold text-black">Ventas de octubre</p>
        <p className="mb-2.5 font-inter text-[10px] text-black/50">del 1 al 22 oct · vs el periodo anterior</p>
        <div className="mb-2 rounded-[10px] bg-[#F6F6F5] px-3 py-2.5">
          <p className="font-inter text-[9px] font-semibold uppercase tracking-[0.08em] text-black/50">Ventas</p>
          <p className="flex items-center gap-2 font-sora text-[22px] font-semibold text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>$84,320 <Delta>+32 %</Delta></p>
        </div>
        <div className="mb-3 grid grid-cols-2 gap-2">
          {[["Unidades vendidas", "214", "+21 %"], ["Ticket promedio", "$394", "+9 %"]].map(([l, v, d]) => (
            <div key={l} className="rounded-[10px] border border-black/[0.07] px-2.5 py-2">
              <p className="font-inter text-[9px] text-black/50">{l}</p>
              <p className="font-sora text-[14px] font-semibold text-black">{v}</p>
              <Delta>{d}</Delta>
            </div>
          ))}
        </div>
        <Label>Mejores días</Label>
        {[["Vie 17", 100, "$9,840"], ["Sáb 11", 78, "$7,690"], ["Lun 20", 61, "$6,020"]].map(([d, w, v]) => (
          <div key={d as string} className="mb-1.5 flex items-center gap-2">
            <span className="w-[42px] font-inter text-[10px] text-black/60">{d}</span>
            <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-black/[0.05]"><span className="block h-full rounded-full bg-[#DB3B2B]" style={{ width: `${w}%` }} /></span>
            <span className="w-[46px] text-right font-inter text-[10px] font-semibold text-black">{v}</span>
          </div>
        ))}
      </Card>
    ),
  },
  {
    // orders_list
    chip: "Pedidos por preparar",
    area: "Tienda",
    q: "¿Qué pedidos tengo por preparar?",
    text: "Hoy tienes 12 pedidos por preparar y 31 por enviar.",
    card: (
      <Card>
        <Label right={<Pill>12 pedidos</Pill>}>Por preparar</Label>
        {[["#129", "Ana López · 21 oct · Tienda en línea", "$899.00"], ["#128", "Diego Ramírez · 21 oct · Mercado Libre", "$369.00"]].map(([n, s, m]) => (
          <div key={n} className="mb-2 rounded-[10px] border border-black/[0.07] px-3 py-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-sora text-[12px] font-semibold text-black">{n}</p>
                <p className="truncate font-inter text-[10px] text-black/50">{s}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="font-inter text-[12px] font-bold text-black">{m}</span>
                <Pill tone="green">Por preparar</Pill>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <span className="font-inter text-[11px] font-semibold text-black/70">Ver todo</span>
          <Btn ghost>Abrir en Pedidos ↗</Btn>
        </div>
      </Card>
    ),
  },
  {
    // transactions_list
    chip: "Cobros de hoy",
    area: "Pagos",
    q: "¿Cuánto me queda neto de lo que cobré hoy?",
    text: "Hoy cobraste $12,480 en 18 transacciones. Después de comisiones te quedan $12,036.",
    card: (
      <Card>
        <Label right={<Pill>18 transacciones</Pill>}>Transacciones</Label>
        <div className="mb-1.5 rounded-[10px] border border-black/[0.07] px-3 py-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-inter text-[11px] font-semibold text-black">$2,340.00</p>
              <p className="font-inter text-[10px] text-black/50">Tarjeta · Visa •• 4821</p>
            </div>
            <Pill tone="green">Aprobada</Pill>
          </div>
          <div className="mt-2 border-t border-black/[0.05] pt-1.5">
            <Row left="Comisión" right="−$83.07" />
            <Row left="Neto" right="$2,256.93" />
            <Row left="Liquidación" right="24 oct" />
          </div>
        </div>
        <Row left="$899.00" sub="SPEI" right={<Pill tone="green">Aprobada</Pill>} />
        <Row left="$1,250.00" sub="Link de pago · 3 MSI" right={<Pill tone="green">Aprobada</Pill>} />
      </Card>
    ),
  },
  {
    // guide_tracking
    chip: "Rastrea una guía",
    area: "Envíos",
    q: "¿Dónde va el envío del pedido #124?",
    text: "Va en camino a Guadalajara con DHL. La entrega está programada para mañana.",
    card: (
      <Card>
        <Label right={<Pill tone="blue">En tránsito</Pill>}>Guía 4829 1036 52 · DHL</Label>
        <div className="relative pl-4">
          <span aria-hidden className="absolute left-[4px] top-1.5 bottom-1.5 w-px bg-black/10" />
          {[["En tránsito a Guadalajara", "22 oct · 08:14", true], ["Salió del centro de distribución", "21 oct · 19:40", false], ["Recolectado en CDMX", "21 oct · 13:05", false]].map(([e, f, now]) => (
            <div key={e as string} className="relative mb-2.5 last:mb-0">
              <span className={`absolute -left-4 top-[3px] h-[9px] w-[9px] rounded-full border-2 border-white ${now ? "bg-[#DB3B2B]" : "bg-black/25"}`} />
              <p className={`font-inter text-[11px] ${now ? "font-semibold text-black" : "text-black/65"}`}>{e}</p>
              <p className="font-inter text-[10px] text-black/45">{f}</p>
            </div>
          ))}
        </div>
      </Card>
    ),
  },
  {
    // overweight_list
    chip: "Sobrepesos",
    area: "Envíos",
    q: "¿Qué envíos tienen sobrepeso?",
    text: "Tienes 2 guías con sobrepeso este mes por $120 en total. Una sigue por revisar.",
    card: (
      <Card>
        <Label right={<Pill>2 guías</Pill>}>Sobrepesos</Label>
        <Row left="Guía 7710 2284 · Estafeta" sub="Declarado 1 kg · Real 2.4 kg · +140 %" right={<span className="flex flex-col items-end gap-1">+$86<Pill tone="amber">Por revisar</Pill></span>} />
        <Row left="Guía 4829 0915 · DHL" sub="Declarado 3 kg · Real 3.6 kg · +20 %" right={<span className="flex flex-col items-end gap-1">+$34<Pill tone="green">Pagado</Pill></span>} />
      </Card>
    ),
  },
];

const PEDIDOS: (Convo & { title: string; desc: string })[] = [
  {
    // coupon_draft
    chip: "Crea un cupón",
    area: "Tienda",
    title: "Lanza una promoción en un minuto",
    desc: "Dile qué descuento quieres y para qué productos. Uno arma el cupón con su vigencia y su límite de uso.",
    q: "Crea un cupón del 15% para la categoría Bazar",
    text: "Te preparé el cupón. Revísalo antes de activarlo.",
    card: (
      <Card>
        <Label>Borrador de cupón</Label>
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-[6px] border border-dashed border-[#DB3B2B]/50 px-2 py-1 font-sora text-[13px] font-semibold tracking-wide text-[#DB3B2B]">BAZAR15</span>
          <span className="font-sora text-[20px] font-semibold text-black">15%</span>
        </div>
        <Row left="Aplica en" right="Categoría Bazar" />
        <Row left="Vigencia" right="7 días" />
        <Row left="Límite de uso" right="100 cupones" />
        <div className="mt-2.5 flex gap-2"><Btn>Confirmar</Btn><Btn ghost>Cancelar</Btn></div>
      </Card>
    ),
  },
  {
    // payment_link_preview
    chip: "Cobra con un link",
    area: "Pagos",
    title: "Cobra por WhatsApp sin hacer cuentas",
    desc: "Pide el link con el monto, los meses sin intereses y los métodos de pago, y compártelo con tu cliente.",
    q: "Crea un link de pago de $1,250 a 3 meses sin intereses",
    text: "Te preparé el link. Revisa los datos y lo creo.",
    card: (
      <Card>
        <Label>Vista previa del link</Label>
        <p className="mb-2 font-sora text-[22px] font-semibold text-black" style={{ letterSpacing: "-0.02em" }}>$1,250.00</p>
        <Row left="Concepto" right="Pedido personalizado" />
        <Row left="Métodos" right="Tarjeta y SPEI" />
        <Row left="Meses sin intereses" right="3 meses" />
        <div className="mt-2.5 flex gap-2"><Btn>Crear link</Btn><Btn ghost>Editar</Btn></div>
      </Card>
    ),
  },
  {
    // quote_options → shipping_label
    chip: "Genera una guía",
    area: "Envíos",
    title: "Tu guía lista sin comparar paqueterías",
    desc: "Uno cotiza con todas las paqueterías, te muestra precio y tiempo de entrega, y genera la etiqueta con la que elijas.",
    q: "Cotiza el envío del pedido #129 a Monterrey",
    text: "Estas son las tarifas para tu paquete de 2 kg. Elige una y genero la guía.",
    card: (
      <Card>
        <Label right={<span className="font-inter text-[10px] text-black/50">06600 → 64000</span>}>Opciones de envío</Label>
        {[["DHL", "1 a 2 días", "$168", true], ["Estafeta", "2 a 3 días", "$142", false], ["FedEx", "2 a 3 días", "$155", false]].map(([c, t, p, sel]) => (
          <div key={c as string} className={`mb-1.5 flex items-center gap-2.5 rounded-[10px] border px-3 py-2 ${sel ? "border-[#DB3B2B]/50 bg-[rgba(219,59,43,0.04)]" : "border-black/[0.07]"}`}>
            <span className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border ${sel ? "border-[#DB3B2B]" : "border-black/25"}`}>{sel && <span className="h-[7px] w-[7px] rounded-full bg-[#DB3B2B]" />}</span>
            <div className="min-w-0 flex-1">
              <p className="font-inter text-[11px] font-semibold text-black">{c}</p>
              <p className="font-inter text-[10px] text-black/50">{t}</p>
            </div>
            <span className="font-inter text-[12px] font-bold text-black">{p}</span>
          </div>
        ))}
        <div className="mt-2"><Btn>Generar guía</Btn></div>
      </Card>
    ),
  },
  {
    // column_mapping → import_summary
    chip: "Sube tu catálogo",
    area: "Tienda",
    title: "Sube todo tu catálogo de una vez",
    desc: "Manda tu archivo de Excel. Uno acomoda las columnas, te avisa qué filas tienen errores y da de alta tus productos.",
    q: "Sube los productos de este archivo · catalogo-otono.xlsx",
    text: "Listo. Revisé las 248 filas de tu archivo.",
    card: (
      <Card>
        <Label right={<Pill tone="green">Terminado</Pill>}>Resumen de importación</Label>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[["248", "Procesadas"], ["231", "Creadas"], ["12", "Actualizadas"], ["5", "Con error"]].map(([n, l]) => (
            <div key={l} className="rounded-[10px] bg-[#F6F6F5] px-1 py-2">
              <p className="font-sora text-[16px] font-semibold text-black">{n}</p>
              <p className="font-inter text-[9px] text-black/50">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex gap-2"><Btn ghost>Ver errores</Btn><Btn ghost>Ver lote</Btn></div>
      </Card>
    ),
  },
  {
    // payment_methods
    chip: "Activa formas de pago",
    area: "Pagos",
    title: "Activa tus formas de cobro sin buscar en menús",
    desc: "Enciende tarjeta, SPEI y la protección contra contracargos desde el chat, con los términos a la vista.",
    q: "Quiero aceptar SPEI además de tarjeta",
    text: "Así quedarían tus métodos de pago. Confirma y los activo.",
    card: (
      <Card>
        <Label>Métodos de pago</Label>
        {[["Tarjeta de crédito y débito", true], ["SPEI", true], ["Protección contra contracargos", false]].map(([l, on]) => (
          <div key={l as string} className="flex items-center justify-between border-b border-black/[0.05] py-2 last:border-b-0">
            <span className="font-inter text-[11px] font-medium text-black">{l}</span>
            <Switch on={on as boolean} />
          </div>
        ))}
        <div className="mt-2.5 flex gap-2"><Btn>Confirmar</Btn><Btn ghost>Cancelar</Btn></div>
      </Card>
    ),
  },
];

/* ── Hilo: pregunta → puntos → respuesta en texto plano + tarjeta.
   Igual que el panel real: la respuesta NO lleva avatar ni estrellitas. ── */
function Feedback() {
  const ic = "h-[14px] w-[14px] text-black/40";
  return (
    <div className="mt-1.5 flex items-center gap-3">
      <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden><rect x="7" y="4" width="11" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M9 4.5V3.5h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
      <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M7 11v9H4v-9h3zm0 0l4-7c1.5 0 2.5 1 2.2 2.6L12.6 10H19a2 2 0 012 2.3l-1.2 6A2 2 0 0117.8 20H7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
      <svg className={`${ic} rotate-180`} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M7 11v9H4v-9h3zm0 0l4-7c1.5 0 2.5 1 2.2 2.6L12.6 10H19a2 2 0 012 2.3l-1.2 6A2 2 0 0117.8 20H7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
    </div>
  );
}

function ChatThread({ a }: { a: Convo }) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase(1), 350);
    const t2 = window.setTimeout(() => setPhase(2), 1300);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="ml-auto max-w-[85%] rounded-[16px] bg-[#F2F2F1] px-3.5 py-2.5 font-inter text-[12px] text-black/80" style={{ animation: "fadeSlideIn 0.35s ease-out both" }}>
        {a.q}
      </div>
      {phase === 1 && (
        <div className="flex items-center gap-1 py-1">
          {[0, 1, 2].map((k) => (
            <span key={k} className="h-[6px] w-[6px] rounded-full bg-black/30" style={{ animation: `pulse-soft 1s ${k * 0.15}s ease-in-out infinite` }} />
          ))}
        </div>
      )}
      {phase === 2 && (
        <div style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
          <p className="font-inter text-[12.5px] font-medium leading-relaxed text-black/85">{a.text}</p>
          <Feedback />
          {a.card}
        </div>
      )}
    </div>
  );
}

function ChatHeader() {
  const ic = "h-[15px] w-[15px] text-black/45";
  return (
    <div className="flex items-center gap-2 border-b border-black/[0.06] px-4 py-3">
      <UnoAvatar size={26} />
      <span className="font-sora text-[17px] font-bold text-[#DB3B2B]" style={{ letterSpacing: "-0.03em" }}>Uno</span>
      <span className="rounded-[4px] bg-black/[0.05] px-1.5 py-0.5 font-inter text-[8px] font-bold tracking-[0.1em] text-black/60">BETA</span>
      <span className="ml-auto flex items-center gap-3">
        <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M4 20h4L19 9l-4-4L4 16v4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
        <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M4 12a8 8 0 102.3-5.6M4 4v3h3M12 8v4l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
      </span>
    </div>
  );
}

function ChatInput() {
  return (
    <div className="rounded-[14px] border border-black/[0.06] bg-white px-3.5 pt-2.5 pb-2" style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.06)" }}>
      <p className="font-inter text-[11px] text-black/40">Pide lo que necesites…</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-inter text-[16px] leading-none text-black/60">+</span>
        <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-black/[0.06] text-black/40">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 13V3.5M8 3.5L4 7.5M8 3.5L12 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </div>
  );
}

/* Panel completo de Uno. `bodyH` fija el alto del hilo para que el panel no
   brinque al cambiar de conversación; lo que no cabe se desplaza dentro. */
function UnoPanel({ convo, runKey, bodyH }: { convo: Convo; runKey: string | number; bodyH: number }) {
  return (
    <div className="overflow-hidden rounded-[16px] bg-white">
      <ChatHeader />
      <div className="overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ height: bodyH }}>
        <ChatThread key={runKey} a={convo} />
      </div>
      <div className="px-4 pb-4"><ChatInput /></div>
    </div>
  );
}

/* Uno dentro de un teléfono — para las secciones de preguntar y pedir.
   Alto fijo: el hilo se desplaza dentro de la pantalla si no cabe. */
/* `heightClass` deja el teléfono más bajo en celular para que quepa en la
   pantalla junto con las pestañas que lo controlan. */
function UnoPhone({ convo, runKey, dark = false, heightClass = "h-[520px] tablet:h-[600px]" }: { convo: Convo; runKey: string | number; dark?: boolean; heightClass?: string }) {
  return (
    <div
      className={`relative mx-auto w-[290px] shrink-0 rounded-[46px] p-[10px] tablet:w-[300px] ${heightClass}`}
      style={{
        background: dark ? "#2A2A2C" : "#111111",
        boxShadow: dark
          ? "0 0 0 1px rgba(255,255,255,0.14), 0 40px 80px -20px rgba(219,59,43,0.25)"
          : "0 0 0 1px rgba(0,0,0,0.08), 0 40px 80px -24px rgba(0,0,0,0.35)",
      }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[36px] bg-white">
        {/* Barra de estado + isla */}
        <div className="relative flex h-[38px] shrink-0 items-center justify-between px-6 pt-1">
          <span className="font-inter text-[12px] font-semibold text-black">9:41</span>
          <span aria-hidden className="absolute left-1/2 top-[9px] h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1 text-black">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" aria-hidden><rect x="0" y="6" width="3" height="4" rx="1" /><rect x="4.5" y="4" width="3" height="6" rx="1" /><rect x="9" y="2" width="3" height="8" rx="1" /><rect x="13" y="0" width="3" height="10" rx="1" /></svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none" aria-hidden><rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="14" height="7" rx="1.8" fill="currentColor" /><rect x="19.5" y="3.5" width="1.5" height="4" rx="0.75" fill="currentColor" opacity="0.4" /></svg>
          </span>
        </div>
        <ChatHeader />
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ChatThread key={runKey} a={convo} />
        </div>
        <div className="shrink-0 px-3 pb-5"><ChatInput /></div>
      </div>
    </div>
  );
}

/* ── Hero: el chat se reproduce solo, mezclando preguntas y pedidos ── */
const HERO_CONVOS = [PREGUNTAS[0], PEDIDOS[2], PREGUNTAS[2], PEDIDOS[1]];
function HeroChat() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((p) => (p + 1) % HERO_CONVOS.length), 5600);
    return () => window.clearInterval(id);
  }, []);
  return <UnoPanel convo={HERO_CONVOS[i]} runKey={i} bodyH={330} />;
}

/* Fila de pestañas para celular: va pegada arriba del teléfono y se desliza
   de lado, así lo que tocas y lo que cambia se ven en la misma pantalla. La
   activa se centra sola cuando avanza el carrusel. */
function MobileChips({ labels, active, onPick, dark = false }: { labels: string[]; active: number; onPick: (i: number) => void; dark?: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fila = rowRef.current;
    const pill = fila?.querySelector<HTMLElement>(`[data-pill="${active}"]`);
    if (!fila || !pill) return;
    fila.scrollTo({ left: Math.max(0, pill.offsetLeft - (fila.clientWidth - pill.clientWidth) / 2), behavior: "smooth" });
  }, [active]);
  return (
    <div ref={rowRef} className="-mx-5 mb-5 flex gap-2 overflow-x-auto px-5 pb-1 tablet:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {labels.map((l, i) => {
        const on = i === active;
        return (
          <button
            key={l}
            type="button"
            data-pill={i}
            onClick={() => onPick(i)}
            className={`shrink-0 cursor-pointer whitespace-nowrap rounded-[12px] border font-inter transition-all duration-200 ${on ? "font-semibold" : "font-medium"}`}
            style={dark ? {
              padding: "9px 16px", fontSize: 13.5,
              color: on ? "#0e0d0d" : "rgba(255,255,255,0.65)",
              background: on ? "#ffffff" : "rgba(52,52,52,0.55)",
              borderColor: on ? "#ffffff" : "rgba(255,255,255,0.10)",
            } : {
              padding: "9px 16px", fontSize: 13.5,
              color: on ? "#ffffff" : "rgba(0,0,0,0.65)",
              background: on ? "#111111" : "#ffffff",
              borderColor: on ? "#111111" : "rgba(0,0,0,0.10)",
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

/* ── "Tus números, en segundos" — lista de preguntas tipo pestañas
   verticales: solo la activa se abre y muestra la pregunta, con una barra
   que avanza y pasa sola a la siguiente (como los pilares de Finanzas). ── */
const PREG_DURATION = 7000;

function PreguntasSection() {
  const [demo, setDemo] = useState(0);
  // Cambia `run` en cada clic para reiniciar el hilo aunque repitan la pregunta.
  const [run, setRun] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setDemo((d) => (d + 1) % PREGUNTAS.length), PREG_DURATION);
    return () => clearTimeout(timer);
  }, [demo, run, started]);

  return (
    <section ref={sectionRef} className="relative bg-[#FBFBFB] px-5 py-14 tablet:px-10 tablet:py-20">
      <div data-modal-animate className="mx-auto grid max-w-[920px] grid-cols-1 items-center gap-0 tablet:grid-cols-[minmax(0,420px)_300px] tablet:justify-between tablet:gap-16">
        <div>
          <h2 className="text-center font-sora text-[28px] font-light text-black tablet:text-left tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
            Tus números, en segundos
          </h2>
          <p className="mb-6 text-center font-inter text-[16px] font-light text-black/60 tablet:mb-8 tablet:text-left tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
            Pregúntale a Uno lo que quieras saber de tu negocio.
          </p>
          <MobileChips labels={PREGUNTAS.map((a) => a.chip)} active={demo} onPick={(k) => { setDemo(k); setRun((r) => r + 1); }} />
          <div className="hidden flex-col tablet:flex">
            {PREGUNTAS.map((a, k) => {
              const on = k === demo;
              return (
                <button
                  key={a.chip}
                  type="button"
                  onClick={() => { setDemo(k); setRun((r) => r + 1); }}
                  className="group relative cursor-pointer py-3 pl-5 text-left"
                >
                  {/* Riel: gris siempre; en la activa se llena de rojo mientras corre el tiempo */}
                  <span aria-hidden className="absolute left-0 top-0 h-full w-[2px] overflow-hidden rounded-full bg-black/[0.08]">
                    {on && (
                      <span
                        key={`${demo}-${run}`}
                        className="block w-full bg-[#DB3B2B]"
                        style={{ height: "100%", transformOrigin: "top", animation: started ? `pilarProgressY ${PREG_DURATION}ms linear forwards` : "none", transform: started ? undefined : "scaleY(0)" }}
                      />
                    )}
                  </span>
                  <span className={`block font-inter text-[16px] font-semibold transition-colors duration-200 ${on ? "text-black" : "text-black/40 group-hover:text-black/70"}`}>
                    {a.chip}
                  </span>
                  <span className="grid transition-all duration-300" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                    <span className="overflow-hidden">
                      <span className="block pt-1 font-inter text-[14px] font-light text-black/55">“{a.q}”</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <UnoPhone convo={PREGUNTAS[demo]} runKey={`${demo}-${run}`} />
      </div>
    </section>
  );
}

/* ── "Pídelo y queda hecho" — mismo formato que T1FinanzasPilares ── */
const DURATION = 9000;

function PedidosSection() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % PEDIDOS.length), DURATION);
    return () => clearTimeout(timer);
  }, [active, started]);

  const it = PEDIDOS[active];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-5 tablet:px-6" style={{ paddingTop: 72, paddingBottom: 72 }}>
      <div className="relative mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto mb-6 max-w-[760px] text-center tablet:mb-11">
          <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            Pídelo y queda hecho
          </h2>
          <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
            Uno prepara el cambio y tú solo lo confirmas.
          </p>
        </div>

        {/* Celular: pestañas pegadas arriba del teléfono */}
        <p className="mb-3 text-center font-inter text-[13px] font-medium text-white/50 tablet:hidden">Elige qué pedirle a Uno</p>
        <MobileChips labels={PEDIDOS.map((t) => t.chip)} active={active} onPick={setActive} dark />

        <div className="grid grid-cols-1 items-center gap-6 tablet:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] tablet:gap-14">
          <div className="flex justify-center">
            {started ? <UnoPhone convo={it} runKey={active} dark heightClass="h-[520px] tablet:h-[540px]" /> : <div className="h-[520px] tablet:h-[540px]" />}
          </div>
          <div className="flex flex-col">
            <p className="mb-3 hidden font-inter text-[13px] font-medium text-white/50 tablet:block">Elige qué pedirle a Uno</p>
            <div className="mb-8 hidden max-w-[440px] flex-wrap gap-2 tablet:flex">
              {PEDIDOS.map((t, i) => {
                const on = i === active;
                return (
                  <button
                    key={t.chip}
                    type="button"
                    data-pill={i}
                    onClick={() => setActive(i)}
                    className={`shrink-0 cursor-pointer whitespace-nowrap rounded-[12px] border font-inter transition-all duration-200 ${on ? "font-semibold text-[#0e0d0d]" : "font-medium text-white/65 hover:text-white"}`}
                    /* Mismo estilo que las pestañas de "Un ecosistema para todo tu negocio" (T1Solutions) */
                    style={{
                      padding: "9px 16px",
                      fontSize: 13.5,
                      background: on ? "#ffffff" : "rgba(52,52,52,0.55)",
                      borderColor: on ? "#ffffff" : "rgba(255,255,255,0.10)",
                      boxShadow: on ? "0 4px 16px rgba(0,0,0,0.45)" : "none",
                    }}
                  >
                    {t.chip}
                  </button>
                );
              })}
            </div>
            <div key={it.chip} className="flex flex-1 flex-col text-center tablet:min-h-[200px] tablet:text-left" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
              <h3 className="mx-auto font-sora text-[20px] font-normal text-white tablet:mx-0 tablet:text-[30px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 12, maxWidth: 420 }}>
                {it.title}
              </h3>
              <p className="mx-auto font-inter text-[15px] font-light leading-relaxed text-white/60 tablet:mx-0 tablet:text-[17px]" style={{ maxWidth: 420 }}>
                {it.desc}
              </p>
              <div className="mx-auto mt-6 h-[3px] w-full max-w-[420px] overflow-hidden rounded-full tablet:mx-0 tablet:mt-auto" style={{ background: "rgba(255,255,255,0.10)" }}>
                <div
                  key={active}
                  style={{ height: "100%", width: "100%", background: "#DB3B2B", transformOrigin: "left", animation: started ? `pilarProgress ${DURATION}ms linear forwards` : "none", transform: started ? undefined : "scaleX(0)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── "Todo tu negocio" — logo de cada producto y una burbuja de pregunta
   que va cambiando sola (desfasada por tarjeta para que no cambien juntas). ── */
const SOURCES = [
  { logo: "/img/t1tienda-logo.svg", alt: "T1 Tienda", w: 130, knows: "Ventas por canal, pedidos, productos, cupones y catálogo.", asks: ["¿Qué pedidos tengo por preparar?", "¿Cuál fue mi mejor día este mes?", "Crea un cupón del 10% para mi categoría Bazar", "¿Qué canal me vende más?"] },
  { logo: "/img/t1pagos-logo.svg", alt: "T1 Pagos", w: 137, knows: "Transacciones con comisión y neto, links de pago y métodos de cobro.", asks: ["¿Cuánto me queda neto de lo que cobré hoy?", "Crea un link de pago de $850", "¿Cuándo me liquidan lo de esta semana?", "Activa SPEI en mi tienda"] },
  { logo: "/img/t1envios-logo.svg", alt: "T1 Envíos", w: 137, knows: "Cotizaciones, guías, rastreo, recolecciones, incidencias y sobrepesos.", asks: ["¿Dónde va el envío del pedido #124?", "Cotiza 2 kg de CDMX a Mérida", "Programa una recolección para mañana", "¿Qué envíos tienen sobrepeso?"] },
];

function RotatingAsk({ asks, offset }: { asks: string[]; offset: number }) {
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
      {/* ── Hero — texto izquierda, chat que se reproduce solo a la derecha ── */}
      <section className="relative overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24">
        <HeroBackground fade={false} />
        <div className="relative z-10 mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tablet:gap-12">
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]" style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 22 }}>
                Decide en segundos con{" "}
                <span className="inline-flex items-center gap-2.5 whitespace-nowrap align-middle font-normal" style={{ color: "#FFB3A6" }}>
                  Uno
                  <span className="inline-block h-[40px] w-[40px] tablet:h-[54px] tablet:w-[54px] lg:h-[66px] lg:w-[66px]">
                    <Image src="/img/uno-avatar.svg" alt="" width={66} height={66} className="h-full w-full" unoptimized priority />
                  </span>
                </span>
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                Uno es la IA de T1. Pregúntale por tus ventas, cobros o envíos, y pídele que haga el trabajo por ti. Sin costo.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Comienza gratis
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto rounded-[20px]" style={{ maxWidth: 440, padding: 12, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}>
                <HeroChat />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro — qué es Uno en un vistazo, antes de los demos ── */}
      <section className="relative bg-white px-5 py-14 tablet:px-10 tablet:py-24">
        <div className="mx-auto max-w-[1040px]">
          <div data-modal-animate className="mx-auto mb-8 max-w-[720px] text-center tablet:mb-12">
            {/* Avatar animado de Uno. El video trae fondo blanco (sin
                transparencia): mix-blend-multiply lo funde con el fondo, así
                que SOLO sirve en secciones claras. */}
            <video
              src="/video/uno-avatar.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
              className="mx-auto mb-4 h-[96px] w-[96px] mix-blend-multiply tablet:h-[120px] tablet:w-[120px]"
            />
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

      {/* ── PREGUNTAR — consultas ── */}
      <PreguntasSection />

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

      {/* ── PEDIR — acciones con confirmación ── */}
      <PedidosSection />

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
          <div data-modal-animate className="rounded-[24px] p-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
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
        title="Tu próxima gran decisión empieza con una pregunta"
        description="Crea tu cuenta gratis y pregúntale a Uno cómo va tu negocio hoy."
      />
    </div>
  );
}
