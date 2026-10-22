"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SALES_URL, SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import T1FinalCTA from "@/components/T1FinalCTA";
import { T1FAQSection } from "@/components/T1FAQ";

/* Landing de Uno, la IA de T1 — PRIMER DRAFT.
   Referencia: tiendanube.com/mx/soluciones/lumi (hero + chat en acción +
   "conoce tu tienda" + acciones + FAQ). Lo que nos diferencia: Uno ve
   Tienda, Pagos, Envíos, POS y Finanzas a la vez, así que las preguntas
   del demo cruzan productos a propósito.
   PENDIENTE: si hay cifras reales de uso para poner una franja de métricas como la de Lumi. */

const CORAL = "#DB3B2B";

function Sparkle({ size = 14, color = "#FF8C6E" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M11 1.6l1.75 6.9 6.9 1.75-6.9 1.75L11 18.85 9.25 11.95 2.35 10.25 9.25 8.5 11 1.6z" fill={color} />
      <path d="M19.2 13.3l.85 3.05 3.05.85-3.05.85-.85 3.05-.85-3.05-3.05-.85 3.05-.85.85-3.05z" fill={color} opacity="0.85" />
    </svg>
  );
}

function PrimaryBtn({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
      {children}
    </a>
  );
}

/* ── Respuestas del demo — cada una con su tarjeta de datos ── */

function MiniBtn({ children, ghost = false }: { children: ReactNode; ghost?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-[9px] px-3 py-1.5 font-inter text-[11px] font-semibold ${ghost ? "border border-black/10 text-black/70" : "bg-[#DB3B2B] text-white"}`}
    >
      {children}
    </span>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="mt-2.5 rounded-[12px] border border-black/[0.07] bg-[#FAFAF9] p-3">{children}</div>;
}

function Row({ left, right, sub }: { left: string; right: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-black/[0.05] py-1.5 last:border-b-0">
      <div className="min-w-0">
        <p className="truncate font-inter text-[11px] font-medium text-black">{left}</p>
        {sub && <p className="font-inter text-[10px] text-black/45">{sub}</p>}
      </div>
      <span className="shrink-0 font-inter text-[11px] font-semibold text-black">{right}</span>
    </div>
  );
}

type Answer = { chip: string; area: string; q: string; text: string; card: ReactNode };

const ANSWERS: Answer[] = [
  {
    chip: "Ventas de la semana",
    area: "Tienda",
    q: "¿Cómo fueron mis ventas en los últimos 7 días?",
    text: "Vendiste $284,920, 24% más que la semana pasada. El viernes fue tu mejor día: ese día conviene lanzar tu siguiente promoción.",
    card: (
      <Card>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-inter text-[10px] text-black/45">Ventas · 7 días</p>
            <p className="font-sora text-[22px] font-light text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>$284,920</p>
          </div>
          <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#16A34A]">↑ 24%</span>
        </div>
        <div className="mt-3 flex h-[52px] items-end gap-1.5">
          {[35, 52, 28, 64, 48, 92, 70].map((h, k) => (
            <span key={k} className="flex-1 rounded-[3px]" style={{ height: `${h}%`, background: k === 5 ? CORAL : "rgba(219,59,43,0.22)" }} />
          ))}
        </div>
        <div className="mt-1 flex justify-between font-inter text-[9px] text-black/40">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, k) => <span key={k} className="flex-1 text-center">{d}</span>)}
        </div>
      </Card>
    ),
  },
  {
    chip: "Pedidos sin guía",
    area: "Envíos",
    q: "¿Qué pedidos pagados siguen sin guía?",
    text: "Tienes 12 pedidos pagados sin guía. Puedo generarlas todas con la paquetería más barata para cada destino.",
    card: (
      <Card>
        <Row left="#10482 · Monterrey" sub="1.2 kg · Estafeta" right="$118" />
        <Row left="#10479 · Guadalajara" sub="0.8 kg · DHL" right="$132" />
        <Row left="#10475 · Mérida" sub="2.0 kg · FedEx" right="$164" />
        <p className="mt-1 font-inter text-[10px] text-black/45">+ 9 pedidos más</p>
        <div className="mt-2.5 flex gap-2"><MiniBtn>Generar 12 guías</MiniBtn><MiniBtn ghost>Ver pedidos</MiniBtn></div>
      </Card>
    ),
  },
  {
    chip: "Cupón relámpago",
    area: "Tienda",
    q: "Crea un cupón del 15% para la categoría Bazar",
    text: "Listo, te preparé el cupón. Revísalo y lo activo en tu tienda en línea y en tus sucursales.",
    card: (
      <Card>
        <div className="flex items-center justify-between">
          <span className="rounded-[6px] border border-dashed border-[#DB3B2B]/50 px-2 py-1 font-sora text-[13px] font-medium tracking-wide text-[#DB3B2B]">BAZAR15</span>
          <span className="font-sora text-[20px] font-light text-black">15%</span>
        </div>
        <div className="mt-2">
          <Row left="Aplica en" right="Categoría Bazar" />
          <Row left="Vigencia" right="7 días" />
          <Row left="Canales" right="En línea y sucursales" />
        </div>
        <div className="mt-2.5 flex gap-2"><MiniBtn>Activar cupón</MiniBtn><MiniBtn ghost>Editar</MiniBtn></div>
      </Card>
    ),
  },
  {
    chip: "Stock por sucursal",
    area: "POS",
    q: "¿Qué producto se me va a acabar primero?",
    text: "Los Tenis Runner blancos se terminan en Sucursal Centro en unos 3 días. En Sucursal Norte todavía tienes para un mes.",
    card: (
      <Card>
        <Row left="Sucursal Centro" sub="Vende 4 al día" right="12 pzas" />
        <Row left="Sucursal Norte" sub="Vende 1 al día" right="31 pzas" />
        <Row left="Bodega en línea" sub="Vende 2 al día" right="18 pzas" />
        <div className="mt-2.5 flex gap-2"><MiniBtn>Mover 10 pzas a Centro</MiniBtn></div>
      </Card>
    ),
  },
  {
    chip: "Depósitos",
    area: "Pagos",
    q: "¿Cuánto me depositan esta semana?",
    text: "Esta semana recibes $96,430 en 3 depósitos. El más grande llega el jueves.",
    card: (
      <Card>
        <Row left="Martes" sub="Ventas con tarjeta" right="$28,150" />
        <Row left="Jueves" sub="Ventas con tarjeta y links de pago" right="$51,920" />
        <Row left="Sábado" sub="Ventas con SPEI" right="$16,360" />
      </Card>
    ),
  },
  {
    chip: "Factura global",
    area: "Finanzas",
    q: "Factura los pedidos de ayer que nadie pidió facturar",
    text: "Encontré 38 pedidos de ayer sin factura. Puedo hacer una factura global por $41,280 y timbrarla cuando la apruebes.",
    card: (
      <Card>
        <Row left="Pedidos incluidos" right="38" />
        <Row left="Subtotal" right="$35,586" />
        <Row left="IVA" right="$5,694" />
        <Row left="Total" right="$41,280" />
        <div className="mt-2.5 flex gap-2"><MiniBtn>Revisar y timbrar</MiniBtn></div>
      </Card>
    ),
  },
];

/* ── Hilo de chat: pregunta → "pensando" → respuesta. Se reinicia con `key`. ── */
function ChatThread({ a }: { a: Answer }) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase(1), 350);
    const t2 = window.setTimeout(() => setPhase(2), 1300);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="ml-auto max-w-[85%] rounded-[14px] rounded-br-[4px] bg-[#1A1A1A] px-3.5 py-2.5 font-inter text-[12px] text-white" style={{ animation: "fadeSlideIn 0.35s ease-out both" }}>
        {a.q}
      </div>
      {phase >= 1 && (
        <div className="flex items-start gap-2" style={{ animation: "fadeSlideIn 0.35s ease-out both" }}>
          <span className="mt-0.5 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[rgba(219,59,43,0.10)]"><Sparkle size={12} color={CORAL} /></span>
          {phase === 1 ? (
            <div className="flex items-center gap-1 rounded-[12px] bg-[#F4F4F3] px-3 py-2.5">
              {[0, 1, 2].map((k) => (
                <span key={k} className="h-[5px] w-[5px] rounded-full bg-black/35" style={{ animation: `pulse-soft 1s ${k * 0.15}s ease-in-out infinite` }} />
              ))}
            </div>
          ) : (
            <div className="min-w-0 flex-1" style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
              <span className="mb-1 inline-block rounded-full bg-black/[0.05] px-2 py-0.5 font-inter text-[9px] font-semibold uppercase tracking-wide text-black/50">Datos de {a.area}</span>
              <p className="font-inter text-[12px] leading-relaxed text-black/80">{a.text}</p>
              {a.card}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChatInput() {
  return (
    <div className="flex items-center gap-2 rounded-[12px] border border-black/[0.08] bg-white px-3 py-2.5">
      <Sparkle size={13} color={CORAL} />
      <span className="flex-1 font-inter text-[11px] text-black/40">Pregúntale algo a tu negocio…</span>
      <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#DB3B2B] text-white">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 13V3.5M8 3.5L4 7.5M8 3.5L12 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="flex items-center gap-2 border-b border-black/[0.06] px-4 py-3">
      <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[rgba(219,59,43,0.10)]"><Sparkle size={13} color={CORAL} /></span>
      <p className="font-sora text-[13px] font-medium text-black">Uno</p>
      <span className="ml-auto flex items-center gap-1.5 font-inter text-[10px] text-black/45">
        <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" /> Conectado a tu negocio
      </span>
    </div>
  );
}

/* ── Hero: chat que se reproduce solo, ciclando preguntas ── */
const HERO_ORDER = [0, 1, 3, 5];
function HeroChat() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((p) => (p + 1) % HERO_ORDER.length), 5200);
    return () => window.clearInterval(id);
  }, []);
  const a = ANSWERS[HERO_ORDER[i]];
  return (
    <div className="overflow-hidden rounded-[16px] bg-white">
      <ChatHeader />
      <div className="h-[330px] overflow-hidden px-4 py-4">
        <ChatThread key={i} a={a} />
      </div>
      <div className="px-4 pb-4"><ChatInput /></div>
    </div>
  );
}

/* ── Secciones ── */

const SOURCES = [
  { name: "Tienda", knows: "Ventas, productos, clientes y conversión.", ask: "¿Qué producto tiene mejor margen?" },
  { name: "Pagos", knows: "Cobros, depósitos, contracargos y links de pago.", ask: "¿Por qué me rechazaron pagos ayer?" },
  { name: "Envíos", knows: "Guías, paqueterías, entregas e incidencias.", ask: "¿Qué paquetes llevan retraso?" },
  { name: "POS", knows: "Ventas en sucursal e inventario de cada una.", ask: "¿Qué sucursal vendió más hoy?" },
  { name: "Finanzas", knows: "Facturas, impuestos y pedidos por facturar.", ask: "¿Cuánto llevo facturado este mes?" },
];

const ACTIONS = [
  { title: "Da de alta productos con una foto", desc: "Sube la imagen y Uno escribe título, descripción, categoría y SEO." },
  { title: "Genera tus guías en lote", desc: "Elige la paquetería más conveniente para cada pedido y crea todas las guías de una vez." },
  { title: "Lanza promociones en minutos", desc: "Pide el cupón que necesitas y actívalo en tu tienda en línea y tus sucursales." },
  { title: "Factura sin llenar formularios", desc: "Prepara facturas individuales o globales con tus pedidos y tú solo las apruebas." },
];

function ActionVisual({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="flex gap-3">
        <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[12px] bg-[#F1EFEC]">
          <Image src="/img/tennis-big.png" alt="" fill className="object-contain p-2" sizes="92px" />
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="font-inter text-[12px] font-semibold text-black">Tenis Runner blancos de malla</p>
          <p className="font-inter text-[10px] leading-relaxed text-black/55">Ligeros y transpirables, con suela de espuma para correr o usar todo el día.</p>
          <div className="flex flex-wrap gap-1">
            {["Calzado", "Deportivo", "SEO listo"].map((t) => (
              <span key={t} className="rounded-full bg-black/[0.05] px-2 py-0.5 font-inter text-[9px] text-black/60">{t}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (i === 1) {
    return (
      <div>
        {[["Estafeta", "4 guías", "$472"], ["DHL", "5 guías", "$660"], ["FedEx", "3 guías", "$492"]].map(([p, n, c]) => (
          <Row key={p} left={p} sub={n} right={c} />
        ))}
        <div className="mt-2 flex items-center gap-2 font-inter text-[10px] font-semibold text-[#16A34A]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          12 guías listas para imprimir
        </div>
      </div>
    );
  }
  if (i === 2) {
    return (
      <div className="flex items-center justify-between rounded-[12px] border border-dashed border-[#DB3B2B]/40 bg-white px-4 py-3">
        <div>
          <p className="font-sora text-[15px] font-medium tracking-wide text-[#DB3B2B]">BAZAR15</p>
          <p className="font-inter text-[10px] text-black/50">Categoría Bazar · 7 días</p>
        </div>
        <span className="font-sora text-[28px] font-light text-black">15%</span>
      </div>
    );
  }
  return (
    <div>
      <Row left="Factura global · 21 oct" sub="38 pedidos" right="$41,280" />
      <Row left="Factura · Pedido #10466" sub="Cliente con RFC" right="$2,340" />
      <div className="mt-2 flex gap-2"><MiniBtn>Aprobar y timbrar</MiniBtn></div>
    </div>
  );
}

export default function T1IA() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [demo, setDemo] = useState(0);
  // Cambia `run` en cada clic para reiniciar el hilo aunque repitan la pregunta.
  const [run, setRun] = useState(0);

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
                <span className="whitespace-nowrap" style={{ color: "#FFB3A6" }}>
                  Uno
                  <span className="ml-1.5 inline-block" style={{ verticalAlign: "0.35em" }}><Sparkle size={28} color="#FFB3A6" /></span>
                </span>
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                Uno es la IA de T1. Pregúntale por tus ventas, pedidos, pagos o inventario y recibe la respuesta con tus números y el siguiente paso claro.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <PrimaryBtn href={SIGNUP_URL}>Comienza gratis</PrimaryBtn>
                <a href={SALES_URL} className="inline-flex items-center rounded-[14px] border border-white/25 px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:border-white/50 hover:bg-white/[0.06]">
                  Habla con ventas
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto rounded-[20px]" style={{ maxWidth: 460, padding: 12, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}>
                <HeroChat />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Demo interactivo — eliges la pregunta ── */}
      <section className="relative bg-white px-5 py-20 tablet:px-10 tablet:py-28">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto text-center" style={{ marginBottom: 44 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Respuestas con tus números, no con suposiciones
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              Elige una pregunta y mira cómo responde con la información de tu operación.
            </p>
          </div>

          <div data-modal-animate className="mx-auto grid max-w-[980px] grid-cols-1 gap-6 tablet:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] tablet:gap-8">
            <div className="flex flex-wrap content-start gap-2 tablet:flex-col tablet:flex-nowrap">
              {ANSWERS.map((a, k) => {
                const active = k === demo;
                return (
                  <button
                    key={a.chip}
                    type="button"
                    onClick={() => { setDemo(k); setRun((r) => r + 1); }}
                    className={`cursor-pointer rounded-[14px] border px-4 py-3 text-left transition-all duration-200 ${active ? "border-[#DB3B2B]/40 bg-[rgba(219,59,43,0.05)]" : "border-black/[0.08] bg-white hover:border-black/20"}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`font-inter text-[14px] font-semibold ${active ? "text-[#DB3B2B]" : "text-black"}`}>{a.chip}</span>
                      <span className="rounded-full bg-black/[0.05] px-2 py-0.5 font-inter text-[10px] text-black/50">{a.area}</span>
                    </span>
                    <span className="mt-0.5 hidden font-inter text-[13px] font-light text-black/55 tablet:block">{a.q}</span>
                  </button>
                );
              })}
            </div>

            <div className="overflow-hidden rounded-[20px] border border-black/[0.07] bg-white" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.08)" }}>
              <ChatHeader />
              <div className="min-h-[360px] px-5 py-5">
                <ChatThread key={`${demo}-${run}`} a={ANSWERS[demo]} />
              </div>
              <div className="px-5 pb-5"><ChatInput /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Todo el ecosistema conectado ── */}
      <section className="relative px-5 py-24 tablet:px-10 tablet:py-32" style={{ background: "linear-gradient(180deg, #1A0A0A 0%, #000000 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[760px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Todo tu negocio en una sola conversación
            </h2>
            <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Tienda, pagos, envíos, punto de venta y facturación conectados a Uno.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-3 lg:grid-cols-5">
            {SOURCES.map((s, i) => (
              <div key={s.name} data-stagger style={{ ["--i" as string]: i }} className="flex flex-col rounded-[18px] border border-white/[0.08] bg-[#121214] p-6">
                <p className="font-sora text-[20px] font-light text-white" style={{ marginBottom: 8 }}>
                  <span className="text-white/45">T1</span>{s.name}
                </p>
                <p className="font-inter text-[13px] font-light text-white/55" style={{ lineHeight: 1.6, marginBottom: 18 }}>{s.knows}</p>
                <div className="mt-auto flex items-start gap-2 rounded-[12px] border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
                  <span className="mt-0.5 shrink-0"><Sparkle size={12} /></span>
                  <span className="font-inter text-[12px] text-white/75">{s.ask}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Acciones — Uno hace el trabajo ── */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Pídelo y queda hecho
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              Además de responder, da de alta productos, genera guías, crea cupones y prepara tus facturas.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-5 tablet:grid-cols-2">
            {ACTIONS.map((a, i) => (
              <div key={a.title} data-stagger style={{ ["--i" as string]: i }} className="tienda-card flex flex-col rounded-[20px] border border-black/[0.06] bg-[#FBFBFB] p-7 tablet:p-8">
                <h3 className="font-sora text-[20px] font-normal text-black tablet:text-[24px]" style={{ letterSpacing: "-0.02em", marginBottom: 8 }}>{a.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/60 tablet:text-[15px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>{a.desc}</p>
                <div className="mt-auto rounded-[14px] border border-black/[0.06] bg-white p-4">
                  <ActionVisual i={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Control — vista previa antes de aplicar ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[820px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Tú apruebas cada cambio
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Antes de modificar algo en tu negocio, Uno te muestra una vista previa para que la confirmes.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-5 tablet:grid-cols-3 lg:gap-6">
            {[
              { n: "01", title: "Pide lo que necesitas", desc: "Escríbelo como se lo dirías a alguien de tu equipo." },
              { n: "02", title: "Revisa la propuesta", desc: "Ve los números, los pedidos o los productos que va a tocar." },
              { n: "03", title: "Confirma y listo", desc: "Solo se aplica cuando tú lo apruebas, y puedes editarlo antes." },
            ].map((s, i) => (
              <div key={s.n} data-stagger className="tienda-card rounded-[18px] border border-black/[0.06] bg-white p-7" style={{ ["--i" as string]: i }}>
                <span className="font-sora text-[40px] font-light text-[#DB3B2B]" style={{ display: "block", marginBottom: 12, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.n}</span>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{s.title}</h3>
                <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div data-modal-animate className="mt-12 flex justify-center">
            <PrimaryBtn href={SIGNUP_URL}>Comienza gratis</PrimaryBtn>
          </div>
        </div>
      </section>

      {/* ── FAQ — respuestas PENDIENTES de validar con producto ── */}
      <T1FAQSection
        faqs={[
          { q: "¿Uno tiene costo?", a: "Viene incluido en tu cuenta de T1, sin costo adicional. Solo abre el chat en tu administrador y haz tu primera pregunta." },
          { q: "¿Qué información puede consultar?", a: "Todo lo que pasa en los productos de T1 que usas: ventas de tu tienda y sucursales, cobros y depósitos, guías y entregas, inventario y facturas." },
          { q: "¿Puede hacer cambios en mi tienda?", a: "Sí. Puede dar de alta productos, crear cupones, generar guías y preparar facturas. Siempre te muestra una vista previa y solo aplica el cambio cuando lo confirmas." },
          { q: "¿Necesito conocimientos técnicos?", a: "No. Le escribes como le escribirías a alguien de tu equipo, sin fórmulas ni filtros." },
          { q: "¿Mis datos están seguros?", a: "Tu información se queda dentro de tu cuenta de T1 y solo la ven tú y las personas a las que les des acceso." },
        ]}
      />

      <T1FinalCTA
        title="Tu próxima gran decisión empieza con una pregunta"
        description="Crea tu cuenta gratis y pregúntale a Uno cómo va tu negocio hoy."
      />
    </div>
  );
}
