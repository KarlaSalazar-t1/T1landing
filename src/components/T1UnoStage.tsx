"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Escenario de Uno — chat minimalista (estilo panel de Sidekick) junto al
   RESULTADO real de lo que pidió el usuario: la tienda con el cupón puesto,
   la guía impresa, el catálogo lleno, la gráfica de ventas…
   Todo con la tienda de ejemplo AURUM (fotos de /img/moda-*).

   Cada escena corre sola: se escribe la pregunta en el campo → se manda →
   Uno "piensa" → responde con una frase y una acción → el resultado cambia
   del estado "antes" al "después". Las capacidades que se muestran salen de
   TARJETAS-UNO-MOVIL.md (solo tarjetas que ya funcionan). */

export type Scene = {
  chip: string;
  panelTitle: string;
  prompt: string;
  reply: string;
  action: string;
  Visual: (p: { done: boolean }) => ReactNode;
};

const SCENE_MS = 9000;
const T_SEND = 1500; // termina de escribirse la pregunta
const T_REPLY = 2600; // llega la respuesta
const T_DONE = 3000; // el resultado cambia

/* ── Piezas del chat ── */

export function UnoMark({ size = 22 }: { size?: number }) {
  return <Image src="/img/uno-avatar.svg" alt="" width={size} height={size} className="shrink-0" unoptimized />;
}

function Typed({ text, ms }: { text: string; ms: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const step = Math.max(14, ms / Math.max(1, text.length));
    const id = window.setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), step);
    return () => window.clearInterval(id);
  }, [text, ms]);
  return (
    <>
      {text.slice(0, n)}
      <span className="ml-[1px] inline-block h-[1em] w-[1.5px] translate-y-[2px] animate-pulse bg-black/60" />
    </>
  );
}

function ChatPanel({ scene, phase, runKey, compact = false }: { scene: Scene; phase: number; runKey: string; compact?: boolean }) {
  const ic = "h-[15px] w-[15px] text-black/55";
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-[22px] bg-white"
      style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.04)" }}
    >
      {/* Encabezado: tema de la conversación, como "Store design ⌄" */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <span className="flex items-center gap-1 font-inter text-[14px] font-semibold text-black/85">
          {scene.panelTitle}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="flex items-center gap-3.5">
          <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6M17.5 3.5l3 3L12 15H9v-3l8.5-8.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
          {!compact && <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
          <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </span>
      </div>

      {/* Conversación */}
      <div key={runKey} className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-5 pt-2">
        {phase >= 1 && (
          <div className="rounded-[14px] bg-[#F4F4F3] px-4 py-3 font-inter text-[13px] leading-snug text-black/80" style={{ animation: "fadeSlideIn 0.35s ease-out both" }}>
            {scene.prompt}
          </div>
        )}
        {phase === 1 && (
          <span className="grid w-[14px] grid-cols-2 gap-[3px] pl-0.5 pt-1" aria-hidden>
            {[0, 1, 2, 3].map((k) => (
              <span key={k} className="h-[5px] w-[5px] rounded-full bg-[#DB3B2B]" style={{ animation: `pulse-soft 0.9s ${k * 0.12}s ease-in-out infinite` }} />
            ))}
          </span>
        )}
        {phase >= 2 && (
          <div style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
            <p className="font-inter text-[13.5px] leading-relaxed text-black/85">{scene.reply}</p>
            <div className="mt-3 flex items-center gap-2.5 rounded-[12px] border border-black/[0.07] px-3.5 py-2.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-[#DB3B2B]"><path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg>
              <span className="flex-1 truncate font-inter text-[12.5px] font-semibold text-black/80">{scene.action}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="text-black/35"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </div>
          </div>
        )}
      </div>

      {/* Campo de texto: ahí se escribe la pregunta antes de mandarla */}
      <div className="p-3">
        <div
          className="rounded-[16px] bg-white px-3.5 pt-3 pb-2.5"
          style={{ boxShadow: "0 0 0 1px rgba(219,59,43,0.18), 0 6px 24px -6px rgba(219,59,43,0.28)" }}
        >
          <p className="min-h-[36px] font-inter text-[13px] leading-snug text-black/80">
            {phase === 0 ? <Typed key={runKey} text={scene.prompt} ms={T_SEND - 300} /> : <span className="text-black/40">Pide lo que necesites…</span>}
          </p>
          <div className="mt-1.5 flex items-center justify-between">
            <UnoMark size={22} />
            <span className="flex items-center gap-3">
              <span className="font-inter text-[18px] leading-none text-black/50">+</span>
              <span className={`flex h-[28px] w-[28px] items-center justify-center rounded-full text-white transition-colors ${phase === 0 ? "bg-[#DB3B2B]" : "bg-black/15"}`}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 13V3.5M8 3.5L4 7.5M8 3.5L12 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Versión mini del chat para celular (builder): sin encabezado, solo la
   pregunta y la respuesta corta, debajo del resultado sin taparlo. */
function MiniChat({ scene, phase, runKey }: { scene: Scene; phase: number; runKey: string }) {
  return (
    <div className="rounded-[18px] bg-white p-3" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 16px 40px -18px rgba(0,0,0,0.3)" }}>
      <div className="flex items-center gap-2.5">
        <UnoMark size={22} />
        <p key={runKey} className="min-w-0 flex-1 truncate font-inter text-[13px] text-black/80">
          {phase === 0 ? <Typed text={scene.prompt} ms={T_SEND - 300} /> : phase === 1 ? <span className="text-black/45">Uno está trabajando…</span> : <span style={{ animation: "fadeSlideIn 0.35s ease-out both" }} className="inline-block">{scene.reply}</span>}
        </p>
        <span className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-white transition-colors ${phase === 0 ? "bg-[#DB3B2B]" : "bg-black/15"}`}>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 13V3.5M8 3.5L4 7.5M8 3.5L12 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </div>
  );
}

/* ── Escenario completo con selector de escenas ──
   layout "chips": pestañas arriba, resultado y chat lado a lado.
   layout "list":  en escritorio, título + lista vertical a la izquierda y el
                   resultado con el chat encimado a la derecha.
   En celular los dos se ven igual: pestañas en una fila que se desliza de
   lado, y abajo el resultado y el chat, uno sobre otro (sin encimarse, para
   que nada del resultado quede tapado). */

/* `separate`: el chat va a un lado (escritorio) o abajo en versión mini
   (celular), sin encimarse — para el builder, donde el resultado es grande. */
export function UnoStage({ scenes, dark = false, reverse = false, layout = "chips", header, separate = false }: { scenes: Scene[]; dark?: boolean; reverse?: boolean; layout?: "chips" | "list"; header?: ReactNode; separate?: boolean }) {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Al salir de pantalla se regresa al inicio de la escena, para que al
    // volver se vea otra vez cómo se escribe la pregunta.
    const obs = new IntersectionObserver(([e]) => { setVisible(e.isIntersecting); if (!e.isIntersecting) setPhase(0); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Línea de tiempo de cada escena. Solo corre mientras se ve en pantalla.
  useEffect(() => {
    if (!visible) return;
    const ts = [
      window.setTimeout(() => setPhase(1), T_SEND),
      window.setTimeout(() => setPhase(2), T_REPLY),
      window.setTimeout(() => setPhase(3), T_DONE),
      window.setTimeout(() => { setPhase(0); setActive((a) => (a + 1) % scenes.length); }, SCENE_MS),
    ];
    return () => ts.forEach((t) => window.clearTimeout(t));
  }, [active, run, visible, scenes.length]);

  // En celular la pestaña activa se centra sola en la fila deslizable.
  useEffect(() => {
    const fila = rowRef.current;
    const pill = fila?.querySelector<HTMLElement>(`[data-pill="${active}"]`);
    if (!fila || !pill || fila.scrollWidth <= fila.clientWidth) return;
    fila.scrollTo({ left: Math.max(0, pill.offsetLeft - (fila.clientWidth - pill.clientWidth) / 2), behavior: "smooth" });
  }, [active]);

  const pick = (i: number) => { setPhase(0); setActive(i); setRun((r) => r + 1); };
  const scene = scenes[active];
  const Visual = scene.Visual;
  const runKey = `${active}-${run}`;

  const chips = (
    <div
      ref={rowRef}
      className={`-mx-5 mb-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden tablet:mx-0 tablet:mb-10 tablet:flex-wrap tablet:justify-center tablet:overflow-visible tablet:px-0 ${layout === "list" ? "tablet:hidden" : ""}`}
    >
      {scenes.map((s, i) => {
        const on = i === active;
        return (
          <button
            key={s.chip}
            type="button"
            data-pill={i}
            onClick={() => pick(i)}
            className={`relative shrink-0 cursor-pointer overflow-hidden whitespace-nowrap rounded-[12px] border font-inter text-[13px] transition-all duration-200 tablet:text-[13.5px] ${on ? "font-semibold" : "font-medium"}`}
            style={dark ? {
              padding: "9px 15px",
              color: on ? "#0e0d0d" : "rgba(255,255,255,0.68)",
              background: on ? "#ffffff" : "rgba(52,52,52,0.55)",
              borderColor: on ? "#ffffff" : "rgba(255,255,255,0.10)",
            } : {
              padding: "9px 15px",
              color: on ? "#ffffff" : "rgba(0,0,0,0.68)",
              background: on ? "#111111" : "#ffffff",
              borderColor: on ? "#111111" : "rgba(0,0,0,0.10)",
            }}
          >
            {s.chip}
            {on && visible && (
              <span key={runKey} aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full bg-[#DB3B2B]" style={{ transformOrigin: "left", animation: `pilarProgress ${SCENE_MS}ms linear forwards` }} />
            )}
          </button>
        );
      })}
    </div>
  );

  const glow = (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ background: `radial-gradient(ellipse at center, ${dark ? "rgba(219,59,43,0.22)" : "rgba(219,59,43,0.12)"} 0%, transparent 70%)`, filter: "blur(40px)" }}
    />
  );
  const visualBox = (cls: string, width = "w-[92%]") => (
    <div className={`relative h-[240px] ${width} overflow-hidden rounded-[20px] ${cls}`} style={{ boxShadow: dark ? "0 30px 80px -20px rgba(0,0,0,0.7)" : "0 30px 70px -24px rgba(0,0,0,0.28)" }}>
      <div key={runKey} className="h-full w-full" style={{ animation: "fadeSlideIn 0.45s ease-out both" }}>
        <Visual done={phase >= 3} />
      </div>
    </div>
  );
  const chatBox = (cls: string) => (
    /* En celular el chat se encima en diagonal sobre la esquina inferior
       derecha del resultado (los visuales dejan esa zona libre). */
    <div className={`relative z-[2] -mt-12 ml-auto h-[300px] w-[86%] ${cls}`}>
      <ChatPanel scene={scene} phase={phase} runKey={runKey} />
    </div>
  );

  if (layout === "list") {
    return (
      <div ref={ref} className="mx-auto grid max-w-[1120px] grid-cols-1 items-center tablet:grid-cols-[minmax(0,360px)_minmax(0,1fr)] tablet:gap-14">
        <div>
          {header}
          {chips}
          {/* Escritorio: lista vertical con riel que se llena */}
          <div className="hidden flex-col tablet:flex">
            {scenes.map((s, i) => {
              const on = i === active;
              return (
                <button key={s.chip} type="button" onClick={() => pick(i)} className="group relative cursor-pointer py-3 pl-5 text-left">
                  <span aria-hidden className="absolute left-0 top-0 h-full w-[2px] overflow-hidden rounded-full bg-black/[0.08]">
                    {on && visible && <span key={runKey} className="block h-full w-full bg-[#DB3B2B]" style={{ transformOrigin: "top", animation: `pilarProgressY ${SCENE_MS}ms linear forwards` }} />}
                  </span>
                  <span className={`block font-inter text-[16px] font-semibold transition-colors duration-200 ${on ? "text-black" : "text-black/40 group-hover:text-black/70"}`}>{s.chip}</span>
                  <span className="grid transition-all duration-300" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                    <span className="overflow-hidden"><span className="block pt-1 font-inter text-[14px] font-light text-black/55">“{s.prompt}”</span></span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Resultado con el chat encimado en diagonal */}
        <div className="relative tablet:h-[470px]">
          {glow}
          {visualBox("tablet:absolute tablet:left-0 tablet:top-0 tablet:h-[64%] tablet:w-[68%]")}
          {chatBox("tablet:absolute tablet:bottom-0 tablet:right-0 tablet:mt-0 tablet:h-[340px] tablet:w-[320px]")}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref}>
      {chips}
      <div className={`relative mx-auto flex max-w-[1000px] flex-col items-stretch tablet:items-center ${reverse ? "tablet:flex-row-reverse" : "tablet:flex-row"}`}>
        {glow}
        {separate ? (
          <>
            {visualBox("tablet:h-[440px] tablet:w-auto tablet:flex-1", "w-full")}
            <div className="relative z-[2] mt-3 tablet:hidden"><MiniChat scene={scene} phase={phase} runKey={runKey} /></div>
            <div className={`relative z-[2] hidden h-[440px] w-[340px] shrink-0 tablet:block ${reverse ? "tablet:mr-6" : "tablet:ml-6"}`}>
              <ChatPanel scene={scene} phase={phase} runKey={runKey} />
            </div>
          </>
        ) : (
          <>
            {visualBox("tablet:h-[400px] tablet:w-auto tablet:flex-1")}
            {chatBox(`tablet:mt-0 tablet:h-[420px] tablet:w-[350px] tablet:shrink-0 ${reverse ? "tablet:-mr-12 tablet:ml-0" : "tablet:-ml-12"}`)}
          </>
        )}
      </div>
    </div>
  );
}

/* ── Hero: tarjeta de Uno al estilo de Sidekick. Mientras se escribe la
   pregunta se ve Uno; al mandarla, en su lugar aparece un adelanto muy
   simple del resultado. ── */

function MiniCard({ children }: { children: ReactNode }) {
  // Vidrio claro sobre el degradado del hero (texto blanco), en lugar de
  // tarjetas blancas que se veían pegadas sobre el fondo oscuro.
  return (
    <div
      className="w-full max-w-[300px] rounded-[18px] p-4 text-left text-white"
      style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 24px 60px -24px rgba(0,0,0,0.5)" }}
    >
      {children}
    </div>
  );
}

const HERO_ITEMS: { prompt: string; card: ReactNode }[] = [
  {
    prompt: "¿Cómo van mis ventas esta semana?",
    card: (
      <MiniCard>
        <p className="font-inter text-[11px] text-white/60">Ventas · esta semana</p>
        <p className="flex items-center gap-2 font-sora text-[26px] font-semibold text-white" style={{ letterSpacing: "-0.03em" }}>$21,480 <span className="rounded-full bg-[rgba(74,222,128,0.18)] px-1.5 py-0.5 font-inter text-[10px] font-bold text-[#86EFAC]">▲ 18%</span></p>
        <svg viewBox="0 0 120 30" className="mt-1 h-[34px] w-full" preserveAspectRatio="none" aria-hidden><path d="M0,26 L17,20 L34,23 L51,14 L68,16 L85,8 L102,10 L120,3" fill="none" stroke="#FFB3A6" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" /></svg>
      </MiniCard>
    ),
  },
  {
    prompt: "Crea un cupón del 15% para sudaderas",
    card: (
      <MiniCard>
        <div className="flex items-center justify-between">
          <span className="rounded-[6px] border border-dashed border-white/50 px-2 py-1 font-sora text-[14px] font-semibold tracking-wide text-white">PROMO15</span>
          <span className="rounded-full bg-[rgba(74,222,128,0.18)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#86EFAC]">Activo</span>
        </div>
        <p className="mt-2 font-inter text-[12px] text-white/70">15% en sudaderas · 7 días</p>
      </MiniCard>
    ),
  },
  {
    prompt: "Crea un producto con esta foto",
    card: (
      <MiniCard>
        <div className="flex items-center gap-3">
          <Foto src="/img/moda-hoodie.png" className="h-[56px] w-[56px] shrink-0 rounded-[10px]" />
          <div className="min-w-0">
            <p className="font-inter text-[13px] font-semibold text-white">Sudadera hueso</p>
            <p className="font-inter text-[12px] text-white/70">$1,250 · Sudaderas</p>
            <p className="font-inter text-[10px] font-semibold text-[#86EFAC]">Descripción y SEO listos</p>
          </div>
        </div>
      </MiniCard>
    ),
  },
  {
    prompt: "Genera la guía del pedido #129",
    card: (
      <MiniCard>
        <div className="flex items-center justify-between">
          <span className="font-sora text-[15px] font-black italic text-[#FF8A80]">DHL</span>
          <span className="font-inter text-[12px] font-semibold text-white">$168</span>
        </div>
        <p className="mt-1 font-mono text-[11px] tracking-[0.15em] text-white/80">4829 1036 52</p>
        <p className="font-inter text-[11px] text-white/65">Lista para imprimir · llega en 1 a 2 días</p>
      </MiniCard>
    ),
  },
  {
    prompt: "¿Cuánto me queda neto de lo que cobré hoy?",
    card: (
      <MiniCard>
        <p className="font-inter text-[11px] text-white/60">Te queda neto hoy</p>
        <p className="font-sora text-[26px] font-semibold text-white" style={{ letterSpacing: "-0.03em" }}>$12,036</p>
        <p className="font-inter text-[11px] text-white/65">18 cobros · depósito el 24 oct</p>
      </MiniCard>
    ),
  },
];

const HERO_MS = 4600;
const HERO_SEND = 1500;

/* Uno saluda solo al principio. Después las tarjetas se encadenan: mientras
   se escribe la siguiente pregunta se queda la tarjeta anterior, y al
   mandarla la nueva la reemplaza (sin regresar al avatar entre una y otra). */
export function UnoHeroCard({ avatar }: { avatar: ReactNode }) {
  const [i, setI] = useState(0);
  const [sent, setSent] = useState(false);
  const [shown, setShown] = useState(-1); // -1 = Uno saludando
  useEffect(() => {
    const ts = [
      window.setTimeout(() => { setSent(true); setShown(i); }, HERO_SEND + (i === 0 && shown === -1 ? 900 : 0)),
      window.setTimeout(() => { setSent(false); setI((p) => (p + 1) % HERO_ITEMS.length); }, HERO_MS + (i === 0 && shown === -1 ? 900 : 0)),
    ];
    return () => ts.forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);
  const it = HERO_ITEMS[i];
  return (
    <div
      className="relative mx-auto flex w-full max-w-[440px] flex-col items-center rounded-[28px] px-6 pt-8 pb-6 text-center tablet:px-8 tablet:pt-10"
      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 40px 90px -30px rgba(0,0,0,0.55)" }}
    >
      <p className="font-inter text-[15px] font-medium text-white/60 tablet:text-[17px]">¡Hola! Soy Uno</p>
      <p className="font-inter text-[17px] font-semibold text-white tablet:text-[20px]">Tu experto en T1</p>
      <div className="relative my-4 flex h-[170px] w-full items-center justify-center tablet:my-6 tablet:h-[210px]">
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500" style={{ opacity: shown === -1 ? 1 : 0, transform: shown === -1 ? "scale(1)" : "scale(0.85)" }}>
          <div className="h-[150px] w-[150px] tablet:h-[200px] tablet:w-[200px]">{avatar}</div>
        </div>
        {shown >= 0 && (
          <div key={shown} className="relative flex w-full justify-center" style={{ animation: "fadeSlideIn 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
            {HERO_ITEMS[shown].card}
          </div>
        )}
      </div>
      <div className="flex w-full items-center gap-3 rounded-full bg-white py-2.5 pl-3 pr-2.5" style={{ boxShadow: "0 0 0 3px rgba(219,59,43,0.25), 0 10px 30px -8px rgba(219,59,43,0.45)" }}>
        <UnoMark size={24} />
        <span className="min-w-0 flex-1 truncate text-left font-inter text-[14px] text-black/80">
          {sent ? <span className="text-black/40">Pide lo que necesites…</span> : <Typed key={i} text={it.prompt} ms={HERO_SEND - 300} />}
        </span>
        <span className="font-inter text-[18px] leading-none text-black/45">+</span>
        <span className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full text-white transition-colors ${sent ? "bg-black/15" : "bg-[#DB3B2B]"}`}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 13V3.5M8 3.5L4 7.5M8 3.5L12 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </div>
  );
}

/* ══════════════ Resultados (visuales "antes → después") ══════════════ */

const FOTO = {
  hoodie: "/img/moda-hoodie.png",
  gorra: "/img/moda-gorra.png",
  playera: "/img/moda-playera.png",
  bucket: "/img/moda-bucket.png",
  crew: "/img/moda-crewneck.png",
  pantalon: "/img/moda-pantalon.png",
  sneaker: "/img/moda-sneaker.png",
};

const ease = "cubic-bezier(0.22,1,0.36,1)";

function Foto({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#EFEBE6] ${className}`}>
      <Image src={src} alt="" fill sizes="200px" className="object-cover" />
    </div>
  );
}

function useCount(to: number, on: boolean, ms = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, on, ms]);
  return on ? v : 0;
}

const mx = (n: number) => n.toLocaleString("es-MX");

/* Cupón: la tarjeta de confirmación real de Uno (coupon_draft). Primero
   aparece la propuesta; al confirmar, el botón cambia a "Cupón creado". */
export function VisualCupon({ done }: { done: boolean }) {
  const filas = [
    ["Tipo", "Cupón con código", ""],
    ["Descuento", "15 %", ""],
    ["Aplica a", "Categoría Sudaderas", ""],
    ["Vigencia", "7 días", "hidden tablet:flex"],
    ["Límite de usos", "Sin límite", "hidden tablet:flex"],
    ["Estado al crear", "Activo (visible en tu tienda)", "hidden tablet:flex"],
  ];
  return (
    <div className="flex h-full items-start justify-center bg-[#EFEAE4] p-3 tablet:items-center tablet:p-6">
      <div className="w-full max-w-[360px] overflow-hidden rounded-[14px] border border-black/[0.08] bg-white">
        <div className="px-4 pt-3.5 tablet:px-5 tablet:pt-4">
          <p className="font-inter text-[13px] font-bold text-[#1E2939] tablet:text-[15px]">Crear el cupón PROMO15</p>
          <p className="mt-1 hidden font-inter text-[12px] text-black/50 tablet:block">Al confirmar, el descuento queda creado en tu tienda con estos datos.</p>
          <div className="mt-2 flex flex-col gap-1 pb-3 tablet:mt-3 tablet:gap-1.5 tablet:pb-4">
            {filas.map(([l, v, cls]) => (
              <div key={l} className={`flex gap-3 font-inter text-[11px] tablet:text-[12.5px] ${cls || "flex"}`}>
                <span className="w-[40%] shrink-0 text-black/50">{l}</span>
                <span className="font-semibold text-[#1E2939]">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-start border-t border-black/[0.07] px-4 py-2.5 tablet:justify-end tablet:px-5 tablet:py-3">
          <span
            className="flex items-center gap-1.5 rounded-[9px] px-4 py-1.5 font-inter text-[12px] font-semibold text-white transition-colors duration-500 tablet:text-[13px]"
            style={{ background: done ? "#16A34A" : "#DB3B2B", transitionDelay: "1600ms" }}
          >
            {done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            {done ? "Cupón creado" : "Confirmar"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Link de pago: Uno lo crea (por producto o por monto libre) y queda listo
   para copiar. Uno NO lo manda por WhatsApp: eso lo haces tú. */
export function VisualLink({ done }: { done: boolean }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-start gap-3 bg-[#EFEAE4] p-4 tablet:justify-center">
      <div className="flex w-full max-w-[330px] gap-3 rounded-[16px] bg-white p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] tablet:p-4">
        <Foto src={FOTO.hoodie} className="h-[80px] w-[80px] shrink-0 rounded-[10px] tablet:h-[120px] tablet:w-[120px]" />
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="font-sora text-[10px] font-bold tracking-[0.18em] text-black/50">AURUM</p>
          <p className="truncate font-inter text-[12px] font-semibold text-black">Sudadera hueso</p>
          <p className="font-sora text-[18px] font-semibold text-black tablet:text-[24px]">$1,250</p>
          <p className="font-inter text-[10px] text-black/55">3 meses sin intereses de $416.67</p>
          <span className="mt-auto hidden rounded-[8px] bg-black py-1.5 text-center font-inter text-[11px] font-semibold text-white tablet:block">Pagar</span>
        </div>
      </div>
      <div
        className="flex w-full max-w-[330px] items-center gap-2 rounded-full bg-white py-1.5 pl-3.5 pr-1.5 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.3)] transition-all duration-700"
        style={{ opacity: done ? 1 : 0, transform: done ? "translateY(0)" : "translateY(12px)", transitionTimingFunction: ease, transitionDelay: "400ms" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-[#16A34A]"><path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-black/75">pago.t1.com/aurum/8F2K</span>
        <span className="rounded-full bg-black px-3 py-1 font-inter text-[11px] font-semibold text-white">Copiar</span>
      </div>
    </div>
  );
}

/* Producto con una foto: primero solo se ve la foto mientras Uno la "lee"
   (la línea roja la recorre). Cuando responde, la foto se hace a un lado y
   aparecen nombre, precio, categoría y descripción. */
export function VisualProductoFoto({ done }: { done: boolean }) {
  const campos = [
    ["Nombre", "Sudadera hueso Aurum"],
    ["Precio", "$1,250"],
    ["Categoría", "Sudaderas"],
    ["Descripción", "Sudadera oversize de algodón con capucha y bolsa canguro."],
  ];
  const t = `all 0.9s ${ease}`;
  return (
    <div className="relative h-full overflow-hidden bg-[#FAFAF9]">
      <div className="absolute bottom-3 left-3 top-3 overflow-hidden rounded-[14px] tablet:bottom-6 tablet:left-6 tablet:top-6" style={{ right: done ? "56%" : "12px", transition: t }}>
        <Foto src={FOTO.hoodie} className="h-full w-full" />
        <span aria-hidden className="absolute inset-x-0 h-[2px] bg-[#DB3B2B] shadow-[0_0_14px_3px_rgba(219,59,43,0.6)]" style={{ top: 0, animation: done ? "none" : "unoScan 1.8s ease-in-out infinite", opacity: done ? 0 : 1, transition: "opacity 0.3s" }} />
      </div>
      <div className="absolute bottom-3 right-3 top-3 flex w-[50%] flex-col justify-start gap-2 tablet:bottom-6 tablet:right-6 tablet:top-6 tablet:justify-center tablet:gap-3" style={{ opacity: done ? 1 : 0, transform: done ? "translateX(0)" : "translateX(24px)", transition: t, transitionDelay: done ? "250ms" : "0ms" }}>
        {campos.map(([l, v], k) => (
          <div key={l} className={k === 3 ? "hidden tablet:block" : ""} style={{ opacity: done ? 1 : 0, transition: "opacity 0.5s", transitionDelay: `${450 + k * 200}ms` }}>
            <p className="font-inter text-[9px] font-semibold uppercase tracking-[0.08em] text-black/45 tablet:text-[10px]">{l}</p>
            <div className="mt-0.5 rounded-[8px] border border-black/[0.08] bg-white px-2 py-1 font-inter text-[11px] text-black tablet:px-2.5 tablet:py-1.5 tablet:text-[12px]">
              {k === 3 ? <span className="line-clamp-2">{v}</span> : v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Editor de tienda (builder): una versión simplificada del editor real de
   T1 Tienda (barra superior, riel de íconos con Uno abajo y el lienzo con el
   banner seleccionado). Uno arma y cambia la tienda AURUM:
   "crear": de bloques grises a la tienda real.
   "seccion": aparece una sección nueva de "Lo más vendido".
   "oscuro": la tienda pasa a un estilo oscuro. */
function EditorIcon({ d }: { d: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden className="text-black/55">
      <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function VisualTienda({ done, variante }: { done: boolean; variante: "crear" | "seccion" | "oscuro" }) {
  const real = variante !== "crear" || done;
  const oscuro = variante === "oscuro" && done;
  const productos = [FOTO.hoodie, FOTO.gorra, FOTO.playera, FOTO.crew];
  const t = { transition: `all 0.8s ${ease}` };
  return (
    <div className="flex h-full flex-col bg-[#F4F4F5]">
      {/* Barra superior del editor */}
      <div className="flex h-[38px] shrink-0 items-center gap-3 border-b border-black/[0.07] bg-white px-3 tablet:h-[44px] tablet:px-4">
        <EditorIcon d="M10 17l-5-5 5-5M5 12h11a3 3 0 003-3V5" />
        <span className="hidden items-center gap-1.5 rounded-[8px] border border-black/[0.08] px-2 py-1 tablet:flex"><EditorIcon d="M9 14l-4-4 4-4M5 10h9a5 5 0 010 10h-2" /></span>
        <span className="flex items-center gap-1.5 font-inter text-[11px] text-black tablet:text-[12px]">
          <span className="h-[7px] w-[7px] rounded-full bg-[#22C55E]" />
          <span className="font-semibold">aurum</span>
          <span className="hidden text-black/40 tablet:inline">/ Página de Inicio ⌄</span>
        </span>
        <span className="mx-auto hidden items-center gap-1 rounded-[8px] bg-black/[0.04] p-0.5 tablet:flex">
          <span className="rounded-[6px] bg-white px-2 py-1 shadow-sm"><EditorIcon d="M3 5h18v11H3zM8 20h8" /></span>
          <span className="px-2 py-1"><EditorIcon d="M8 3h8v18H8z" /></span>
        </span>
        <span className="ml-auto rounded-[8px] bg-black px-2.5 py-1 font-inter text-[10px] font-semibold text-white tablet:ml-0 tablet:px-3 tablet:text-[11px]">Publicar</span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Riel de íconos, con Uno abajo (solo escritorio) */}
        <div className="hidden w-[52px] shrink-0 flex-col items-center gap-4 border-r border-black/[0.07] bg-white py-4 tablet:flex">
          <EditorIcon d="M3 11l9-7 9 7v9H3z" />
          <EditorIcon d="M6 3h9l4 4v14H6zM9 12h7M9 16h7" />
          <EditorIcon d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />
          <EditorIcon d="M12 3a9 9 0 100 18c1 0 1.5-.8 1.5-1.6 0-1.2 1-1.9 2-1.9H18a3 3 0 003-3c0-6-4-11.5-9-11.5z" />
          <span className="mt-auto flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border-[1.5px] border-[#DB3B2B]/60 bg-[rgba(219,59,43,0.06)]"><UnoMark size={22} /></span>
        </div>

        {/* Lienzo: la tienda */}
        <div className="min-w-0 flex-1 p-2 tablet:p-3">
          <div className="flex h-full flex-col overflow-hidden rounded-[8px]" style={{ ...t, background: oscuro ? "#111" : "#fff" }}>
            <div className="py-1 text-center font-inter text-[8px] font-semibold text-white tablet:text-[10px]" style={{ ...t, background: oscuro ? "#DB3B2B" : "#111" }}>Envío gratis desde $999</div>
            <div className="flex items-center justify-between px-3 py-2 tablet:px-4" style={{ ...t, borderBottom: `1px solid ${oscuro ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}` }}>
              {real ? <span className="font-sora text-[11px] font-bold tracking-[0.18em] tablet:text-[13px]" style={{ ...t, color: oscuro ? "#fff" : "#000" }}>AURUM</span> : <span className="h-[10px] w-[60px] rounded bg-black/10" />}
              <span className="flex gap-2.5">{[0, 1, 2].map((k) => <span key={k} className="h-[5px] w-[24px] rounded" style={{ ...t, background: oscuro ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.12)" }} />)}</span>
            </div>
            {/* Banner seleccionado, como en el editor */}
            <div className="relative h-[38%] shrink-0 overflow-hidden" style={{ ...t, background: "rgba(0,0,0,0.06)", boxShadow: "inset 0 0 0 2px #DB3B2B" }}>
              <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: real ? 1 : 0 }}>
                <Image src="/img/moda-banner-desktop.png" alt="" fill sizes="700px" className="object-cover object-right" />
              </div>
              <span className="absolute left-2 top-2 rounded-[6px] bg-white px-1.5 py-0.5 font-inter text-[9px] font-semibold text-black tablet:text-[10px]">Banner</span>
              <span className="absolute right-2 top-2 hidden items-center gap-1 rounded-[6px] bg-white px-2 py-0.5 font-inter text-[10px] font-semibold text-black tablet:flex">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#DB3B2B" aria-hidden><path d="M11 1.6l1.75 6.9 6.9 1.75-6.9 1.75L11 18.85 9.25 11.95 2.35 10.25 9.25 8.5 11 1.6z" /></svg>
                Pedir un cambio
              </span>
            </div>
            {variante === "seccion" && (
              <div className="overflow-hidden transition-all duration-700" style={{ maxHeight: done ? 36 : 0, transitionTimingFunction: ease }}>
                <p className="px-3 pt-2.5 font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-[#DB3B2B] tablet:px-4">Lo más vendido</p>
              </div>
            )}
            <div className="grid flex-1 grid-cols-4 gap-1.5 p-2.5 tablet:gap-2.5 tablet:p-4">
              {productos.map((src, k) => (
                <div key={k} className="flex min-h-0 flex-col">
                  <div className="relative min-h-0 flex-1 overflow-hidden rounded-[6px]" style={{ ...t, background: oscuro ? "#222" : "rgba(0,0,0,0.06)" }}>
                    <div className="absolute inset-0 transition-all duration-500" style={{ opacity: real ? 1 : 0, transform: real ? "scale(1)" : "scale(0.9)", transitionDelay: variante === "crear" ? `${300 + k * 150}ms` : "0ms" }}>
                      <Foto src={src} className="h-full w-full" />
                    </div>
                  </div>
                  <span className="mt-1 h-[5px] w-[70%] rounded" style={{ ...t, background: oscuro ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Guía: tarjeta de T1 Envíos. Mientras Uno trabaja dice "Generando…";
   al terminar aparece la guía lista con su número y las acciones. */
export function VisualGuia({ done }: { done: boolean }) {
  return (
    <div className="flex h-full items-start justify-center bg-[#F4F4F5] p-3 tablet:items-center tablet:p-6">
      <div className="w-full max-w-[380px] rounded-[16px] border border-black/[0.07] bg-white p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)] tablet:p-5">
        <div className="flex items-center justify-between">
          <p className="font-inter text-[13px] font-bold text-[#1E2939] tablet:text-[15px]">Guía de envío · Pedido #129</p>
          <span
            className="rounded-full px-2 py-0.5 font-inter text-[10px] font-semibold transition-colors duration-500"
            style={done ? { background: "rgba(34,197,94,0.12)", color: "#15803D" } : { background: "rgba(245,158,11,0.14)", color: "#B45309" }}
          >
            {done ? "Lista" : "Generando…"}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-[12px] bg-[#F7F7F8] px-3 py-2.5">
          <span className="font-sora text-[13px] font-black italic text-[#D40511]">DHL</span>
          <div className="min-w-0 flex-1">
            <p className="font-inter text-[12px] font-semibold text-[#1E2939]">Express · 1 a 2 días</p>
            <p className="font-inter text-[10px] text-black/50">2 kg · 30 × 25 × 10 cm</p>
          </div>
          <span className="font-inter text-[13px] font-bold text-[#1E2939]">$168</span>
        </div>
        <div className="mt-3 grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1 font-inter text-[11px] tablet:text-[12px]">
          <span className="mt-1 h-[8px] w-[8px] rounded-full border-2 border-black/40" />
          <span className="text-black/70">AURUM · CDMX 06600</span>
          <span className="mt-1 h-[8px] w-[8px] rounded-full bg-[#DB3B2B]" />
          <span className="text-black/70">Ana López · Monterrey 64000</span>
        </div>
        <div className="mt-3 flex items-center gap-2 border-t border-black/[0.06] pt-3">
          <span className="font-inter text-[10px] text-black/45">Guía</span>
          <span className="font-mono text-[12px] tracking-[0.12em] text-[#1E2939] transition-opacity duration-500" style={{ opacity: done ? 1 : 0.15 }}>{done ? "4829 1036 52" : "•••• •••• ••"}</span>
        </div>
        <div className="mt-3 hidden gap-2 transition-opacity duration-500 tablet:flex" style={{ opacity: done ? 1 : 0.35 }}>
          <span className="rounded-[9px] bg-[#1E2939] px-3.5 py-1.5 font-inter text-[12px] font-semibold text-white">Imprimir guía</span>
          <span className="rounded-[9px] border border-black/10 px-3.5 py-1.5 font-inter text-[12px] font-semibold text-[#1E2939]">Rastrear</span>
        </div>
      </div>
    </div>
  );
}

/* Catálogo: los productos se dan de alta solos desde el Excel */
export function VisualCatalogo({ done }: { done: boolean }) {
  const fotos = [FOTO.hoodie, FOTO.gorra, FOTO.playera, FOTO.bucket, FOTO.crew, FOTO.pantalon, FOTO.sneaker, FOTO.hoodie];
  const n = useCount(231, done, 1600);
  return (
    <div className="flex h-full flex-col bg-[#FAFAF9] p-4 tablet:p-6">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-inter text-[13px] font-semibold text-black tablet:text-[15px]">Productos</p>
          <p className="font-inter text-[10px] text-black/50 tablet:text-[11px]">catalogo-aurum.xlsx</p>
        </div>
        <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2.5 py-1 font-inter text-[11px] font-semibold text-[#15803D] tabular-nums">{n} creados</span>
      </div>
      <div className="mb-3 h-[4px] overflow-hidden rounded-full bg-black/[0.06]">
        <div className="h-full rounded-full bg-[#DB3B2B] transition-all duration-[1600ms]" style={{ width: done ? "100%" : "6%", transitionTimingFunction: ease }} />
      </div>
      <div className="grid flex-1 grid-cols-4 gap-2 tablet:gap-3">
        {fotos.map((src, k) => (
          <div key={k} className="relative overflow-hidden rounded-[10px] bg-black/[0.05]">
            <div className="absolute inset-0 transition-all duration-500" style={{ opacity: done ? 1 : 0, transform: done ? "scale(1)" : "scale(0.85)", transitionDelay: `${150 + k * 140}ms`, transitionTimingFunction: ease }}>
              <Foto src={src} className="h-full w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Ventas: la gráfica se dibuja y el total cuenta hasta llegar */
export function VisualVentas({ done }: { done: boolean }) {
  const n = useCount(84320, done);
  const pts = [22, 30, 26, 40, 36, 52, 47, 58, 55, 70, 66, 84];
  const path = pts.map((v, k) => `${k === 0 ? "M" : "L"}${(k / (pts.length - 1)) * 300},${100 - v}`).join(" ");
  return (
    <div className="flex h-full flex-col bg-white p-5 tablet:p-8">
      <p className="font-inter text-[12px] text-black/50">Ventas · octubre</p>
      <div className="flex items-center gap-3">
        <span className="font-sora text-[30px] font-semibold tabular-nums text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em" }}>${mx(n)}</span>
        <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[12px] font-bold text-[#15803D] transition-opacity duration-500" style={{ opacity: done ? 1 : 0 }}>▲ 32%</span>
      </div>
      {/* La línea se "dibuja" destapándose de izquierda a derecha (clip-path):
          con vectorEffect el truco de strokeDasharray no funciona bien. */}
      <svg viewBox="0 0 300 100" className="mt-4 w-full flex-1" preserveAspectRatio="none" aria-hidden style={{ clipPath: done ? "inset(0 0 0 0)" : "inset(0 100% 0 0)", transition: "clip-path 1.4s cubic-bezier(0.22,1,0.36,1)" }}>
        <defs>
          <linearGradient id="uno-ventas" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(219,59,43,0.22)" />
            <stop offset="100%" stopColor="rgba(219,59,43,0)" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />)}
        <path d={`${path} L300,100 L0,100 Z`} fill="url(#uno-ventas)" />
        <path d={path} fill="none" stroke="#DB3B2B" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-3 hidden grid-cols-3 gap-2 font-inter text-[10px] text-black/55 tablet:grid tablet:text-[12px]">
        {[["Tienda en línea", "48%"], ["Mercado Libre", "29%"], ["Sucursales", "23%"]].map(([c, p]) => (
          <div key={c}><p>{c}</p><p className="font-semibold text-black">{p}</p></div>
        ))}
      </div>
    </div>
  );
}

/* Pedidos: la lista de lo que hay que preparar hoy */
export function VisualPedidos({ done }: { done: boolean }) {
  const pedidos = [
    { src: FOTO.hoodie, n: "#129", c: "Ana López", m: "$1,250" },
    { src: FOTO.gorra, n: "#128", c: "Diego Ramírez", m: "$520" },
    { src: FOTO.sneaker, n: "#127", c: "Sofía Méndez", m: "$2,190" },
    { src: FOTO.playera, n: "#126", c: "Luis Torres", m: "$480" },
  ];
  return (
    <div className="flex h-full flex-col bg-[#FAFAF9] p-4 tablet:p-6">
      <div className="mb-3 flex items-center gap-2">
        <p className="font-inter text-[13px] font-semibold text-black tablet:text-[15px]">Pedidos</p>
        <span className="rounded-full bg-[rgba(245,158,11,0.14)] px-2 py-0.5 font-inter text-[11px] font-semibold text-[#B45309]">12 por preparar</span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {pedidos.map((p, k) => (
          <div key={p.n} className="flex flex-1 items-center gap-3 rounded-[12px] bg-white px-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-500" style={{ opacity: done ? 1 : 0.25, transform: done ? "translateX(0)" : "translateX(-14px)", transitionDelay: `${k * 120}ms`, transitionTimingFunction: ease }}>
            <Foto src={p.src} className="h-[34px] w-[34px] shrink-0 rounded-[8px] tablet:h-[44px] tablet:w-[44px]" />
            <div className="min-w-0 flex-1">
              <p className="font-inter text-[12px] font-semibold text-black">{p.n} · {p.c}</p>
              <p className="font-inter text-[10px] text-black/45">Tienda en línea · hoy</p>
            </div>
            <span className="font-inter text-[12px] font-semibold text-black">{p.m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Cobros: lo que entró hoy y lo que te queda neto */
export function VisualCobros({ done }: { done: boolean }) {
  const neto = useCount(12036, done);
  const barras = [38, 62, 30, 80, 54, 92, 46, 70];
  return (
    <div className="flex h-full flex-col bg-white p-5 tablet:p-8">
      <p className="font-inter text-[12px] text-black/50">Te queda neto hoy</p>
      <p className="font-sora text-[30px] font-semibold tabular-nums text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em" }}>${mx(neto)}</p>
      <div className="mt-4 flex flex-1 items-end gap-2">
        {barras.map((h, k) => (
          <span key={k} className="flex-1 rounded-t-[6px] bg-[#DB3B2B] transition-all duration-700" style={{ height: done ? `${h}%` : "6%", opacity: 0.35 + (k / barras.length) * 0.65, transitionDelay: `${k * 70}ms`, transitionTimingFunction: ease }} />
        ))}
      </div>
      <div className="mt-3 hidden justify-between font-inter text-[11px] text-black/55 tablet:flex tablet:text-[12px]">
        <span>18 cobros · $12,480</span>
        <span className="font-semibold text-black">Depósito 24 oct</span>
      </div>
    </div>
  );
}

/* Rastreo: el paquete avanza por la ruta CDMX → Guadalajara */
export function VisualRastreo({ done }: { done: boolean }) {
  return (
    <div className="relative h-full overflow-hidden bg-[#F1EEE9]">
      <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {Array.from({ length: 12 }).map((_, k) => <line key={`v${k}`} x1={k * 36} y1="0" x2={k * 36 - 40} y2="240" stroke="rgba(0,0,0,0.05)" strokeWidth="6" />)}
        {Array.from({ length: 8 }).map((_, k) => <line key={`h${k}`} x1="0" y1={k * 34} x2="400" y2={k * 34 + 20} stroke="rgba(0,0,0,0.04)" strokeWidth="4" />)}
        <path id="uno-ruta" d="M320,170 C260,160 240,90 180,96 C130,100 110,70 80,64" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
        <path d="M320,170 C260,160 240,90 180,96 C130,100 110,70 80,64" fill="none" stroke="#DB3B2B" strokeWidth="3.5" strokeLinecap="round" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: done ? 0.32 : 1, transition: "stroke-dashoffset 2s cubic-bezier(0.22,1,0.36,1)" }} />
        <circle cx="320" cy="170" r="7" fill="#111" />
        <circle cx="80" cy="64" r="9" fill="#fff" stroke="#DB3B2B" strokeWidth="3" />
      </svg>
      <span className="absolute font-inter text-[11px] font-semibold text-black" style={{ right: "12%", bottom: "16%" }}>CDMX</span>
      <span className="absolute font-inter text-[11px] font-semibold text-black" style={{ left: "10%", top: "14%" }}>Guadalajara</span>
      <div className="absolute left-3 right-3 top-3 flex items-center gap-3 rounded-[14px] bg-white p-3 shadow-[0_14px_34px_-12px_rgba(0,0,0,0.3)] transition-all duration-700 tablet:bottom-5 tablet:left-5 tablet:right-auto tablet:top-auto tablet:w-[300px]" style={{ opacity: done ? 1 : 0, transform: done ? "translateY(0)" : "translateY(12px)", transitionDelay: "700ms" }}>
        <span className="font-sora text-[12px] font-black italic text-[#D40511]">DHL</span>
        <div className="min-w-0 flex-1">
          <p className="font-inter text-[12px] font-semibold text-black">En tránsito a Guadalajara</p>
          <p className="font-inter text-[10px] text-black/50">Pedido #124 · llega mañana</p>
        </div>
      </div>
    </div>
  );
}

/* Sobrepeso: lo que declaraste contra lo que pesó de verdad */
export function VisualSobrepeso({ done }: { done: boolean }) {
  return (
    <div className="flex h-full flex-col justify-start bg-white p-5 tablet:justify-center tablet:p-10">
      <p className="font-inter text-[12px] text-black/50">Guía 7710 2284 · Estafeta</p>
      <p className="mb-5 font-sora text-[22px] font-semibold text-black tablet:text-[30px]">Cobro extra de <span className="text-[#DB3B2B]">+$86</span></p>
      {[["Declarado", 1, "1 kg", "bg-black/25"], ["Real", 2.4, "2.4 kg", "bg-[#DB3B2B]"]].map(([l, v, t, c], k) => (
        <div key={l as string} className="mb-3">
          <div className="mb-1 flex justify-between font-inter text-[12px]"><span className="text-black/60">{l}</span><span className="font-semibold text-black">{t}</span></div>
          <div className="h-[14px] overflow-hidden rounded-full bg-black/[0.05]">
            <div className={`h-full rounded-full ${c} transition-all duration-1000`} style={{ width: done ? `${((v as number) / 2.6) * 100}%` : "0%", transitionDelay: `${k * 250}ms`, transitionTimingFunction: ease }} />
          </div>
        </div>
      ))}
      <span className="mt-2 hidden self-start rounded-full border border-[#D97706]/30 tablet:inline-block bg-[rgba(245,158,11,0.10)] px-2.5 py-1 font-inter text-[11px] font-semibold text-[#B45309] transition-opacity duration-500" style={{ opacity: done ? 1 : 0, transitionDelay: "900ms" }}>Abre una incidencia desde el chat</span>
    </div>
  );
}
