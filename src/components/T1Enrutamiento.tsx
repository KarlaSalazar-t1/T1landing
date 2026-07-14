"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";

function CountStat({ end, prefix = "", suffix = "", label, decimals = 0 }: { end: number; prefix?: string; suffix?: string; label: string; decimals?: number }) {
  const { ref, display } = useCountUp({ end, prefix, suffix, decimals, duration: 1800 });
  return (
    <div ref={ref}>
      <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>
        {display}
      </p>
      <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">{label}</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Routing panel — a payment is routed to the processor with the
   highest approval score. Cycles through scenarios. (Hero + Block 1)
   ──────────────────────────────────────────────────────────── */
const PROCESSORS = ["Cybersource", "Prosa", "ClaroScore"];
const ROUTING_SCENARIOS: { win: number; pct: [number, number, number]; amount: string; card: string }[] = [
  { win: 1, pct: [88, 96, 82], amount: "$1,345.99", card: "Visa •• 4242" },
  { win: 0, pct: [94, 90, 79], amount: "$3,120.00", card: "Mastercard •• 8821" },
  { win: 2, pct: [85, 91, 97], amount: "$899.00", card: "Amex •• 1007" },
];

const VBW = 400;
const VBH = 220;
const NODE_TOP = [20, 90, 160];
const NODE_CY = [40, 110, 180];
const CARD_LEFT = 168;
const CARD_RIGHT = 292;
const INPUT_X = 40;
const SUCCESS_PCT = 85;
const SUCCESS_X = (SUCCESS_PCT / 100) * VBW;

function RoutingPanel({ title = "Enrutamiento por score" }: { title?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((s) => (s + 1) % ROUTING_SCENARIOS.length), 2800);
    return () => clearInterval(id);
  }, []);
  const sc = ROUTING_SCENARIOS[i];
  const win = sc.win;
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <p className="font-sora text-[14px] font-medium text-black">{title}</p>
        <span key={sc.amount} className="font-inter text-[12px] font-semibold text-black/70" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>{sc.amount} · {sc.card}</span>
      </div>
      <div className="relative" style={{ height: VBH }}>
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${VBW} ${VBH}`} fill="none" preserveAspectRatio="none">
          {NODE_CY.map((cy, idx) => {
            const active = idx === win;
            const dy = active ? 0 : idx < win ? -8 : 8;
            return (
              <line key={idx} x1={INPUT_X} y1="110" x2={active ? CARD_LEFT : CARD_LEFT - 8} y2={cy + dy} stroke={active ? "#DB3B2B" : "rgba(0,0,0,0.12)"} strokeWidth={active ? 2 : 1.5} strokeDasharray={active ? undefined : "5 5"} style={{ transition: "stroke 0.5s ease" }} />
            );
          })}
          <line x1={CARD_RIGHT} y1={NODE_CY[win]} x2={SUCCESS_X} y2="110" stroke="#DB3B2B" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
          <circle key={`dot-${i}`} r="4" fill="#DB3B2B">
            <animateMotion dur="1.7s" repeatCount="indefinite" path={`M${INPUT_X} 110 L${CARD_LEFT} ${NODE_CY[win]} L${CARD_RIGHT} ${NODE_CY[win]} L${SUCCESS_X} 110`} />
          </circle>
        </svg>
        <div className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-[10px] border border-black/[0.08] bg-white" style={{ left: "calc(10% - 20px)", top: 90, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M3 10h18" stroke="#DB3B2B" strokeWidth="1.6" /></svg>
        </div>
        {PROCESSORS.map((name, idx) => {
          const active = idx === win;
          const dy = active ? 0 : idx < win ? -8 : 8;
          return (
            <div
              key={name}
              className="absolute flex flex-col items-center justify-center rounded-[10px] border bg-white px-2"
              style={{ left: `${(CARD_LEFT / VBW) * 100}%`, width: `${((CARD_RIGHT - CARD_LEFT) / VBW) * 100}%`, top: NODE_TOP[idx], height: 40, borderColor: active ? "#DB3B2B" : "rgba(0,0,0,0.08)", opacity: active ? 1 : 0.5, boxShadow: active ? "0 4px 14px rgba(219,59,43,0.18)" : "none", transform: `translateY(${dy}px) scale(${active ? 1 : 0.95})`, transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)" }}
            >
              <p className="font-inter text-[10px] font-semibold text-black">{name}</p>
              <p className="font-inter text-[8px]" style={{ color: active ? "#16A34A" : "rgba(0,0,0,0.5)" }}>Aprobación {sc.pct[idx]}%</p>
            </div>
          );
        })}
        <div className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[rgba(34,197,94,0.10)]" style={{ left: `${SUCCESS_PCT}%`, top: 90 }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-[10px] bg-[rgba(34,197,94,0.08)] px-3 py-2">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="font-inter text-[11px] font-medium text-[#16A34A]">Enrutado a {PROCESSORS[win]} · {sc.pct[win]}% de aprobación</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Retry / failover panel — one processor declines, T1 retries with
   another until the payment is approved. (Block 2)
   ──────────────────────────────────────────────────────────── */
type Attempt = { proc: string; state: "trying" | "declined" | "approved" };
// 0 trying A · 1 A declined + trying B · 2 B declined + trying C · 3 C approved · 4 hold
const RETRY_STEPS: Attempt[][] = [
  [{ proc: "Cybersource", state: "trying" }],
  [{ proc: "Cybersource", state: "declined" }, { proc: "Prosa", state: "trying" }],
  [{ proc: "Cybersource", state: "declined" }, { proc: "Prosa", state: "declined" }, { proc: "ClaroScore", state: "trying" }],
  [{ proc: "Cybersource", state: "declined" }, { proc: "Prosa", state: "declined" }, { proc: "ClaroScore", state: "approved" }],
  [{ proc: "Cybersource", state: "declined" }, { proc: "Prosa", state: "declined" }, { proc: "ClaroScore", state: "approved" }],
];

function RetryPanel() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const durations = [1200, 1200, 1200, 1600, 2200];
    const t = setTimeout(() => setStep((s) => (s + 1) % RETRY_STEPS.length), durations[step]);
    return () => clearTimeout(t);
  }, [step]);
  const attempts = RETRY_STEPS[step];
  const done = step >= 3;
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <p className="font-sora text-[14px] font-medium text-black">Reintentos automáticos</p>
        <span className="font-inter text-[12px] font-semibold text-black/70">$1,890.00 · Visa •• 4242</span>
      </div>
      <div className="flex flex-col gap-2.5" style={{ minHeight: 168 }}>
        {attempts.map((a, idx) => (
          <div key={a.proc} className="flex items-center gap-3 rounded-[12px] border px-3.5 py-3" style={{ borderColor: a.state === "approved" ? "rgba(34,197,94,0.35)" : a.state === "declined" ? "rgba(0,0,0,0.08)" : "rgba(219,59,43,0.3)", background: a.state === "approved" ? "rgba(34,197,94,0.06)" : "#fff", opacity: a.state === "declined" ? 0.6 : 1, animation: "fadeSlideIn 0.4s ease-out both" }}>
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full" style={{ background: a.state === "approved" ? "rgba(34,197,94,0.14)" : a.state === "declined" ? "rgba(239,68,68,0.10)" : "rgba(219,59,43,0.10)" }}>
              {a.state === "trying" && <span className="h-[13px] w-[13px] rounded-full border-2 border-[#DB3B2B] border-t-transparent" style={{ animation: "spin 0.7s linear infinite" }} />}
              {a.state === "declined" && <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" /></svg>}
              {a.state === "approved" && <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            <span className="flex-1 font-inter text-[13px] font-medium text-black">{a.proc}</span>
            <span className="font-inter text-[11.5px] font-semibold" style={{ color: a.state === "approved" ? "#16A34A" : a.state === "declined" ? "#9CA3AF" : "#DB3B2B" }}>
              {a.state === "trying" ? "Enviando…" : a.state === "declined" ? "Declinado" : "Aprobado"}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-[10px] px-3 py-2" style={{ background: done ? "rgba(34,197,94,0.08)" : "rgba(219,59,43,0.06)", transition: "background 0.4s ease" }}>
        {done ? (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="font-inter text-[11px] font-medium text-[#16A34A]">Pago recuperado con reintento automático</span>
          </>
        ) : (
          <>
            <span className="h-[6px] w-[6px] rounded-full bg-[#DB3B2B]" style={{ animation: "pulse-soft 1.4s ease-in-out infinite" }} />
            <span className="font-inter text-[11px] font-medium text-[#DB3B2B]">Reintentando con otro procesador…</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Rules panel — configurable routing rules by brand, amount, MSI…
   (Block 3)
   ──────────────────────────────────────────────────────────── */
const RULES = [
  { cond: "American Express", route: "Prosa", tag: "Marca" },
  { cond: "Meses sin intereses", route: "Cybersource", tag: "MSI" },
  { cond: "Monto mayor a $5,000", route: "ClaroScore + 3DS", tag: "Riesgo" },
  { cond: "Débito nacional", route: "Mejor score", tag: "Aprobación" },
];

function RulesPanel() {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <p className="font-sora text-[14px] font-medium text-black">Reglas de enrutamiento</p>
        <span className="flex items-center gap-1 rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#16A34A]"><span className="h-[5px] w-[5px] rounded-full bg-[#22C55E]" style={{ animation: "pulse-soft 2s ease-in-out infinite" }} />Activas</span>
      </div>
      {RULES.map((r, i) => (
        <div key={r.cond} className={`flex items-center gap-3 py-3 ${i < RULES.length - 1 ? "border-b border-black/[0.05]" : ""}`}>
          <span className="rounded-[6px] bg-black/[0.05] px-2 py-1 font-inter text-[9px] font-semibold uppercase tracking-wide text-black/50">{r.tag}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-inter text-[12.5px] font-medium text-black">{r.cond}</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
          <span className="shrink-0 font-inter text-[12px] font-semibold text-[#DB3B2B]">{r.route}</span>
        </div>
      ))}
      <div className="mt-3 flex items-center justify-center gap-2 rounded-[10px] border border-dashed border-black/[0.14] py-2.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        <span className="font-inter text-[11.5px] font-medium text-black/55">Crea una regla</span>
      </div>
    </div>
  );
}

export default function T1Enrutamiento() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRootRef = useRef<HTMLDivElement>(null);
  useFSStackCards(stackRootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("modal-visible");
        });
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    root.querySelectorAll("[data-modal-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="w-full">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24" style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.16) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-[440px] w-[440px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(59,99,219,0.12) 0%, transparent 65%)", filter: "blur(50px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-inter text-[12.5px] font-medium text-white/75">
                <span className="h-[6px] w-[6px] rounded-full bg-[#DB3B2B]" />
                Enrutamiento de pagos
              </span>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]" style={{ lineHeight: 1.05, letterSpacing: "-1.7px", marginBottom: 22 }}>
                Cada pago por la ruta que más{" "}
                <span className="relative inline-block whitespace-nowrap">
                  aprueba.
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
              </h1>
              <p className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                T1 envía cada cobro al procesador con más probabilidad de aprobarse y reintenta con otro si es necesario. Menos rechazos, más ventas.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Comenzar ahora
                </a>
              </div>
            </div>
            <div className="relative w-full">
              <RoutingPanel title="Enrutamiento en tiempo real" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Problema ── */}
      <section className="relative bg-white px-5 pt-16 pb-12 tablet:px-10 tablet:pt-24 tablet:pb-16" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[700px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15 }}>
              Un solo procesador deja ventas en la mesa.
            </h2>
          </div>
          <div data-modal-animate className="mx-auto grid max-w-[820px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { stat: "1 de 8", label: "pagos con tarjeta se declina sin motivo real" },
              { stat: "-40%", label: "de rechazos al enrutar por aprobación" },
              { stat: "$0", label: "de ventas recuperadas si no reintentas" },
            ].map((m, i) => (
              <div key={m.label} data-stagger className="rounded-[18px] border border-black/[0.06] bg-white p-7 text-center" style={{ ["--i" as string]: i, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <p className="font-sora text-[34px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>{m.stat}</p>
                <p className="font-inter text-[14px] font-light text-black/60" style={{ lineHeight: 1.5 }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="relative bg-white px-5 pt-8 pb-6 tablet:px-10 tablet:pt-10 tablet:pb-8">
        <div data-modal-animate className="mx-auto max-w-[760px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.4px", lineHeight: 1.1, marginBottom: 16 }}>
            Inteligencia detrás de cada cobro.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Múltiples procesadores conectados, un solo contrato y decisiones en milisegundos.
          </p>
        </div>
      </section>

      {/* ── Feature blocks ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — enrutamiento por score */}
        <div className="fs-stack-card" style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Enruta por probabilidad de aprobación
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Cada transacción se analiza y se envía al procesador que más la aprueba, según marca, banco, monto y comportamiento en tiempo real.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Score de aprobación por transacción", "Decisión en milisegundos, sin fricción para el cliente", "Aprendizaje continuo con cada cobro"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <RoutingPanel />
            </div>
          </div>
        </div>

        {/* Block 2 — reintentos automáticos */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#FBFBFB" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div className="order-2 tablet:order-1">
                <RetryPanel />
              </div>
              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Reintentos automáticos que recuperan ventas
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Si un procesador declina, T1 reintenta al instante con otro. Tu cliente ni se entera y tú recuperas la venta que ibas a perder.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Cascada automática entre procesadores", "Reintentos inteligentes, no a ciegas", "Recupera pagos declinados sin fricción"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Block 3 — reglas configurables */}
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Reglas a tu medida, sin código
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Define cómo se enruta cada cobro por marca, banco, monto, país o meses sin intereses. Y balancea la carga entre adquirentes.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Reglas por marca, BIN, monto y país", "Balanceo de carga entre adquirentes", "Cambios en vivo, sin tocar tu integración"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <RulesPanel />
            </div>
          </div>
        </div>
      </div>

      {/* ── Cómo funciona ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Cómo enruta cada pago
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Todo pasa en menos de lo que tarda tu cliente en pestañear.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-5 tablet:grid-cols-4">
            {[
              { n: "01", t: "Llega el pago", d: "Tu cliente paga en el checkout con cualquier método." },
              { n: "02", t: "T1 lo analiza", d: "Score de aprobación por marca, banco, monto y riesgo." },
              { n: "03", t: "Elige la ruta", d: "Se envía al procesador con mayor probabilidad de aprobarse." },
              { n: "04", t: "Aprueba o reintenta", d: "Si declina, reintenta con otro hasta aprobar la venta." },
            ].map((s, i) => (
              <div key={s.n} data-stagger className="rounded-[18px] border border-black/[0.07] bg-white p-7" style={{ ["--i" as string]: i, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <p className="font-sora text-[26px] font-light text-[#DB3B2B]" style={{ letterSpacing: "-0.02em", marginBottom: 12 }}>{s.n}</p>
                <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>{s.t}</h3>
                <p className="font-inter text-[13.5px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lo que incluye ── */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Todo el enrutamiento, incluido
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Un solo contrato con T1 te conecta a todos los procesadores.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              { title: "Múltiples adquirentes", desc: "Conecta a varios procesadores y bancos sin contratos por separado.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 8h18M3 16h18" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Score de aprobación", desc: "Cada cobro se envía por la ruta con más probabilidad de aprobarse.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 20V10M10 20V4M16 20v-7M20 20H3" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Reintentos en cascada", desc: "Si uno declina, reintenta con otro procesador al instante.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 4v5h5M20 20v-5h-5M20 9a8 8 0 0 0-14.9-2M4 15a8 8 0 0 0 14.9 2" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Reglas sin código", desc: "Configura el enrutamiento por marca, monto, país o MSI.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10M18 15l3 3-3 3" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Balanceo de carga", desc: "Distribuye el volumen entre adquirentes para máxima disponibilidad.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="6" r="2.5" stroke="#111827" strokeWidth="1.6" /><circle cx="6" cy="18" r="2.5" stroke="#111827" strokeWidth="1.6" /><circle cx="18" cy="18" r="2.5" stroke="#111827" strokeWidth="1.6" /><path d="M12 8.5v3M12 11.5L6.5 15.5M12 11.5l5.5 4" stroke="#111827" strokeWidth="1.6" /></svg>) },
              { title: "Panel y reportes", desc: "Aprobación por procesador, ruta y motivo de rechazo en un lugar.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#111827" strokeWidth="1.6" /><path d="M3 9h18M8 4v16" stroke="#111827" strokeWidth="1.6" /></svg>) },
            ].map((f, i) => (
              <div key={f.title} data-stagger className="rounded-[18px] border border-black/[0.07] bg-white p-7" style={{ ["--i" as string]: i, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex h-[40px] w-[40px] items-center justify-center" style={{ marginBottom: 18 }}>{f.icon}</div>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 8 }}>{f.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div data-modal-animate className="mt-12 flex justify-center">
            <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
              Activar enrutamiento
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative px-5 py-20 tablet:px-10 tablet:py-24" style={{ background: "linear-gradient(135deg, #1A0A0A 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[24px] font-light text-white tablet:text-[34px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Más aprobación, en números.
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
            <div data-stagger style={{ ["--i" as string]: 0 }}><CountStat end={98} suffix="%" label="aprobación promedio" /></div>
            <div data-stagger style={{ ["--i" as string]: 1 }}><CountStat end={40} prefix="-" suffix="%" label="de rechazos al enrutar" /></div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>1</p>
              <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">contrato para todos los procesadores</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>Preguntas frecuentes</h2>
          </div>
          <div data-modal-animate className="flex flex-col gap-3">
            {[
              { q: "¿Qué es el enrutamiento de pagos?", a: "Es la tecnología que decide, en milisegundos, por cuál procesador o adquirente enviar cada cobro para maximizar la probabilidad de que se apruebe." },
              { q: "¿Necesito contratar cada procesador por separado?", a: "No. Con un solo contrato con T1 te conectas a múltiples procesadores y bancos, y nosotros enrutamos cada pago al de mayor aprobación." },
              { q: "¿Cómo funcionan los reintentos?", a: "Si un procesador declina una transacción que debería aprobarse, T1 la reintenta automáticamente con otro procesador, sin fricción para tu cliente." },
              { q: "¿Puedo definir mis propias reglas?", a: "Sí. Configuras el enrutamiento por marca, banco, monto, país o meses sin intereses desde el panel, sin tocar tu integración." },
              { q: "¿Afecta la velocidad del cobro?", a: "No. Todo el análisis y la decisión de ruta ocurren en milisegundos, así que el cliente no percibe ninguna demora." },
              { q: "¿Cómo me integro?", a: "El enrutamiento viene incluido con T1 Pagos. Si ya cobras con nuestra pasarela o API, se activa desde el panel sin desarrollo adicional." },
            ].map((f, i) => (
              <details key={f.q} data-stagger className="group rounded-[14px] border border-black/[0.06] bg-white transition-all duration-200 open:border-[rgba(219,59,43,0.2)] open:shadow-[0_4px_18px_rgba(0,0,0,0.05)]" style={{ ["--i" as string]: i }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-black transition-colors duration-150 hover:text-[#DB3B2B]">
                  {f.q}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-black/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#DB3B2B]"><path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </summary>
                <p className="px-6 pb-5 font-inter text-[14px] font-light text-black/65" style={{ lineHeight: 1.65 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <T1FinalCTA
        title="¿Listo para aprobar más pagos?"
        description="Activa el enrutamiento inteligente de T1 Pagos y recupera las ventas que hoy pierdes en rechazos."
      />
    </div>
  );
}
