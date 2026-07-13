"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

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

/* ── Small count-up that re-animates whenever its value changes ── */
function AnimNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
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
  return <>{prefix}{disp.toLocaleString("en-US")}</>;
}

/* ── Block 1 panel — every payment method, highlight cycles across the grid ── */
type Tile = { kind: "img" | "more"; src?: string; h?: number; alt?: string };
const GRID_METHODS: Tile[] = [
  { kind: "img", src: "/img/icons/visa.svg", h: 14, alt: "Visa" },
  { kind: "img", src: "/img/icons/mastercard.svg", h: 20, alt: "Mastercard" },
  { kind: "img", src: "/img/icons/amex.svg", h: 18, alt: "Amex" },
  { kind: "img", src: "/img/icons/spei.svg", h: 13, alt: "SPEI" },
  { kind: "img", src: "/img/icons/kueski.svg", h: 14, alt: "Kueski" },
  { kind: "more" },
];

function Tile({ t }: { t: Tile }) {
  if (t.kind === "more") return <span className="font-inter text-[12px] font-medium text-black/45">+ más</span>;
  return <Image src={t.src!} alt={t.alt || ""} width={32} height={t.h} className="w-auto object-contain" style={{ height: t.h }} />;
}

function MethodsGridPanel() {
  const [hi, setHi] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHi((h) => (h + 1) % GRID_METHODS.length), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 16 }}>Métodos disponibles</p>
      <div className="grid grid-cols-3 gap-2.5">
        {GRID_METHODS.map((t, i) => {
          const active = hi === i;
          return (
            <div
              key={i}
              className="flex h-[64px] items-center justify-center rounded-[12px] border bg-[#FAFAF9]"
              style={{ borderColor: active ? "rgba(219,59,43,0.45)" : "rgba(0,0,0,0.06)", boxShadow: active ? "0 6px 16px rgba(219,59,43,0.12)" : "none", transform: `scale(${active ? 1.04 : 1})`, transition: `transform 0.4s ${EASE}, border-color 0.4s ease, box-shadow 0.4s ease` }}
            >
              <Tile t={t} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Block 2 panel — settlement: balance + incoming payments feed ── */
const BALANCES = [128540, 134920, 141380, 137650];
const PAYMENTS = [
  { amt: "+$1,345.99", method: "Visa •• 4242", time: "hace 1 min" },
  { amt: "+$890.00", method: "SPEI", time: "hace 3 min" },
  { amt: "+$2,150.50", method: "Mastercard •• 8821", time: "hace 6 min" },
  { amt: "+$430.00", method: "Transferencia", time: "hace 9 min" },
  { amt: "+$3,299.00", method: "Kueski Pay", time: "hace 12 min" },
  { amt: "+$1,720.00", method: "Amex •• 1007", time: "hace 15 min" },
];

function SettlementPanel() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), 2400);
    return () => clearInterval(id);
  }, []);
  const balance = BALANCES[step % BALANCES.length];
  const visible = [0, 1, 2].map((k) => (step + k) % PAYMENTS.length);
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <p className="font-inter text-[11px] text-black/45">Saldo disponible</p>
        <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#16A34A]">Liquidación T+1</span>
      </div>
      <p className="font-sora text-[30px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 18 }}>
        <AnimNumber value={balance} prefix="$" />
      </p>
      <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-black/40" style={{ marginBottom: 8 }}>Pagos recibidos</p>
      <div className="flex flex-col gap-2">
        {visible.map((pi) => {
          const p = PAYMENTS[pi];
          return (
            <div key={pi} className="flex items-center gap-3 rounded-[10px] border border-black/[0.05] bg-[#FAFAF9] px-3 py-2.5" style={{ animation: "fadeSlideIn 0.45s ease-out both" }}>
              <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[rgba(34,197,94,0.12)]">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <div className="flex-1 leading-tight">
                <p className="font-inter text-[12px] font-semibold text-black">{p.method}</p>
                <p className="font-inter text-[9px] text-black/45">{p.time}</p>
              </div>
              <span className="font-inter text-[12px] font-bold text-[#16A34A] tabular-nums">{p.amt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Block 3 panel — full simulated screens of each selling environment ── */
function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-black/[0.06] px-3 py-2">
      <span className="h-[6px] w-[6px] rounded-full bg-black/15" />
      <span className="h-[6px] w-[6px] rounded-full bg-black/15" />
      <span className="h-[6px] w-[6px] rounded-full bg-black/15" />
      <span className="ml-1 flex-1 truncate rounded-full bg-black/[0.05] px-2.5 py-1 font-inter text-[9px] text-black/40">{url}</span>
    </div>
  );
}

function CajaScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <BrowserBar url="origenmx.com/checkout" />
      <div className="flex flex-1 flex-col px-4 py-3">
        <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-black/40" style={{ marginBottom: 8 }}>Resumen del pedido</p>
        <div className="flex items-center gap-2.5">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-[#FAFAF9]"><Image src="/img/tenis-transparente.png" alt="" width={30} height={26} className="object-contain" /></div>
          <div className="flex-1 leading-tight"><p className="font-inter text-[12px] font-medium text-black">Tenis blancos clásicos</p><p className="font-inter text-[10px] text-black/50">Talla 26 · 1 pza</p></div>
          <span className="font-inter text-[12px] font-semibold text-black">$1,345.99</span>
        </div>
        <div className="my-3 border-t border-black/[0.06]" />
        <div className="flex items-center justify-between"><span className="font-inter text-[11px] text-black/50">Subtotal</span><span className="font-inter text-[11px] text-black/70">$1,345.99</span></div>
        <div className="mt-1 flex items-center justify-between"><span className="font-inter text-[11px] text-black/50">Envío</span><span className="font-inter text-[11px] text-[#16A34A]">Gratis</span></div>
        <div className="mt-2 flex items-center justify-between border-t border-black/[0.06] pt-2"><span className="font-inter text-[13px] font-semibold text-black">Total</span><span className="font-sora text-[16px] font-semibold text-black">$1,345.99</span></div>
        <div className="mt-auto flex h-[40px] items-center justify-center rounded-[10px] bg-[#2563EB] font-inter text-[13px] font-semibold text-white">Pagar $1,345.99</div>
      </div>
    </div>
  );
}

function LinkPagoScreen() {
  const [phase, setPhase] = useState(0); // 0 whatsapp (tap link) · 1 checkout
  useEffect(() => {
    if (phase >= 1) return;
    const t = setTimeout(() => setPhase(1), 1600);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === 0) {
    return (
      <div className="flex h-full flex-col" style={{ background: "#ECE5DD" }}>
        {/* WhatsApp header */}
        <div className="flex items-center gap-2 px-3" style={{ height: 46, background: "#075E54" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white/20 font-sora text-[12px] font-bold text-white">O</span>
          <div><p className="font-inter text-[12px] font-semibold leading-tight text-white">Origen MX</p><p className="font-inter text-[9px] leading-tight text-white/70">en línea</p></div>
        </div>
        {/* chat */}
        <div className="flex flex-1 flex-col justify-end gap-2 px-3 py-3">
          <div className="max-w-[82%] self-end rounded-[10px] rounded-tr-[3px] bg-[#DCF8C6] px-3 py-2" style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.08)", animation: "fadeSlideIn 0.35s ease-out both" }}>
            <p className="font-inter text-[11.5px] text-black/80">¡Hola! Aquí está tu link de pago 👇</p>
          </div>
          <div className="relative max-w-[86%] self-end rounded-[10px] rounded-tr-[3px] bg-[#DCF8C6] p-1.5" style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.08)", animation: "fadeSlideIn 0.35s ease-out 0.25s both" }}>
            <div className="rounded-[8px] border border-black/[0.06] bg-white p-2.5">
              <p className="font-sora text-[12px] font-semibold text-black">Anualidad 2025 · $999.00</p>
              <p className="mt-0.5 font-inter text-[10px] font-medium text-[#2563EB]">t1.mx/p/x9k2f</p>
            </div>
            <p className="mt-1 mr-1 text-right font-inter text-[8px] text-black/40">10:24 · ✓✓</p>
            {/* tap on the link */}
            <span className="pointer-events-none absolute" style={{ left: "50%", top: "48%" }}>
              <span className="absolute rounded-full" style={{ left: -18, top: -18, width: 36, height: 36, border: "2.5px solid rgba(219,59,43,0.85)", animation: "tapRipple 1.1s ease-out infinite" }} />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#111827" stroke="white" strokeWidth="1.4" strokeLinejoin="round" style={{ position: "absolute", left: 2, top: 2, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}><path d="M5 2.5l6 17.5 2.3-7.2L20.5 10.5z" /></svg>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // phase 1 — checkout
  return (
    <div className="flex h-full flex-col bg-white" style={{ animation: "fadeSlideIn 0.35s ease-out both" }}>
      <BrowserBar url="t1.mx/p/x9k2f" />
      <div className="flex flex-1 flex-col items-center px-4 py-3">
        <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#DB3B2B] font-sora text-[13px] font-bold text-white" style={{ marginBottom: 8 }}>O</span>
        <p className="font-inter text-[11px] text-black/50">Origen MX</p>
        <p className="font-inter text-[12px] font-medium text-black">Anualidad 2025</p>
        <p className="font-sora text-[30px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 4, marginBottom: 12 }}>$999.00</p>
        <div className="flex w-full items-center gap-2 rounded-[9px] border px-3 py-2" style={{ borderColor: "rgba(219,59,43,0.4)", marginBottom: "auto" }}>
          <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border border-[#DB3B2B]"><span className="h-[7px] w-[7px] rounded-full bg-[#DB3B2B]" /></span>
          <span className="flex-1 font-inter text-[11px] text-black/75">Visa ••4242</span>
          <img src="/img/icons/visa.svg" alt="" style={{ height: 13, width: "auto" }} />
        </div>
        <div className="mt-3 flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#2563EB] font-inter text-[13px] font-semibold text-white">Pagar ahora</div>
      </div>
    </div>
  );
}

function ExpressT1Screen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <BrowserBar url="origenmx.com/checkout" />
      <div className="flex flex-1 flex-col px-4 py-3">
        <div className="flex items-center justify-between"><span className="font-inter text-[11px] text-black/50">Total a pagar</span><span className="font-sora text-[16px] font-semibold text-black">$1,345.99</span></div>
        <div className="mt-3 flex h-[38px] items-center justify-center gap-2 rounded-[10px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="#fff" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" /></svg>
          Paga con T1
        </div>
        <div className="my-3 flex items-center gap-2"><span className="h-px flex-1 bg-black/[0.08]" /><span className="font-inter text-[9px] text-black/35">inicia sesión</span><span className="h-px flex-1 bg-black/[0.08]" /></div>
        <p className="font-inter text-[11px] font-semibold text-black" style={{ marginBottom: 6 }}>Continuar con T1</p>
        <div className="flex items-center rounded-[9px] border border-black/[0.10] px-3" style={{ height: 34, marginBottom: 8 }}><span className="font-inter text-[11px] text-black/55">ana.lopez@correo.com</span></div>
        <div className="mt-auto flex h-[38px] items-center justify-center rounded-[10px] bg-[#2563EB] font-inter text-[13px] font-semibold text-white">Continuar</div>
      </div>
    </div>
  );
}

const ENVS = [
  { name: "Caja", amt: "+$1,345", render: <CajaScreen /> },
  { name: "Link de pago", amt: "+$999", render: <LinkPagoScreen /> },
  { name: "Paga con T1", amt: "+$1,346", render: <ExpressT1Screen /> },
];

function ChannelsPanel() {
  const [hi, setHi] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHi((h) => (h + 1) % ENVS.length), 4600);
    return () => clearInterval(id);
  }, []);
  const e = ENVS[hi];
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 320 }}>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {ENVS.map((x, i) => {
          const on = hi === i;
          return (
            <button key={x.name} onClick={() => setHi(i)} className="rounded-full px-3.5 py-1.5 font-inter text-[12px] font-medium transition-all duration-200" style={{ background: on ? "#DB3B2B" : "rgba(255,255,255,0.06)", color: on ? "#fff" : "rgba(0,0,0,0.55)", border: on ? "1px solid #DB3B2B" : "1px solid rgba(0,0,0,0.1)", cursor: "pointer" }}>
              {x.name}
            </button>
          );
        })}
      </div>
      {/* real simulated screen (browser window) */}
      <div className="overflow-hidden rounded-[14px] bg-white" style={{ height: 360, boxShadow: "0 20px 55px rgba(0,0,0,0.14)" }}>
        <div key={hi} className="h-full" style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>{e.render}</div>
      </div>
    </div>
  );
}

/* ── Hero — Stripe-style layered flow: checkout (client) → T1 Score → your dashboard ── */
function HeroScaledMock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const W = 520;
  const H = 430;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: "100%", aspectRatio: `${W} / ${H}`, position: "relative" }}>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute", top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
}

function PaymentFlowHero() {
  const [phase, setPhase] = useState(0); // 0 pay · 1 chip appears · 2 chip moves (loading) · 3 TYP (last point)
  useEffect(() => {
    const durs = [1700, 1400, 1400, 2400];
    const id = setTimeout(() => setPhase((p) => (p + 1) % 4), durs[phase]);
    return () => clearTimeout(id);
  }, [phase]);
  const typ = phase >= 3; // thank-you page shown
  const arrived = phase >= 3; // dashboard updates
  const loadingBtn = phase === 1 || phase === 2; // checkout button "Procesando…"
  const chipVisible = phase >= 1 && phase <= 3;
  const chipUp = phase >= 3; // last point (approved)
  // three timed positions along the dotted path
  const chip = [{ x: 58, y: 114 }, { x: 58, y: 114 }, { x: 108, y: 60 }, { x: 150, y: 22 }][phase];
  const captions = ["Tu cliente paga en el checkout", "Analizando con T1 Score…", "Analizando con T1 Score…", "¡Compra confirmada!"];
  return (
    <div>
      <HeroScaledMock>
        {/* dotted path client → score → your panel */}
        <svg width="520" height="430" viewBox="0 0 520 430" fill="none" style={{ position: "absolute", inset: 0 }}>
          <path d="M108 128 C 108 78, 150 55, 200 35" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="2 5" strokeLinecap="round" />
          {[{ cx: 108, cy: 128 }, { cx: 158, cy: 73 }, { cx: 200, cy: 35 }].map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r="4" fill={phase - 1 === i && chipVisible ? "#fff" : "rgba(255,255,255,0.35)"} stroke={phase - 1 === i ? "rgba(255,255,255,0.9)" : "none"} strokeWidth="2" />
          ))}
        </svg>

        {/* Dashboard — YOUR side (back layer) */}
        <div style={{ position: "absolute", left: 196, top: 20, width: 320, height: 344 }} className="overflow-hidden rounded-[16px] bg-white" >
          <div className="flex h-[44px] items-center justify-between border-b border-black/[0.06] px-4">
            <span className="font-sora text-[13px] font-semibold text-black">Tu panel · T1 Pagos</span>
            <span className="flex items-center gap-1 rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[9px] font-bold text-[#16A34A]"><span className="h-[5px] w-[5px] rounded-full bg-[#16A34A]" />En vivo</span>
          </div>
          <div className="px-4 pt-3">
            <p className="font-inter text-[10px] text-black/45">Saldo disponible</p>
            <p className="font-sora text-[26px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}>$<AnimNumber value={arrived ? 129886 : 128540} /><span className="text-[12px] text-black/45">.99</span></p>
            <span className="mt-1 inline-block rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[9px] font-bold text-[#16A34A]">Liquidación T+1</span>
            <p className="mt-3 font-inter text-[9px] font-semibold uppercase tracking-wider text-black/40">Pagos recientes</p>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {arrived && (
                <div key="new" className="flex items-center gap-2 rounded-[9px] border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.06)] px-2.5 py-1.5" style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
                  <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[rgba(34,197,94,0.14)]"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  <span className="flex-1 font-inter text-[10px] font-semibold text-black">Pago recibido · Visa ••4242</span>
                  <span className="font-inter text-[10px] font-bold text-[#16A34A]">+$1,345.99</span>
                </div>
              )}
              {[{ n: "SPEI · transferencia", a: "+$890.00" }, { n: "Mastercard ••8821", a: "+$2,150.50" }].map((r) => (
                <div key={r.n} className="flex items-center gap-2 rounded-[9px] bg-[#FAFAF9] px-2.5 py-1.5">
                  <span className="h-[6px] w-[6px] rounded-full bg-black/20" />
                  <span className="flex-1 font-inter text-[10px] text-black/65">{r.n}</span>
                  <span className="font-inter text-[10px] font-semibold text-black/70">{r.a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checkout — CLIENT side (front layer) */}
        <div style={{ position: "absolute", left: 2, top: 152, width: 234, height: 262 }} className="overflow-hidden rounded-[16px] bg-white" >
          <div className="flex h-[40px] items-center gap-2 border-b border-black/[0.06] px-3.5">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#DB3B2B] font-sora text-[9px] font-bold text-white">O</span>
            <span className="font-sora text-[12px] font-semibold text-black">Origen MX</span>
            <span className="ml-auto font-inter text-[9px] text-black/40">Checkout</span>
          </div>
          {typ ? (
            <div key="typ" className="flex h-[222px] flex-col items-center justify-center px-4" style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
              <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#16A34A]" style={{ marginBottom: 12 }}>
                <svg width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <p className="font-sora text-[15px] font-semibold text-black">¡Gracias por tu compra!</p>
              <p className="font-inter text-[10px] text-black/50" style={{ marginTop: 3, marginBottom: 12 }}>Tu pedido está confirmado.</p>
              <div className="w-full border-t border-black/[0.06]" style={{ paddingTop: 8 }}>
                <div className="flex items-center justify-between py-1"><span className="font-inter text-[10px] text-black/45">Pedido</span><span className="font-inter text-[11px] font-semibold text-black">#9803890</span></div>
                <div className="flex items-center justify-between py-1"><span className="font-inter text-[10px] text-black/45">Total</span><span className="font-inter text-[11px] font-semibold text-black">$1,345.99</span></div>
              </div>
            </div>
          ) : (
            <div key="pay" className="flex h-[222px] flex-col px-3.5 py-3">
              <p className="text-center font-inter text-[10px] text-black/45">Total a pagar</p>
              <p className="text-center font-sora text-[28px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1, marginTop: 3 }}>$1,345.99</p>
              <p className="text-center font-inter text-[10px] text-black/50" style={{ marginTop: 4, marginBottom: 12 }}>Tenis blancos clásicos</p>
              <div className="flex items-center gap-2 rounded-[9px] border px-2.5 py-2" style={{ borderColor: "rgba(219,59,43,0.4)", marginBottom: "auto" }}>
                <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border border-[#DB3B2B]"><span className="h-[7px] w-[7px] rounded-full bg-[#DB3B2B]" /></span>
                <span className="flex-1 font-inter text-[11px] text-black/75">Visa ••4242</span>
                <img src="/img/icons/visa.svg" alt="" style={{ height: 13, width: "auto" }} />
              </div>
              {loadingBtn ? (
                <div className="mt-2 flex h-[40px] items-center justify-center gap-2 rounded-[10px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">
                  <span className="h-[15px] w-[15px] rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Procesando…
                </div>
              ) : (
                <div className="relative mt-2 flex h-[40px] items-center justify-center rounded-[10px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">
                  Pagar ahora
                  <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.5)", animation: "tapRipple 0.9s ease-out infinite" }} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* traveling amount chip — appears at Score (middle), moves up, then fades */}
        <div style={{ position: "absolute", left: chip.x, top: chip.y, opacity: chipVisible ? 1 : 0, transition: `left 0.7s ${EASE}, top 0.7s ${EASE}, opacity 0.4s ease` }}>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5" style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.28)" }}>
            {chipUp ? (
              <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#16A34A]"><svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            ) : (
              <span className="h-[13px] w-[13px] rounded-full border-2 border-[rgba(219,59,43,0.3)] border-t-[#DB3B2B] animate-spin" />
            )}
            <span className="font-sora text-[12px] font-bold text-black">$1,345.99</span>
            <span className="font-inter text-[10px] font-semibold" style={{ color: chipUp ? "#16A34A" : "#B45309" }}>· {chipUp ? "Aprobado" : "Analizando"}</span>
          </div>
        </div>
      </HeroScaledMock>

      <p className="mt-5 text-center font-inter text-[14px] font-light text-white/70" style={{ minHeight: 22, transition: "opacity 0.3s ease" }}>{captions[phase]}</p>
    </div>
  );
}

export default function T1PagosEnLinea() {
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
          <div className="grid grid-cols-1 items-center gap-10 tablet:min-h-[420px] tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]" style={{ lineHeight: 1.05, letterSpacing: "-1.7px", marginBottom: 22 }}>
                Cobra en línea como tu negocio{" "}
                <span className="relative inline-block">
                  merece
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
                .
              </h1>
              <p className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 460 }}>
                Acepta tarjetas, transferencias y efectivo en tu checkout. Más aprobación, tu dinero rápido y todo en un panel.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Comenzar ahora
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full" style={{ maxWidth: 480 }}>
              <PaymentFlowHero />
            </div>
          </div>
        </div>
      </section>

      {/* ── Métricas / problema ── */}
      <section className="relative bg-white px-5 pt-10 pb-12 tablet:px-10 tablet:pt-14 tablet:pb-16" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48, animation: "fadeSlideIn 0.6s ease-out both" }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15 }}>
              Un pago perdido es una venta perdida.
            </h2>
          </div>
          <div data-modal-animate className="mx-auto grid max-w-[820px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { stat: "1 de 4", label: "carritos se abandona en el pago" },
              { stat: "+12%", label: "de conversión al ofrecer más métodos" },
              { stat: "70%", label: "prefiere pagar con métodos locales" },
            ].map((m, i) => (
              <div key={m.label} data-stagger className="rounded-[18px] border border-black/[0.06] bg-white p-7 text-center" style={{ ["--i" as string]: i, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <p className="font-sora text-[34px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>{m.stat}</p>
                <p className="font-inter text-[14px] font-light text-black/60" style={{ lineHeight: 1.5 }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack cards intro ── */}
      <section className="relative bg-white px-5 pt-12 pb-8 tablet:px-10 tablet:pt-16 tablet:pb-10">
        <div data-modal-animate className="mx-auto max-w-[760px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.4px", lineHeight: 1.1, marginBottom: 16 }}>
            Cobrar en línea, de principio a fin.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Del checkout a tu cuenta, con cada método y cada canal en un solo lugar.
          </p>
        </div>
      </section>

      {/* ── Stack cards ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — métodos (text left, panel right) */}
        <div className="fs-stack-card" style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Todos los métodos de pago
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Tarjetas, transferencias, efectivo y wallets. Tu cliente paga como prefiera y tú cobras siempre desde un solo lugar.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Visa, Mastercard, AMEX y débito", "SPEI y transferencias", "Kueski y meses sin intereses"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <MethodsGridPanel />
            </div>
          </div>
        </div>

        {/* Block 2 — liquidación (panel left, text right) */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#FBFBFB" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div className="order-2 tablet:order-1">
                <SettlementPanel />
              </div>
              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Tu dinero, rápido y claro
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Liquidación T+1 para tarjetas y minutos para transferencias. Cada pago entra a tu saldo con su detalle, listo para conciliar.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Liquidación T+1 en tarjetas", "SPEI acreditado en minutos", "Cada pago con su detalle y comprobante"].map((it) => (
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

        {/* Block 3 — canales (text left, panel right) */}
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Cobra desde donde vendas
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Tu tienda en línea, tu app, un link de pago o el checkout express Paga con T1. Todos tus cobros, en una sola cuenta.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Una integración para todos tus canales", "Crea links de pago en segundos", "Un solo panel para todos tus cobros"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <ChannelsPanel />
            </div>
          </div>
        </div>
      </div>

      {/* ── Cómo funciona ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Empieza a cobrar en cuatro pasos
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              De la integración al primer cobro, sin vueltas.
            </p>
          </div>
          <div data-modal-animate className="relative grid grid-cols-1 gap-5 tablet:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div aria-hidden className="pointer-events-none absolute hidden lg:block" style={{ left: "12.5%", right: "12.5%", top: 30, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(219,59,43,0.25) 12%, rgba(219,59,43,0.25) 88%, transparent 100%)" }} />
            {[
              { n: "01", title: "Integra en minutos", desc: "Plugin para tu plataforma o nuestra API y SDKs. Sin desarrollos largos." },
              { n: "02", title: "Tu cliente paga", desc: "Checkout optimizado con todos los métodos en una sola pantalla." },
              { n: "03", title: "Validamos y aprobamos", desc: "Antifraude y enrutamiento llevan cada pago a su mayor aprobación." },
              { n: "04", title: "Recibes tu dinero", desc: "Liquidación T+1 a tu cuenta, con todo conciliado en tu panel." },
            ].map((s, i) => (
              <div key={s.n} data-stagger className="tienda-card relative rounded-[18px] border border-black/[0.06] bg-white p-7" style={{ ["--i" as string]: i }}>
                <span className="font-sora text-[40px] font-light text-[#DB3B2B]" style={{ display: "block", marginTop: 28, marginBottom: 12, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.n}</span>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{s.title}</h3>
                <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
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
              Cobra con todo a favor
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cada herramienta lista desde el primer pago.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              { title: "Más de 10 métodos", desc: "Tarjetas, SPEI, transferencias, wallets y compra ahora paga después.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#111827" strokeWidth="1.6" /><path d="M3 10h18" stroke="#111827" strokeWidth="1.6" /></svg>) },
              { title: "Meses sin intereses", desc: "Hasta 18 MSI con todos los bancos, sin comisión extra.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#111827" strokeWidth="1.6" /><path d="M7 15h2 M12 15h2 M17 15h0" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Pagos recurrentes", desc: "Suscripciones y membresías con tokenización segura.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 0 1 15-6.7L21 8 M21 12a9 9 0 0 1-15 6.7L3 16 M21 3v5h-5 M3 21v-5h5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "3D Secure", desc: "Autenticación adicional cuando el riesgo lo amerita.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 6v6c0 5 3.5 8.5 9 10 5.5-1.5 9-5 9-10V6l-9-4z" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Links de pago", desc: "Cobra compartiendo un enlace por WhatsApp o redes.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Dashboard en vivo", desc: "Aprobación, conversión y liquidaciones en tiempo real.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 21h18" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /><rect x="5" y="12" width="3.5" height="7" rx="1" stroke="#111827" strokeWidth="1.6" /><rect x="10.5" y="8" width="3.5" height="11" rx="1" stroke="#111827" strokeWidth="1.6" /><rect x="16" y="4" width="3.5" height="15" rx="1" stroke="#111827" strokeWidth="1.6" /></svg>) },
              { title: "Plugins y API", desc: "Shopify, WooCommerce, VTEX y Magento, además de API REST.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16 18l6-6-6-6 M8 6l-6 6 6 6" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Antifraude T1 Score", desc: "Cada transacción evaluada en menos de 100ms.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 6v6c0 5 3.5 8.5 9 10 5.5-1.5 9-5 9-10V6l-9-4z" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /></svg>) },
              { title: "Conciliación automática", desc: "Cierra cuadres con tu banco sin hojas de cálculo.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><rect x="3" y="3" width="18" height="18" rx="2" stroke="#111827" strokeWidth="1.6" /></svg>) },
            ].map((f, i) => (
              <div key={f.title} data-stagger className="tienda-card flex items-start gap-4 rounded-[16px] border border-black/[0.06] bg-white p-6" style={{ ["--i" as string]: i }}>
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">{f.icon}</div>
                <div>
                  <h3 className="font-sora text-[16px] font-normal text-black" style={{ marginBottom: 4 }}>{f.title}</h3>
                  <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div data-modal-animate className="mt-12 flex justify-center">
            <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
              Empezar a cobrar
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative px-5 py-20 tablet:px-10 tablet:py-24" style={{ background: "linear-gradient(135deg, #1A0A0A 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[24px] font-light text-white tablet:text-[34px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Números que hablan por sí solos.
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
            <div data-stagger style={{ ["--i" as string]: 0 }}><CountStat end={90} prefix=">" suffix="%" label="aprobación promedio" /></div>
            <div data-stagger style={{ ["--i" as string]: 1 }}><CountStat end={0.3} suffix="%" decimals={1} label="la menor tasa de fraude del mercado" /></div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>T+1</p>
              <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">liquidación a tu cuenta</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>Preguntas frecuentes</h2>
          </div>
          <div data-modal-animate className="flex flex-col gap-3">
            {[
              { q: "¿Qué métodos de pago puedo aceptar?", a: "Tarjetas Visa, Mastercard y AMEX (crédito y débito), SPEI, transferencias, Kueski y meses sin intereses hasta 18 meses." },
              { q: "¿Cuánto tarda en llegar mi dinero?", a: "Liquidación T+1 hábil para tarjetas. SPEI y transferencias se acreditan en cuestión de minutos." },
              { q: "¿Cómo me integro?", a: "Con plugin para Shopify, WooCommerce, VTEX y Magento, o con nuestra API REST y SDKs. La mayoría empieza a cobrar el mismo día." },
              { q: "¿Necesito contrato con cada banco?", a: "No. Con un solo contrato T1 te conecta a múltiples procesadores y enruta cada cobro al de mayor aprobación." },
              { q: "¿Es seguro?", a: "Sí. Cumplimos PCI DSS, tokenizamos los datos y cada transacción pasa por antifraude T1 Score en menos de 100ms." },
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
        title="¿Listo para cobrar en línea?"
        description="Activa T1 Pagos y empieza a aceptar todos los métodos desde tu checkout hoy."
      />
    </div>
  );
}
