"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";
import { CheckoutHeroScreen, PagoFlowScreen } from "@/components/showcase/PagoMockups";

/* ── Animated count stat (white-on-dark, used in stats strip) ── */
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

/* ── Small count-up helper for the risk score ── */
function AnimScore({ value }: { value: number }) {
  const [disp, setDisp] = useState(value);
  const fromRef = useRef(value);
  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    const dur = 800;
    let raf = 0;
    let st = 0;
    const tick = (t: number) => {
      if (!st) st = t;
      const p = Math.min(1, (t - st) / dur);
      setDisp(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{disp}</>;
}

/* ── Block 1 panel — payment methods, animated like the checkout ── */
type PayMethod = {
  id: string; label: string; logo: "cards" | "paypal" | "img"; img?: string; h?: number;
  kind: "card" | "note"; note?: string; detailIcon?: "barcode" | "card";
};
const PAY_METHODS: PayMethod[] = [
  { id: "card", label: "Tarjetas de crédito o débito", logo: "cards", kind: "card" },
  { id: "spei", label: "Transferencia bancaria", logo: "img", img: "/img/icons/spei.svg", h: 13, kind: "note", note: "Al dar click en pagar te mostraremos los datos para efectuar tu pago." },
  { id: "oxxo", label: "Oxxo Pay", logo: "img", img: "/img/oxxo.jpg", h: 18, kind: "note", detailIcon: "barcode", note: "Con el código de barras generado, tienes 2 días para pagar en cualquier tienda Oxxo. Una vez realizado el pago, el status de tu pedido se actualizará en 1 o 2 días hábiles." },
  { id: "kueski", label: "Kueski Pay", logo: "img", img: "/img/icons/kueski.svg", h: 14, kind: "note", note: "Al dar click en pagar, te redirigiremos a Kueski para completar tu compra." },
  { id: "paypal", label: "PayPal", logo: "paypal", kind: "note", detailIcon: "card", note: "Después de hacer clic en “Pagar con PayPal”, se te redirigirá a PayPal para completar tu compra de forma segura." },
];

function MethodLogo({ m }: { m: PayMethod }) {
  if (m.logo === "cards")
    return (
      <div className="flex items-center gap-1.5">
        <Image src="/img/icons/visa.svg" alt="Visa" width={26} height={12} className="h-[12px] w-auto" />
        <Image src="/img/icons/mastercard.svg" alt="Mastercard" width={18} height={12} className="h-[14px] w-auto" />
        <Image src="/img/icons/amex.svg" alt="Amex" width={18} height={12} className="h-[12px] w-auto" />
        <span className="font-sora text-[9px] font-extrabold tracking-tight text-[#E10E0E]">CARNET</span>
      </div>
    );
  if (m.logo === "paypal")
    return (
      <span className="font-sora text-[13px] font-bold italic">
        <span style={{ color: "#003087" }}>Pay</span>
        <span style={{ color: "#009CDE" }}>Pal</span>
      </span>
    );
  return <Image src={m.img!} alt="" width={44} height={m.h} className="w-auto object-contain" style={{ height: m.h }} />;
}

function MethodDetail({ m }: { m: PayMethod }) {
  if (m.kind === "card")
    return (
      <div className="flex flex-col gap-2">
        <p className="font-inter text-[9px] font-semibold uppercase tracking-wider text-black/40">Tarjeta guardada</p>
        <div className="flex items-center gap-2.5 rounded-[8px] border border-black/[0.10] bg-white px-3 py-2.5">
          <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border border-[#DB3B2B]"><span className="h-[8px] w-[8px] rounded-full bg-[#DB3B2B]" /></span>
          <Image src="/img/icons/visa.svg" alt="Visa" width={26} height={14} className="h-[14px] w-auto" />
          <div className="flex-1 leading-tight">
            <p className="font-inter text-[11px] font-semibold text-black">Visa terminada en 4242</p>
            <p className="font-inter text-[9px] text-black/45">Luis Cervantes Robles</p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-[8px] border border-black/[0.10] bg-white px-3 py-2.5">
          <span className="font-inter text-[11px] text-black/60">Meses sin intereses</span>
          <span className="flex items-center gap-1 font-inter text-[11px] font-semibold text-black">
            3 meses
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
      </div>
    );
  // note — centered message, with an optional icon (like the real checkout)
  return (
    <div className="flex h-full flex-col items-center justify-center px-2 text-center">
      {m.detailIcon === "barcode" && (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 8 }}>
          <path d="M4 8V6a2 2 0 0 1 2-2h2 M16 4h2a2 2 0 0 1 2 2v2 M20 16v2a2 2 0 0 1-2 2h-2 M8 20H6a2 2 0 0 1-2-2v-2" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8v8 M11 8v8 M14 8v8 M16.5 8v8" stroke="#111827" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )}
      {m.detailIcon === "card" && (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 8 }}>
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="#111827" strokeWidth="1.6" />
          <path d="M3 10h18" stroke="#111827" strokeWidth="1.6" />
        </svg>
      )}
      <p className="font-inter text-[11px] text-black/55" style={{ lineHeight: 1.5, maxWidth: 250 }}>{m.note}</p>
    </div>
  );
}

function PaymentMethodsPanel() {
  const [sel, setSel] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSel((s) => (s + 1) % PAY_METHODS.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 14 }}>Método de pago</p>
      <div className="flex flex-col gap-1.5">
        {PAY_METHODS.map((m, i) => {
          const active = sel === i;
          return (
            <div
              key={m.id}
              className="overflow-hidden rounded-[10px] border bg-white"
              style={{
                borderColor: active ? "rgba(219,59,43,0.45)" : "rgba(0,0,0,0.08)",
                boxShadow: active ? "0 4px 14px rgba(219,59,43,0.10)" : "none",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
              }}
            >
              <div className="flex items-center gap-3 px-3 py-2.5">
                <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border" style={{ borderColor: active ? "#DB3B2B" : "rgba(0,0,0,0.25)", transition: "border-color 0.3s ease" }}>
                  <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#DB3B2B", transform: active ? "scale(1)" : "scale(0)", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} />
                </span>
                <span className="flex-1 font-inter text-[12px] text-black" style={{ fontWeight: active ? 600 : 400 }}>{m.label}</span>
                <MethodLogo m={m} />
              </div>
              {/* Detail expands INSIDE the selected card. Exactly one card is active,
                  and its detail zone is a fixed height, so the panel never resizes. */}
              {active && (
                <div className="border-t border-black/[0.06]" style={{ height: 150, overflow: "hidden" }}>
                  <div key={sel} className="h-full px-3.5 py-3" style={{ animation: "fadeSlideIn 0.35s ease-out both" }}>
                    <MethodDetail m={m} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Block 2 panel — score routing (cybersource / claroscore / prosa) ── */
const ROUTING_SCENARIOS: { win: number; pct: [number, number, number] }[] = [
  { win: 1, pct: [88, 96, 82] },
  { win: 0, pct: [94, 90, 79] },
  { win: 2, pct: [85, 91, 97] },
];
const ROUTING_NAMES = ["Cybersource", "ClaroScore", "Prosa"];
// Geometry in a 400×220 coordinate space. The SVG stretches to the same box
// (preserveAspectRatio="none") and the cards are positioned in % of that same
// box, so lines and cards stay aligned at any container width.
const VBW = 400;
const VBH = 220;
const NODE_TOP = [20, 90, 160]; // card top (px == viewBox-y, since height is 1:1)
const NODE_CY = [40, 110, 180]; // card vertical center
const CARD_LEFT = 172; // viewBox-x of card left edge
const CARD_RIGHT = 288; // viewBox-x of card right edge
const INPUT_X = 40; // viewBox-x of the input node center (= 10%)
const SUCCESS_PCT = 84; // success node left edge, in % of the diagram width
const SUCCESS_X = (SUCCESS_PCT / 100) * VBW; // line ends exactly at that edge (same % → aligned at any width)

function RoutingPanel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((s) => (s + 1) % ROUTING_SCENARIOS.length), 2600);
    return () => clearInterval(id);
  }, []);
  const sc = ROUTING_SCENARIOS[i];
  const win = sc.win;
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 16 }}>Enrutamiento por score</p>
      <div className="relative" style={{ height: VBH }}>
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${VBW} ${VBH}`} fill="none" preserveAspectRatio="none">
          {NODE_CY.map((cy, idx) => {
            const active = idx === win;
            const dy = active ? 0 : idx < win ? -8 : 8;
            return (
              <line key={idx} x1="40" y1="110" x2={active ? CARD_LEFT : CARD_LEFT - 8} y2={cy + dy} stroke={active ? "#DB3B2B" : "rgba(0,0,0,0.12)"} strokeWidth={active ? 2 : 1.5} strokeDasharray={active ? undefined : "5 5"} style={{ transition: "stroke 0.5s ease" }} />
            );
          })}
          <line x1={CARD_RIGHT} y1={NODE_CY[win]} x2={SUCCESS_X} y2="110" stroke="#DB3B2B" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
          <circle key={`dot-${i}`} r="4" fill="#DB3B2B">
            <animateMotion dur="1.6s" repeatCount="indefinite" path={`M${INPUT_X} 110 L${CARD_LEFT} ${NODE_CY[win]} L${CARD_RIGHT} ${NODE_CY[win]} L${SUCCESS_X} 110`} />
          </circle>
        </svg>
        <div className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-[10px] border border-black/[0.08] bg-white" style={{ left: "calc(10% - 20px)", top: 90, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M3 10h18" stroke="#DB3B2B" strokeWidth="1.6" /></svg>
        </div>
        {ROUTING_NAMES.map((name, idx) => {
          const active = idx === win;
          const dy = active ? 0 : idx < win ? -8 : 8;
          return (
            <div
              key={name}
              className="absolute flex flex-col items-center justify-center rounded-[10px] border bg-white px-2"
              style={{ left: `${(CARD_LEFT / VBW) * 100}%`, width: `${((CARD_RIGHT - CARD_LEFT) / VBW) * 100}%`, top: NODE_TOP[idx], height: 40, borderColor: active ? "#DB3B2B" : "rgba(0,0,0,0.08)", background: "#fff", opacity: active ? 1 : 0.5, boxShadow: active ? "0 4px 14px rgba(219,59,43,0.18)" : "none", transform: `translateY(${dy}px) scale(${active ? 1 : 0.95})`, transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)" }}
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
        <span className="font-inter text-[11px] font-medium text-[#16A34A]">Enrutado a {ROUTING_NAMES[win]} · {sc.pct[win]}% de aprobación</span>
      </div>
    </div>
  );
}

/* ── Block 3 panel — antifraud, cycles through risk scenarios ── */
type Sig = { state: "ok" | "warn" | "bad"; label: string };
const FRAUD_SCENARIOS: { score: number; ring: string; badge: string; badgeBg: string; badgeColor: string; tx: string; decision: string; signals: Sig[] }[] = [
  {
    score: 94, ring: "#22C55E", badge: "Bajo riesgo", badgeBg: "rgba(34,197,94,0.12)", badgeColor: "#16A34A",
    tx: "$1,345.99 · Visa •• 4242", decision: "Aprobada en 87ms",
    signals: [
      { state: "ok", label: "Identidad verificada" },
      { state: "ok", label: "IP coherente con dirección" },
      { state: "ok", label: "Histórico positivo del cliente" },
      { state: "ok", label: "Velocidad de compra normal" },
    ],
  },
  {
    score: 63, ring: "#F59E0B", badge: "Riesgo medio", badgeBg: "rgba(245,158,11,0.14)", badgeColor: "#B45309",
    tx: "$4,890.00 · Mastercard •• 8821", decision: "3D Secure solicitado",
    signals: [
      { state: "ok", label: "Identidad verificada" },
      { state: "warn", label: "IP en otra ciudad" },
      { state: "ok", label: "Tarjeta sin reportes" },
      { state: "warn", label: "Monto mayor al habitual" },
    ],
  },
  {
    score: 21, ring: "#EF4444", badge: "Alto riesgo", badgeBg: "rgba(239,68,68,0.12)", badgeColor: "#DC2626",
    tx: "$8,250.00 · Amex •• 1007", decision: "Transacción detenida",
    signals: [
      { state: "bad", label: "Identidad no verificada" },
      { state: "bad", label: "IP de proxy / VPN detectada" },
      { state: "warn", label: "Tarjeta nueva sin histórico" },
      { state: "bad", label: "5 intentos en 1 minuto" },
    ],
  },
];
const RING_C = 2 * Math.PI * 38;

function SigIcon({ state }: { state: "ok" | "warn" | "bad" }) {
  if (state === "ok")
    return <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (state === "warn")
    return <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2.5L15 14H1L8 2.5z" stroke="#B45309" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8 7v3M8 12h.01" stroke="#B45309" strokeWidth="1.4" strokeLinecap="round" /></svg>;
  return <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" /></svg>;
}

function AntifraudPanel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((s) => (s + 1) % FRAUD_SCENARIOS.length), 2900);
    return () => clearInterval(id);
  }, []);
  const sc = FRAUD_SCENARIOS[i];
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <p className="font-sora text-[14px] font-medium text-black">Análisis de riesgo</p>
        <span className="rounded-full px-2 py-0.5 font-inter text-[10px] font-bold" style={{ background: sc.badgeBg, color: sc.badgeColor, transition: "background-color 0.4s ease, color 0.4s ease" }}>{sc.badge}</span>
      </div>
      <div className="flex items-center gap-5" style={{ marginBottom: 16 }}>
        <div className="relative flex h-[90px] w-[90px] shrink-0 items-center justify-center">
          <svg width="90" height="90" viewBox="0 0 90 90" className="absolute inset-0 -rotate-90">
            <circle cx="45" cy="45" r="38" stroke="rgba(0,0,0,0.06)" strokeWidth="6" fill="none" />
            <circle cx="45" cy="45" r="38" stroke={sc.ring} strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={`${(sc.score / 100) * RING_C} ${RING_C}`} style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.22,1,0.36,1), stroke 0.5s ease" }} />
          </svg>
          <div className="text-center">
            <p className="font-sora text-[24px] font-light text-black" style={{ lineHeight: 1, letterSpacing: "-0.02em" }}><AnimScore value={sc.score} /></p>
            <p className="font-inter text-[8px] font-medium text-black/45">/100</p>
          </div>
        </div>
        <div key={i} style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
          <p className="font-inter text-[10px] text-black/45" style={{ marginBottom: 2 }}>Transacción</p>
          <p className="font-inter text-[12px] font-semibold text-black">{sc.tx}</p>
          <p className="font-inter text-[10px] font-medium" style={{ color: sc.badgeColor }}>{sc.decision}</p>
        </div>
      </div>
      <div key={`sig-${i}`} className="flex flex-col gap-1.5" style={{ animation: "fadeSlideIn 0.45s ease-out both" }}>
        {sc.signals.map((s) => (
          <div key={s.label} className="flex items-center gap-2 rounded-[8px] bg-[#FAFAF9] px-2.5 py-1.5">
            <SigIcon state={s.state} />
            <span className="font-inter text-[11px] text-black/70">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function T1Pasarela() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRootRef = useRef<HTMLDivElement>(null);

  // Drive the full-screen stack-card scale/dim effect (3 alternating blocks).
  useFSStackCards(stackRootRef);

  // Scroll-triggered reveal — same pattern as ProductModal/Tienda landing
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
      {/* ── Hero — text left, checkout mock right ── */}
      <section
        className="relative overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24"
        style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)" }}
      >
        {/* Ambient red glow */}
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.15) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:min-h-[420px] tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            {/* Left — title + CTA */}
            <div>
              <h1
                className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]"
                style={{ lineHeight: 1.05, letterSpacing: "-1.7px", marginBottom: 22 }}
              >
                Aprueba más pagos y{" "}
                <span className="relative inline-block whitespace-nowrap">
                  vende más.
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Nuestro checkout convierte más, te protege de posibles fraudes y contracargos.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SIGNUP_URL}
                  className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
                >
                  Comenzar ahora
                </a>
              </div>
            </div>

            {/* Right — checkout panel (más angosto y un poco más alto) con la
                bolsa asomándose detrás y burbujas flotantes de métodos de pago. */}
            <div className="relative mx-auto flex w-full items-center justify-center" style={{ maxWidth: 560 }}>
              {/* Bolsa asomándose detrás del panel (arriba a la derecha) */}
              <div aria-hidden className="pointer-events-none absolute z-0" style={{ width: 300, right: -20, top: -78, transform: "rotate(6deg)" }}>
                <Image src="/img/bolsa-hero.png" alt="" width={803} height={831} className="h-auto w-full" style={{ filter: "drop-shadow(0 26px 54px rgba(0,0,0,0.45))" }} />
              </div>

              {/* Panel checkout */}
              <div className="relative z-[2] w-full" style={{ maxWidth: 460, transform: "scaleY(1.08)" }}>
                <CheckoutHeroScreen />
              </div>

              {/* Burbujas flotantes de métodos de pago (chip oscuro, logo claro) */}
              {[
                { src: "/img/logos/brands/visa.webp", left: "-3%", top: "-4%", dur: "7s", d: "0s" },
                { src: "/img/logos/brands/mastercard.webp", left: "-7%", top: "56%", dur: "8s", d: "0.6s" },
                { src: "/img/logos/brands/spei.webp", left: "13%", top: "90%", dur: "9s", d: "0.3s" },
                { src: "/img/logos/brands/amex.webp", left: "82%", top: "84%", dur: "7.5s", d: "0.4s" },
                { src: "/img/logos/brands/kueski.webp", left: "86%", top: "50%", dur: "8.5s", d: "0.8s" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="absolute z-[3] flex h-[54px] w-[62px] items-center justify-center rounded-[15px] border border-white/12 backdrop-blur-md"
                  style={{ left: b.left, top: b.top, background: "rgba(24,20,26,0.92)", boxShadow: "0 14px 30px rgba(0,0,0,0.4)", animation: `blobFloat ${b.dur} ease-in-out ${b.d} infinite` }}
                >
                  <Image src={b.src} alt="" width={80} height={56} className="h-[24px] w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2 — Antes vs Hoy compact transition ── */}
      <section className="relative overflow-hidden bg-white px-5 pt-10 pb-12 tablet:px-10 tablet:pt-14 tablet:pb-16" data-white-card>
        {/* toque sutil de rojo oscuro */}
        <div aria-hidden className="pointer-events-none absolute" style={{ top: "-14%", right: "-6%", width: 580, height: 580, borderRadius: "50%", background: "radial-gradient(circle, rgba(125,26,26,0.07) 0%, transparent 62%)", filter: "blur(30px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[760px] text-center" style={{ marginBottom: 56, animation: "fadeSlideIn 0.6s ease-out both" }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15 }}>
              Cada checkout abandonado es venta perdida.
            </h2>
          </div>

          <div data-modal-animate className="mx-auto grid max-w-[820px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { stat: "1 de 4", label: "compras se abandona en el checkout" },
              { stat: "12%", label: "de tarjetas se declinan en LATAM" },
              { stat: "70%", label: "prefiere pagar con métodos locales" },
            ].map((s, i) => (
              <div
                key={s.label}
                data-stagger
                className="rounded-[18px] border border-black/[0.06] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.04)]"
                style={{ ["--i" as string]: i }}
              >
                <p className="font-sora text-[36px] font-light text-black/80" style={{ letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>{s.stat}</p>
                <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.55 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 — Header for stack cards ── */}
      <section className="relative bg-white px-5 pt-12 pb-8 tablet:px-10 tablet:pt-16 tablet:pb-10">
        <div data-modal-animate className="mx-auto max-w-[760px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:whitespace-nowrap tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 16 }}>
            Diseñado para convertir más.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Cada detalle pensado para que más clientes terminen de comprar.
          </p>
        </div>
      </section>

      {/* ── Section 3b — 3 full-screen stack cards (panel + text alternating) ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — Métodos de pago (text left, panel right) — bg white, no shadow */}
        <div
          className="fs-stack-card"
          style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}
        >
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Todos los métodos de pago
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Tarjetas, transferencia, efectivo y wallets. Tu cliente paga como prefiera, tú cobras siempre desde un solo lugar.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Visa, Mastercard, AMEX y débito", "SPEI, transferencias y OXXO", "Meses sin intereses hasta 18 MSI"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <PaymentMethodsPanel />
            </div>
          </div>
        </div>

        {/* Block 3 — Antifraude (text left, panel right) — bg white */}
        <div
          className="fs-stack-card"
          style={{ top: 100, zIndex: 3, background: "#FFFFFF" }}
        >
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Antifraude inteligente
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Score de riesgo por transacción con T1 Score. Detiene fraude real sin bloquear clientes legítimos.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Análisis de +200 señales por transacción", "Decisión en menos de 100ms", "3D Secure cuando lo necesitas"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <AntifraudPanel />
            </div>
          </div>
        </div>
      </div>

      {/* ── Pago con T1 — express checkout button (dark) ── */}
      <section className="relative overflow-hidden px-5 py-[100px] tablet:px-10 tablet:py-[128px]" style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-[440px] w-[440px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.16) 0%, transparent 65%)", filter: "blur(50px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-2 tablet:gap-16">
            {/* Left — copy */}
            <div data-modal-animate>
              <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 16 }}>
                Compra en un toque
              </h2>
              <p className="font-inter text-[16px] font-light text-white/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 28, maxWidth: 480 }}>
                El botón de pago express de T1. Tus clientes guardan sus datos una sola vez y vuelven a comprar al instante en todo el ecosistema. Menos fricción, más conversión.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Guardan tarjeta y dirección una sola vez",
                  "Vuelven a pagar con un toque, sin teclear de nuevo",
                  "Funciona en cualquier negocio que use T1",
                ].map((it) => (
                  <li key={it} className="flex items-start gap-3 font-inter text-[15px] text-white/75">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="11" fill="rgba(219,59,43,0.22)" /><path d="M7 12.5L10.5 16L17 8.5" stroke="#FF7363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href={SIGNUP_URL}
                className="mt-8 inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
              >
                Activar Pago con T1
              </a>
            </div>

            {/* Right — animated Pago con T1 flow */}
            <div data-modal-animate className="relative mx-auto w-full" style={{ maxWidth: 560 }}>
              <PagoFlowScreen />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4 — Cómo funciona (4 steps) ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              De carrito a cobro, sin fricción
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cuatro pasos invisibles para tu cliente, optimizados detrás de cada compra.
            </p>
          </div>

          <div data-modal-animate className="relative grid grid-cols-1 gap-5 tablet:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div aria-hidden className="pointer-events-none absolute hidden lg:block" style={{ left: "12.5%", right: "12.5%", top: 30, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(219,59,43,0.25) 12%, rgba(219,59,43,0.25) 88%, transparent 100%)" }} />
            {[
              { n: "01", title: "Cliente paga", desc: "Elige método y completa el formulario optimizado para conversión." },
              { n: "02", title: "Antifraude evalúa", desc: "Score en menos de 100ms con +200 señales y machine learning." },
              { n: "03", title: "Routing inteligente", desc: "T1 dirige al procesador con mayor probabilidad de aprobación." },
              { n: "04", title: "Pago aprobado", desc: "Confirmación al cliente y al panel. Conciliación automática." },
            ].map((s, i) => (
              <div
                key={s.n}
                data-stagger
                className="tienda-card relative rounded-[18px] border border-black/[0.06] bg-white p-7"
                style={{ ["--i" as string]: i }}
              >
                <span className="font-sora text-[40px] font-light text-[#DB3B2B]" style={{ display: "block", marginTop: 28, marginBottom: 12, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {s.n}
                </span>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{s.title}</h3>
                <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5 — Lo que incluye (clean grid with icons) ── */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Todo incluido en tu checkout
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cada herramienta lista desde el primer cobro.
            </p>
          </div>

          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              {
                title: "3D Secure", desc: "Autenticación adicional cuando el riesgo lo amerita, sin romper conversión.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 6v6c0 5 3.5 8.5 9 10 5.5-1.5 9-5 9-10V6l-9-4z" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>),
              },
              {
                title: "Meses sin intereses", desc: "Hasta 18 MSI con todos los bancos sin comisión adicional.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#111827" strokeWidth="1.6" /><path d="M3 10h18 M7 15h2 M12 15h2 M17 15h0" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>),
              },
              {
                title: "Cobros recurrentes", desc: "Suscripciones, membresías y planes con tokenización segura.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 0 1 15-6.7L21 8 M21 12a9 9 0 0 1-15 6.7L3 16 M21 3v5h-5 M3 21v-5h5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>),
              },
              {
                title: "Conciliación automática", desc: "Cierra cuadres con tu banco sin pelear con hojas de cálculo.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><rect x="3" y="3" width="18" height="18" rx="2" stroke="#111827" strokeWidth="1.6" /></svg>),
              },
              {
                title: "Reportes en vivo", desc: "Aprobación, conversión y devoluciones en un dashboard claro.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 21h18" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /><rect x="5" y="12" width="3.5" height="7" rx="1" stroke="#111827" strokeWidth="1.6" /><rect x="10.5" y="8" width="3.5" height="11" rx="1" stroke="#111827" strokeWidth="1.6" /><rect x="16" y="4" width="3.5" height="15" rx="1" stroke="#111827" strokeWidth="1.6" /></svg>),
              },
              {
                title: "Disputas y contracargos", desc: "Gestiona reclamaciones desde el panel. Evidencia automática.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 9v4 M12 17h.01" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" /><path d="M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.39 0z" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /></svg>),
              },
            ].map((f, i) => (
              <div
                key={f.title}
                data-stagger
                className="tienda-card flex items-start gap-4 rounded-[16px] border border-black/[0.06] bg-white p-6"
                style={{ ["--i" as string]: i }}
              >
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-sora text-[16px] font-normal text-black" style={{ marginBottom: 4 }}>{f.title}</h3>
                  <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div data-modal-animate className="mt-12 flex justify-center">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
            >
              Crear mi pasarela
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 6 — Stats with count-up ── */}
      <section className="relative px-5 py-20 tablet:px-10 tablet:py-24" style={{ background: "linear-gradient(135deg, #1A0A0A 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[24px] font-light text-white tablet:text-[34px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Números que hablan por sí solos.
            </h2>
          </div>

          <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
            <div data-stagger style={{ ["--i" as string]: 0 }}>
              <CountStat end={90} prefix=">" suffix="%" label="aprobación promedio" />
            </div>
            <div data-stagger style={{ ["--i" as string]: 1 }}>
              <CountStat end={18} prefix="+" suffix="%" label="conversión con el botón T1 Pagos" />
            </div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <CountStat end={0.3} suffix="%" decimals={1} label="la menor tasa de fraude del mercado" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7 — FAQ (fondo oscuro) ── */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div data-modal-animate className="flex flex-col gap-3">
            {[
              { q: "¿Qué métodos de pago acepta T1?", a: "Tarjetas Visa, Mastercard, AMEX (crédito y débito), SPEI, OXXO, transferencia interbancaria, MSI hasta 18 meses y wallets." },
              { q: "¿Necesito un contrato con cada banco?", a: "No. T1 te conecta a múltiples procesadores con un solo contrato y enruta cada cobro al que más conviene." },
              { q: "¿Qué tan rápido recibo el dinero?", a: "Liquidación T+1 hábil para tarjetas. SPEI y transferencias en cuestión de minutos." },
              { q: "¿Cómo funciona el antifraude?", a: "Cada transacción pasa por T1 Score, que evalúa +200 señales y emite decisión en menos de 100ms sin afectar la experiencia." },
              { q: "¿Puedo integrarme a mi tienda actual?", a: "Sí. Ofrecemos plugin para Shopify, VTEX, Magento y WooCommerce, además de SDKs y API REST." },
            ].map((f, i) => (
              <details
                key={f.q}
                data-stagger
                className="group rounded-[14px] border border-white/[0.08] bg-white/[0.03] transition-all duration-200 open:border-[rgba(219,59,43,0.4)] open:bg-white/[0.05]"
                style={{ ["--i" as string]: i }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-white transition-colors duration-150 hover:text-[#FF6F5E]">
                  {f.q}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#FF6F5E]">
                    <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 font-inter text-[14px] font-light text-white/60" style={{ lineHeight: 1.65 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA — scroll-reveal pattern like the main T1 landing ── */}
      <T1FinalCTA
        title="¿Listo para vender más?"
        description="Activa tu pasarela en minutos. Empieza a cobrar con la tasa de aprobación más alta de México."
      />
    </div>
  );
}
