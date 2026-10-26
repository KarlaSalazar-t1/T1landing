"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import T1FinalCTA from "@/components/T1FinalCTA";
import { T1FAQSection } from "@/components/T1FAQ";
import { UnoHeroCard, UnoStage, type Scene } from "@/components/T1UnoStage";
import { PEDIDOS, PREGUNTAS, SOURCES, TIENDA, UnoVideo } from "@/components/T1IA";

/* Landing de Uno — V2 (más simple, por comentarios del CEO: "desordenado,
   muchos colores, difícil de leer").
   · 6 secciones en lugar de 9: hero → video + qué es Uno → un solo demo →
     todo tu negocio → alta → FAQ y cierre.
   · Una sola paleta: el degradado oscuro de T1 solo en el hero y el cierre;
     en medio solo blanco y #FBFBFB.
   · Menos movimiento: un solo demo, escenas de 13 s, burbujas fijas y Uno
     animado solo en el hero y en el cierre.
   · El video va como SEGUNDA sección (no en el hero: ningún landing de T1
     usa ese patrón). PENDIENTE: grabación real de Uno en el administrador. */

/* PENDIENTE: ruta del video real (30–45 s, sin audio, con textos en pantalla).
   Mientras sea null se muestra el marco con el botón de play. */
const UNO_VIDEO_SRC: string | null = null;
const UNO_VIDEO_POSTER: string | null = null;

/* Un solo demo con lo más representativo de preguntar, pedir y diseñar */
const DEMO: Scene[] = [PREGUNTAS[0], PREGUNTAS[1], PEDIDOS[0], PEDIDOS[1], PEDIDOS[3], TIENDA[0]];

const INTRO = [
  { title: "Pregúntale", desc: "Ventas, pedidos, cobros o envíos: te responde con tus números.", icon: <path d="M5 6.5A2.5 2.5 0 017.5 4h9A2.5 2.5 0 0119 6.5v7a2.5 2.5 0 01-2.5 2.5H11l-4 3.5V16h0.5A2.5 2.5 0 015 13.5v-7z" /> },
  { title: "Pídele", desc: "Crea cupones, productos, guías y links de pago por ti.", icon: <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" /> },
  { title: "Tú decides", desc: "Nada cambia en tu negocio hasta que lo confirmas.", icon: <><circle cx="12" cy="12" r="9" /><path d="M8 12.3l2.8 2.8L16.2 9.5" /></> },
];

const ALTA = [
  { goal: "Cobrar", done: true, detail: "Tarjeta y SPEI activos", action: null },
  { goal: "Vender", done: false, detail: "Agrega tu primer producto", action: "Crear producto" },
  { goal: "Facturar", done: false, detail: "Completa tus datos fiscales", action: "Completar" },
];

function VideoUno() {
  return (
    <div className="relative mx-auto aspect-video w-full max-w-[960px] overflow-hidden rounded-[24px] bg-[#111]" style={{ boxShadow: "0 40px 90px -40px rgba(0,0,0,0.45)" }}>
      {UNO_VIDEO_SRC ? (
        <video src={UNO_VIDEO_SRC} poster={UNO_VIDEO_POSTER ?? undefined} autoPlay muted loop playsInline controls className="h-full w-full object-cover" />
      ) : (
        <>
          <HeroBackground fade={false} />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center">
            <UnoVideo estado="reposo" className="h-[88px] w-[88px] tablet:h-[130px] tablet:w-[130px]" />
            <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white/95 tablet:h-[68px] tablet:w-[68px]" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#111" aria-hidden><path d="M8 5.5v13l11-6.5-11-6.5z" /></svg>
            </span>
            <p className="font-inter text-[14px] font-medium text-white/75">Mira a Uno en acción · 0:40</p>
          </div>
        </>
      )}
    </div>
  );
}

export default function T1IAv2() {
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
      {/* ── 1 · Hero (igual que v1) ── */}
      <section className="relative overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24">
        <HeroBackground fade={false} />
        <div className="relative z-10 mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tablet:gap-12">
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]" style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 22 }}>
                El al<span style={{ color: "#FFB3A6" }}>ia</span>do que tu negocio necesitaba
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                Uno, la IA de T1, entiende tu operación y te ayuda a sacarla adelante.
              </p>
              <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                Comienza gratis
              </a>
            </div>
            <div className="relative">
              <UnoHeroCard avatar={<UnoVideo estado="saludo" className="h-full w-full" />} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Video + qué es Uno, en una sola sección ── */}
      <section className="relative bg-white px-5 py-16 tablet:px-10 tablet:py-24">
        <div className="mx-auto max-w-[1040px]">
          <div data-modal-animate className="mx-auto mb-8 max-w-[720px] text-center tablet:mb-12">
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
              Resuelve en segundos lo que te tomaba horas
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              Así trabaja Uno dentro de tu administrador de T1.
            </p>
          </div>
          <div data-modal-animate><VideoUno /></div>
          <div data-modal-animate className="mt-8 grid grid-cols-1 gap-4 tablet:mt-12 tablet:grid-cols-3 tablet:gap-5">
            {INTRO.map((c, i) => (
              <div key={c.title} data-stagger style={{ ["--i" as string]: i }} className="rounded-[20px] border border-black/[0.06] bg-[#FBFBFB] p-5 tablet:p-6">
                <div className="mb-2 flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>{c.icon}</svg>
                  <h3 className="font-sora text-[19px] font-normal text-black tablet:text-[21px]" style={{ letterSpacing: "-0.02em" }}>{c.title}</h3>
                </div>
                <p className="font-inter text-[15px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Un solo demo: preguntar, pedir y diseñar ── */}
      <section className="relative overflow-hidden bg-[#FBFBFB] px-5 py-16 tablet:px-10 tablet:py-24">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto mb-8 max-w-[720px] text-center">
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
              Tu día, resuelto en una conversación
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              Elige un ejemplo y mira cómo responde Uno.
            </p>
          </div>
          <UnoStage scenes={DEMO} sceneMs={13000} />
        </div>
      </section>

      {/* ── 4 · Todo tu negocio (burbujas fijas, sin rotar) ── */}
      <section className="relative bg-white px-5 py-16 tablet:px-10 tablet:py-24">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto mb-8 max-w-[760px] text-center tablet:mb-12">
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Todo tu negocio en una sola conversación
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Uno vive en cada administrador de T1 y conoce toda tu operación.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:mx-auto tablet:max-w-[1040px] tablet:grid-cols-3 tablet:gap-5">
            {SOURCES.map((s, i) => (
              <div key={s.alt} data-stagger style={{ ["--i" as string]: i }} className="flex flex-col rounded-[20px] border border-black/[0.06] bg-[#FBFBFB] p-6">
                <Image src={s.logo} alt={s.alt} width={s.w} height={42} className="h-[30px] w-auto self-start" style={{ marginBottom: 14 }} />
                <p className="font-inter text-[15px] font-light text-black/60" style={{ lineHeight: 1.6, marginBottom: 18 }}>{s.knows}</p>
                <div className="mt-auto self-end rounded-[16px] rounded-br-[4px] bg-[#F2F2F1] px-3.5 py-2.5 font-inter text-[14px] text-black/80">{s.asks[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · Alta acompañada (clara: lo oscuro queda solo para el cierre) ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-16 tablet:px-10 tablet:py-24">
        <div className="mx-auto grid max-w-[1040px] grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
          <div data-modal-animate>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16 }}>
              Empieza a vender con Uno a tu lado
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 28 }}>
              Desde el primer día, Uno te dice qué te falta para cobrar, vender y facturar, y lo resuelve contigo paso a paso.
            </p>
            <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
              Comienza gratis
            </a>
          </div>
          <div data-modal-animate className="rounded-[20px] border border-black/[0.07] bg-white p-6 tablet:p-7" style={{ boxShadow: "0 24px 60px -30px rgba(0,0,0,0.25)" }}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-black/55">Tu alta</span>
              <span className="font-inter text-[14px] font-semibold text-black/60">1 de 3</span>
            </div>
            <div className="mb-3 h-[6px] overflow-hidden rounded-full bg-black/[0.06]"><span className="block h-full w-1/3 rounded-full bg-[#DB3B2B]" /></div>
            {ALTA.map((g) => (
              <div key={g.goal} className="flex items-center gap-4 border-b border-black/[0.06] py-4 last:border-b-0 last:pb-0">
                <span className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full ${g.done ? "bg-[rgba(34,197,94,0.12)] text-[#15803D]" : "bg-black/[0.05] text-black/40"}`}>
                  {g.done ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <span className="h-[9px] w-[9px] rounded-full bg-current" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-sora text-[16px] font-semibold text-black">{g.goal}</p>
                  <p className="font-inter text-[14px] text-black/55">{g.detail}</p>
                </div>
                {g.action && (
                  <span className="hidden shrink-0 rounded-[10px] border border-black/10 px-3.5 py-2 font-inter text-[13px] font-semibold text-black/75 tablet:inline-flex">{g.action}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 · FAQ y cierre ── */}
      <T1FAQSection
        faqs={[
          { q: "¿Uno tiene costo?", a: "No. Uno viene incluido en tu cuenta de T1, sin costo adicional." },
          { q: "¿Dónde encuentro a Uno?", a: "Uno vive en cada uno de los administradores de T1. Ábrelo desde el panel lateral en cualquier sección y haz tu pregunta." },
          { q: "¿Qué puede hacer Uno?", a: "Consulta tus ventas, pedidos, transacciones y envíos; cotiza y genera guías, programa recolecciones, crea productos, cupones y links de pago, importa tu catálogo y diseña tu tienda." },
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
