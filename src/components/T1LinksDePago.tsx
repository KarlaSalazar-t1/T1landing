"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const LINK_URL = "t1.mx/p/x9k2f";
const CONCEPT = "Tenis blancos clásicos";
const AMOUNT = "$1,345.99";

/* ── Animated count stat (white-on-dark) ── */
function CountStat({ end, prefix = "", suffix = "", label, decimals = 0 }: { end: number; prefix?: string; suffix?: string; label: string; decimals?: number }) {
  const { ref, display } = useCountUp({ end, prefix, suffix, decimals, duration: 1800 });
  return (
    <div ref={ref}>
      <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>{display}</p>
      <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">{label}</p>
    </div>
  );
}

/* ── Count-up that re-animates when value changes ── */
function AnimNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [disp, setDisp] = useState(0);
  const fromRef = useRef(0);
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

/* ── Hero — sequenced flow: create link → share on WhatsApp → client pays → received ── */
function LinkHeroCard() {
  // 0 form · 1 link created · 2 sent via WhatsApp · 3 client paid · 4 payment received
  const [step, setStep] = useState(0);
  useEffect(() => {
    const durs = [2000, 1700, 1700, 1700, 2400];
    const id = setTimeout(() => setStep((s) => (s + 1) % 5), durs[step]);
    return () => clearTimeout(id);
  }, [step]);
  const created = step >= 1;
  return (
    <div className="relative mr-auto w-full" style={{ maxWidth: 380 }}>
      <div className="rounded-[22px]" style={{ padding: 12, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 70px rgba(0,0,0,0.4)" }}>
        <div className="overflow-hidden rounded-[16px] bg-white">
          <div className="flex items-center justify-between border-b border-black/[0.06] px-4 h-[48px]">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="font-sora text-[13px] font-semibold text-black">Crear link de pago</span>
            </div>
            {!created && <span className="rounded-[8px] border border-black/[0.12] px-2.5 py-1 font-inter text-[10px] text-black/55">Vista previa</span>}
          </div>
          <div style={{ height: 400, overflow: "hidden" }}>
            <div key={created ? "ok" : "form"} className="h-full px-4 py-4" style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
              {created ? <SuccessScreen path={1} tapShare={step === 1} /> : <ProductoScreen />}
            </div>
          </div>
        </div>
      </div>

      {/* floating WhatsApp mini-conversation (appears in sequence) */}
      <div className="absolute hidden tablet:flex flex-col gap-2" style={{ right: -120, bottom: 36, width: 244 }}>
        {step >= 2 && (
          <div key="sent" className="max-w-[224px] self-end rounded-[14px] rounded-br-[3px] bg-[#DCF8C6] p-1.5" style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.22)", animation: "fadeSlideIn 0.5s ease-out both" }}>
            {/* message line first */}
            <p className="px-1.5 pt-0.5 pb-2 font-inter text-[12px] text-black/80">¡Aquí está tu link de pago! 👇</p>
            {/* WhatsApp-style link preview with photo */}
            <div className="overflow-hidden rounded-[10px] bg-white">
              <div className="flex items-center justify-center bg-[#FAFAF9]" style={{ height: 78 }}>
                <Image src="/img/tenis-transparente.png" alt="" width={110} height={66} className="object-contain" />
              </div>
              <div className="px-2.5 py-2">
                <p className="font-inter text-[11px] font-semibold text-black">Tenis blancos clásicos +1 más</p>
                <p className="font-sora text-[13px] font-medium text-black">$2,235.99</p>
                <p className="mt-0.5 truncate font-inter text-[9px] text-black/40">{LINK_URL}</p>
              </div>
            </div>
            <p className="flex items-center justify-end gap-1 px-1.5 pt-1 font-inter text-[8px] text-black/35">10:24
              <svg width="12" height="9" viewBox="0 0 16 11" fill="none"><path d="M1 6l3 3 6-7 M6 9l6-7" stroke="#34B7F1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </p>
          </div>
        )}
        {step >= 3 && (
          <div key="paidmsg" className="max-w-[190px] self-start rounded-[14px] rounded-bl-[3px] bg-white px-3.5 py-2.5" style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.2)", animation: "fadeSlideIn 0.5s ease-out both" }}>
            <p className="font-inter text-[12px] text-black/80">¡Listo, ya pagué! 🎉</p>
            <p className="mt-0.5 text-right font-inter text-[8px] text-black/35">10:25</p>
          </div>
        )}
      </div>
      {step >= 4 && (
        <div key="received" className="absolute hidden tablet:flex items-center gap-2 rounded-full bg-white px-3 py-2" style={{ left: -16, top: 44, boxShadow: "0 12px 30px rgba(0,0,0,0.2)", animation: "fadeSlideIn 0.5s ease-out both" }}>
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#16A34A]">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span className="font-inter text-[11px] font-bold text-black">Pago recibido · $2,235.99</span>
        </div>
      )}
    </div>
  );
}

/* ── Types an amount digit-by-digit (like keypad entry), with a caret ── */
function TypedAmount({ value }: { value: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= value.length) clearInterval(id);
    }, 170);
    return () => clearInterval(id);
  }, [value]);
  const done = n >= value.length;
  return (
    <>
      {value.slice(0, n)}
      <span style={{ opacity: done ? 0 : 1, fontWeight: 200 }}>|</span>
    </>
  );
}

/* ── Block 1 panel — animates the real create-link flow (monto / productos) ── */
const FLOW_PRODUCTS = [
  { name: "Tenis blancos clásicos", price: "$1,345.99", img: "/img/tenis-transparente.png" },
  { name: "Playera polo mujer", price: "$890.00", img: "/img/moda-playera.png" },
];

function MethodChips() {
  return (
    <div className="flex items-center gap-1.5">
      <Image src="/img/icons/visa.svg" alt="" width={24} height={12} className="h-[11px] w-auto" />
      <Image src="/img/icons/mastercard.svg" alt="" width={16} height={12} className="h-[14px] w-auto" />
      <Image src="/img/icons/amex.svg" alt="" width={16} height={12} className="h-[11px] w-auto" />
      <span className="font-sora text-[8px] font-extrabold tracking-tight text-[#E10E0E]">carnet</span>
    </div>
  );
}

function MontoScreen() {
  return (
    <div className="flex h-full flex-col">
      <p className="font-inter text-[12px] font-semibold text-black" style={{ marginBottom: 8 }}>Monto y concepto</p>
      <p className="text-center font-sora text-[38px] font-light text-black tabular-nums" style={{ letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 18 }}>$<TypedAmount value="800.00" /></p>
      <p className="font-inter text-[10px] text-black/45" style={{ marginBottom: 4 }}>Concepto de pago</p>
      <div className="flex items-center rounded-[8px] border border-black/[0.10] px-3" style={{ height: 36, marginBottom: 14 }}>
        <span className="font-inter text-[12px] text-black/70">Anualidad 2025</span>
      </div>
      <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-black/40" style={{ marginBottom: 8 }}>Métodos aceptados</p>
      <div className="flex items-center gap-2 rounded-[8px] border border-black/[0.08] px-3 py-2.5" style={{ marginBottom: "auto" }}>
        <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[4px] bg-[#DB3B2B]"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <span className="flex-1 font-inter text-[11px] text-black/70">Tarjetas de crédito o débito</span>
        <MethodChips />
      </div>
      <div className="mt-3 flex h-[40px] items-center justify-center rounded-[10px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">Continuar</div>
    </div>
  );
}

const CATALOG = [
  { name: "Sudadera hoodie premium", price: "$1,345.99", stock: "102 disponibles", img: "/img/moda-hoodie.png" },
  { name: "Playera polo mujer", price: "$890.00 – $1,120.00", stock: "4 variantes", img: "/img/moda-playera.png" },
  { name: "Sneakers urbanos", price: "$2,190.00", stock: "2 disponibles", stockRed: true, img: "/img/moda-sneaker.png" },
  { name: "Pantalón cargo", price: "$1,290.00", stock: "Agotado", agotado: true, img: "/img/moda-pantalon.png" },
];

/* Config screen (only for the steps panel): summary + payment methods */
function ProductoConfig() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-between" style={{ marginBottom: 10 }}>
        <span className="font-inter text-[13px] font-semibold text-black">2 productos</span>
        <span className="font-sora text-[15px] font-medium text-black">$2,235.99</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex flex-col gap-2">
          {FLOW_PRODUCTS.map((p, i) => (
            <div key={p.name} className="flex items-center gap-2.5">
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-[#FAFAF9]"><Image src={p.img} alt="" width={26} height={22} className="object-contain" /></div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate font-inter text-[11px] font-medium text-black">{p.name}</p>
                <p className="font-inter text-[10px] text-black/55">{p.price} · {i === 0 ? "1" : "2"} u.</p>
              </div>
              <span className="font-inter text-[10px] font-medium text-black/45">Eliminar</span>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex h-[32px] shrink-0 items-center justify-center rounded-[8px] border border-black/[0.12] font-inter text-[11px] text-black/60">Agregar producto</div>
        <p className="mt-3 shrink-0 font-inter text-[10px] font-semibold uppercase tracking-wider text-black/40" style={{ marginBottom: 6 }}>Métodos de pago aceptados</p>
        <div className="shrink-0 overflow-hidden rounded-[10px] border border-black/[0.08]">
          <div className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2">
            <span className="flex h-[15px] w-[15px] items-center justify-center rounded-[4px] bg-[#DB3B2B]"><svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            <span className="flex-1 font-inter text-[11px] text-black/70">Tarjetas de crédito o débito</span>
            <MethodChips />
          </div>
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="h-[15px] w-[15px] rounded-[4px] border border-black/25" />
            <span className="flex-1 font-inter text-[11px] text-black/55">Transferencia bancaria</span>
            <Image src="/img/icons/spei.svg" alt="" width={26} height={11} className="h-[11px] w-auto" />
          </div>
        </div>
      </div>
      <div className="mt-3 flex h-[42px] shrink-0 items-center justify-center rounded-[10px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">Crear link de pago</div>
    </div>
  );
}

function ProductoScreen({ full = false }: { full?: boolean }) {
  const [count, setCount] = useState(0); // products added to "cart"
  const [stage, setStage] = useState(0); // 0 list · 1 config (full only)
  useEffect(() => {
    setCount(0);
    setStage(0);
    const t1 = setTimeout(() => setCount(1), 800);
    const t2 = setTimeout(() => setCount(2), 1500);
    const t3 = full ? setTimeout(() => setStage(1), 2700) : null;
    return () => { clearTimeout(t1); clearTimeout(t2); if (t3) clearTimeout(t3); };
  }, [full]);
  if (full && stage === 1) return <ProductoConfig />;
  return (
    <div className="flex h-full flex-col">
      <p className="shrink-0 font-inter text-[12px] font-semibold text-black" style={{ marginBottom: 8 }}>Selecciona o crea tus productos</p>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {CATALOG.map((p, i) => {
          const added = i < count && !p.agotado;
          return (
            <div key={p.name} className="flex items-center gap-2.5 border-b border-black/[0.05] py-2" style={{ opacity: p.agotado ? 0.5 : 1 }}>
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-[#FAFAF9]">
                <Image src={p.img} alt="" width={26} height={22} className="object-contain" />
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate font-inter text-[11.5px] font-medium text-black">{p.name}</p>
                <p className="font-inter text-[11px] text-black/70">{p.price}</p>
                {p.agotado ? (
                  <span className="mt-0.5 inline-block rounded-[5px] bg-[rgba(239,68,68,0.10)] px-1.5 py-0.5 font-inter text-[8px] font-bold text-[#DC2626]">Agotado</span>
                ) : (
                  <p className="font-inter text-[9px]" style={{ color: p.stockRed ? "#DC2626" : "rgba(0,0,0,0.4)" }}>{p.stock}</p>
                )}
              </div>
              {!p.agotado && (
                <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full transition-all duration-300" style={{ background: added ? "#16A34A" : "transparent", border: added ? "none" : "1.5px solid #DB3B2B" }}>
                  {added ? (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#DB3B2B" strokeWidth="2.2" strokeLinecap="round" /></svg>
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {/* fixed-height slot, always visible below the list */}
      <div className="shrink-0" style={{ height: 48, marginTop: 10 }}>
        {count > 0 && (
          <div key={count} className="flex h-[40px] items-center justify-center gap-1.5 rounded-[10px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white" style={{ animation: "fadeSlideIn 0.35s ease-out both" }}>
            Continuar con {count} {count === 1 ? "producto" : "productos"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        )}
      </div>
    </div>
  );
}

function SuccessScreen({ path, tapShare = false }: { path: number; tapShare?: boolean }) {
  return (
    <div className="flex h-full flex-col items-center">
      <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#16A34A]" style={{ marginBottom: 10 }}>
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <p className="font-sora text-[15px] font-semibold text-black" style={{ marginBottom: 14 }}>¡Link creado con éxito!</p>
      <div className="w-full rounded-[12px] border border-black/[0.08] p-3.5">
        {path === 1 && (
          <div className="flex items-center justify-center gap-2" style={{ marginBottom: 8 }}>
            {FLOW_PRODUCTS.map((p) => (
              <div key={p.name} className="flex h-[34px] w-[34px] items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.06] bg-[#FAFAF9]">
                <Image src={p.img} alt="" width={26} height={22} className="object-contain" />
              </div>
            ))}
          </div>
        )}
        <p className="text-center font-sora text-[24px] font-light text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 12 }}>
          {path === 1 ? "$2,235.99" : "$800.00"} <span className="text-[13px] text-black/45">MXN</span>
        </p>
        <div className="flex items-center rounded-[8px] border border-black/[0.10] bg-[#FAFAF9] px-3 py-2" style={{ marginBottom: 8 }}>
          <span className="flex-1 truncate font-inter text-[10px] text-black/55">{LINK_URL}</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 rounded-[8px] border border-black/[0.12] py-2" style={{ marginBottom: 8 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2" stroke="#374151" strokeWidth="1.6" /><path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="#374151" strokeWidth="1.6" /></svg>
          <span className="font-inter text-[11px] font-medium text-black/70">Copiar link</span>
        </div>
        <div className="relative flex items-center justify-center gap-1.5 rounded-[8px] py-2.5" style={{ background: "#25D366", transform: tapShare ? "scale(0.97)" : "scale(1)", transition: "transform 0.2s ease" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zm0 2a7 7 0 0 1 0 14 7 7 0 0 1-3.6-1l-.3-.2-2.1.6.6-2-.2-.3A7 7 0 0 1 12 5zm3.5 8.4c-.2-.1-1.1-.6-1.3-.6-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.2-.4.1a5.6 5.6 0 0 1-2.7-2.4c-.2-.3.2-.3.5-1 .1-.1 0-.3 0-.4l-.6-1.4c-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.4.1-.5.3-.6.6-.7 1.4-.3 2.3a8 8 0 0 0 3.4 3.6c1.2.6 1.8.5 2.4.4.4 0 1.1-.5 1.2-.9.2-.4.2-.8.1-.9z" /></svg>
          <span className="font-inter text-[11px] font-semibold text-white">Compartir vía WhatsApp</span>
          {tapShare && (
            <>
              <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.5)", animation: "tapRipple 0.9s ease-out infinite" }} />
              <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute" style={{ left: "calc(50% + 8px)", top: "calc(50% + 6px)" }}><path d="M5 3l14 9-6 1.5L11 20 5 3z" fill="#1f2937" stroke="white" strokeWidth="1.2" strokeLinejoin="round" /></svg>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LinkBuilderPanel() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const durs = [1900, 2300, 2200];
    const id = setTimeout(() => setStep((s) => s + 1), durs[step % 3]);
    return () => clearTimeout(id);
  }, [step]);
  const phase = step % 2; // 0 monto form · 1 success (Block 1 only animates monto)

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between border-b border-black/[0.06] px-4 h-[48px]">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="font-sora text-[13px] font-semibold text-black">Crear link de pago</span>
        </div>
        {phase === 0 && <span className="rounded-[8px] border border-black/[0.12] px-2.5 py-1 font-inter text-[10px] text-black/55">Vista previa</span>}
      </div>
      <div style={{ height: 360, overflow: "hidden" }}>
        <div key={phase} className="h-full px-4 py-4" style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
          {phase === 0 ? <MontoScreen /> : <SuccessScreen path={0} />}
        </div>
      </div>
    </div>
  );
}

/* ── Block 2 panel — share via WhatsApp ── */
function WhatsAppSharePanel() {
  const [phase, setPhase] = useState(0); // 0 greeting · 1 link bubble · 2 paid
  useEffect(() => {
    const id = setTimeout(() => setPhase((p) => (p + 1) % 3), phase === 2 ? 2000 : 1400);
    return () => clearTimeout(id);
  }, [phase]);
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 300 }}>
      {/* phone frame */}
      <div className="overflow-hidden rounded-[36px] bg-black p-[6px]" style={{ boxShadow: "0 26px 60px rgba(0,0,0,0.22)" }}>
        <div className="relative overflow-hidden rounded-[30px] bg-white">
          {/* notch */}
          <div className="absolute left-1/2 top-0 z-10 h-[18px] w-[110px] -translate-x-1/2 rounded-b-[12px] bg-black" />
          {/* chat header */}
          <div className="flex items-center gap-2.5 px-4 pb-3 pt-6" style={{ background: "#075E54" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/15 font-sora text-[12px] font-bold text-white">A</span>
            <div className="leading-tight">
              <p className="font-inter text-[12px] font-semibold text-white">Ana López</p>
              <p className="font-inter text-[9px] text-white/60">en línea</p>
            </div>
          </div>
          {/* chat body — fixed height, bottom-anchored */}
          <div className="flex flex-col justify-end gap-2 px-3.5 py-4" style={{ height: 420, background: "#E5DDD5" }}>
            <div className="max-w-[80%] self-end rounded-[12px] rounded-tr-[3px] bg-[#DCF8C6] px-3 py-2" style={{ animation: "fadeSlideIn 0.35s ease-out both" }}>
              <p className="font-inter text-[12px] text-black/80">¡Hola! Aquí está tu link de pago 👇</p>
              <p className="mt-0.5 text-right font-inter text-[8px] text-black/35">10:24</p>
            </div>
            {phase >= 1 && (
              <div key="lk" className="max-w-[84%] self-end overflow-hidden rounded-[12px] rounded-tr-[3px] bg-white" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.12)", animation: "fadeSlideIn 0.35s ease-out both" }}>
                {/* WhatsApp-style link preview with photo */}
                <div className="m-1 overflow-hidden rounded-[8px] bg-[#FAFAF9]">
                  <div className="flex items-center justify-center" style={{ height: 96 }}>
                    <Image src="/img/tenis-transparente.png" alt="" width={130} height={84} className="object-contain" />
                  </div>
                </div>
                <div className="px-3 pb-1">
                  <p className="font-inter text-[11px] font-semibold text-black">{CONCEPT}</p>
                  <p className="font-sora text-[18px] font-light text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>{AMOUNT}</p>
                  <div className="mt-1.5 flex items-center gap-1.5 rounded-[8px] bg-[#FAFAF9] px-2 py-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span className="font-inter text-[10px] font-medium text-[#DB3B2B]">{LINK_URL}</span>
                  </div>
                  <p className="mt-1 text-right font-inter text-[8px] text-black/35">10:24</p>
                </div>
              </div>
            )}
            {phase >= 2 && (
              <div key="paid" className="max-w-[78%] self-start rounded-[12px] rounded-tl-[3px] bg-white px-3 py-2" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.12)", animation: "fadeSlideIn 0.35s ease-out both" }}>
                <p className="font-inter text-[12px] text-black/80">¡Listo, ya pagué! 🎉</p>
                <p className="mt-0.5 text-right font-inter text-[8px] text-black/35">10:25</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Block 3 panel — transactions dashboard (like the real app) ── */
type Tx = { amt: string; status: "Exitoso" | "Reembolsado" | "Fallido"; brand: "visa" | "mastercard" | "amex"; cliente: string; fecha: string };
const TX_POOL: Tx[] = [
  { amt: "$1,234.09", status: "Exitoso", brand: "amex", cliente: "Danna Arámbulo", fecha: "23/10/24" },
  { amt: "$234.56", status: "Reembolsado", brand: "mastercard", cliente: "Omar Fernández", fecha: "15/10/24" },
  { amt: "$123.45", status: "Fallido", brand: "visa", cliente: "Eduardo García", fecha: "09/10/24" },
  { amt: "$890.00", status: "Exitoso", brand: "visa", cliente: "Luis González", fecha: "26/09/24" },
  { amt: "$1,345.99", status: "Exitoso", brand: "mastercard", cliente: "Daniel Camacho", fecha: "21/09/24" },
  { amt: "$430.00", status: "Fallido", brand: "amex", cliente: "Grecia Solís", fecha: "20/09/24" },
  { amt: "$2,150.50", status: "Reembolsado", brand: "visa", cliente: "María López", fecha: "18/09/24" },
];
const TX_STATUS: Record<Tx["status"], { c: string; bg: string }> = {
  Exitoso: { c: "#16A34A", bg: "rgba(34,197,94,0.12)" },
  Reembolsado: { c: "#B45309", bg: "rgba(245,158,11,0.16)" },
  Fallido: { c: "#DC2626", bg: "rgba(239,68,68,0.10)" },
};
const TX_BRAND: Record<Tx["brand"], { src: string; h: number }> = {
  visa: { src: "/img/icons/visa.svg", h: 11 },
  mastercard: { src: "/img/icons/mastercard.svg", h: 16 },
  amex: { src: "/img/icons/amex.svg", h: 14 },
};

function LinksListPanel() {
  const [start, setStart] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStart((s) => (s + 1) % TX_POOL.length), 2400);
    return () => clearInterval(id);
  }, []);
  const rows = [0, 1, 2, 3, 4].map((k) => (start + k) % TX_POOL.length);
  const stats = [
    { label: "Todas", value: 250, c: "#111827" },
    { label: "Exitosos", value: 100, c: "#16A34A" },
    { label: "Reembolsados", value: 12, c: "#B45309" },
    { label: "Fallidos", value: 8, c: "#DC2626" },
  ];
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 18, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      {/* stat chips */}
      <div className="grid grid-cols-4 gap-2" style={{ marginBottom: 14 }}>
        {stats.map((s) => (
          <div key={s.label} className="rounded-[10px] bg-[#FAFAF9] px-2 py-2 text-center">
            <p className="font-sora text-[16px] font-light tabular-nums" style={{ color: s.c, lineHeight: 1 }}><AnimNumber value={s.value} /></p>
            <p className="font-inter text-[8px] text-black/45" style={{ marginTop: 3 }}>{s.label}</p>
          </div>
        ))}
      </div>
      {/* search + period */}
      <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
        <div className="flex flex-1 items-center gap-2 rounded-[8px] border border-black/[0.10] bg-white px-2.5 py-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#9CA3AF" strokeWidth="1.8" /><path d="M20 20l-3-3" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <span className="font-inter text-[10px] text-black/40">Buscar por referencia…</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-[8px] border border-black/[0.10] bg-white px-2.5 py-1.5">
          <span className="font-inter text-[10px] text-black/55">Mes actual</span>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
      {/* table header */}
      <div className="flex items-center gap-2 border-b border-black/[0.06] pb-2" style={{ marginBottom: 4 }}>
        <span className="w-[62px] font-inter text-[8px] font-semibold uppercase tracking-wider text-black/40">Monto</span>
        <span className="w-[78px] font-inter text-[8px] font-semibold uppercase tracking-wider text-black/40">Estatus</span>
        <span className="w-[34px] font-inter text-[8px] font-semibold uppercase tracking-wider text-black/40">Pago</span>
        <span className="flex-1 font-inter text-[8px] font-semibold uppercase tracking-wider text-black/40">Cliente</span>
        <span className="w-[50px] text-right font-inter text-[8px] font-semibold uppercase tracking-wider text-black/40">Fecha</span>
      </div>
      {/* rows */}
      <div className="flex flex-col">
        {rows.map((pi, idx) => {
          const t = TX_POOL[pi];
          const st = TX_STATUS[t.status];
          const br = TX_BRAND[t.brand];
          return (
            <div key={pi} className="flex items-center gap-2 border-b border-black/[0.04] py-2" style={idx === 0 ? { animation: "fadeSlideIn 0.4s ease-out both" } : undefined}>
              <span className="w-[62px] font-inter text-[11px] font-semibold text-black tabular-nums">{t.amt}</span>
              <span className="w-[78px]">
                <span className="rounded-full px-2 py-0.5 font-inter text-[9px] font-bold" style={{ background: st.bg, color: st.c }}>{t.status}</span>
              </span>
              <span className="flex w-[34px] items-center"><Image src={br.src} alt="" width={24} height={br.h} className="w-auto object-contain" style={{ height: br.h }} /></span>
              <span className="flex-1 truncate font-inter text-[11px] text-black/70">{t.cliente}</span>
              <span className="w-[50px] text-right font-inter text-[9px] text-black/45 tabular-nums">{t.fecha}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── "Cobrar con un link" — dark animated stepper with monto/productos chips ── */
const PAY_LOGOS: { type: "img" | "carnet"; src?: string; h?: number; alt?: string }[] = [
  { type: "img", src: "/img/icons/visa.svg", h: 13, alt: "Visa" },
  { type: "img", src: "/img/icons/mastercard.svg", h: 18, alt: "Mastercard" },
  { type: "img", src: "/img/icons/amex.svg", h: 16, alt: "Amex" },
  { type: "carnet" },
  { type: "img", src: "/img/icons/spei.svg", h: 12, alt: "SPEI" },
  { type: "img", src: "/img/icons/kueski.svg", h: 13, alt: "Kueski" },
];

function PayLogo({ l }: { l: (typeof PAY_LOGOS)[number] }) {
  if (l.type === "carnet") return <span className="font-sora text-[11px] font-extrabold text-[#E10E0E]">Carnet</span>;
  return <Image src={l.src!} alt={l.alt || ""} width={28} height={l.h} className="w-auto object-contain" style={{ height: l.h }} />;
}

function PayScreen({ mode }: { mode: number }) {
  const amount = mode ? "$2,235.99" : "$800.00";
  const concept = mode ? "Tenis blancos clásicos +1 más" : "Anualidad 2025";
  return (
    <div className="flex h-full flex-col">
      <p className="text-center font-inter text-[11px] text-black/45">Total a pagar</p>
      <p className="text-center font-sora text-[34px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1, marginTop: 4 }}>{amount} <span className="text-[13px] text-black/45">MXN</span></p>
      <p className="text-center font-inter text-[11px] text-black/50" style={{ marginTop: 6, marginBottom: 18 }}>{concept}</p>
      <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-black/40" style={{ marginBottom: 8 }}>Método de pago</p>
      <div className="flex items-center gap-2 rounded-[10px] border px-3 py-2.5" style={{ borderColor: "rgba(219,59,43,0.4)", marginBottom: "auto" }}>
        <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border border-[#DB3B2B]"><span className="h-[8px] w-[8px] rounded-full bg-[#DB3B2B]" /></span>
        <span className="flex-1 font-inter text-[12px] text-black/75">Visa terminada en 4242</span>
        <Image src="/img/icons/visa.svg" alt="" width={26} height={14} className="h-[14px] w-auto" />
      </div>
      <div className="relative mt-3 flex h-[42px] items-center justify-center rounded-[10px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">
        Pagar {amount}
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[42px] w-[42px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.5)", animation: "tapRipple 0.9s ease-out infinite" }} />
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute" style={{ left: "calc(50% + 24px)", top: "calc(50% + 6px)" }}><path d="M5 3l14 9-6 1.5L11 20 5 3z" fill="#1f2937" stroke="white" strokeWidth="1.2" strokeLinejoin="round" /></svg>
      </div>
    </div>
  );
}

function ReceivedScreen({ mode }: { mode: number }) {
  const amount = mode ? "$2,235.99" : "$800.00";
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#16A34A]" style={{ marginBottom: 14 }}>
        <svg width="26" height="26" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <p className="font-sora text-[17px] font-semibold text-black">¡Pago recibido!</p>
      <p className="font-sora text-[26px] font-light text-black" style={{ letterSpacing: "-0.02em", marginTop: 6 }}>{amount} <span className="text-[13px] text-black/45">MXN</span></p>
      <div className="mt-4 flex items-center gap-1.5 rounded-full bg-[rgba(34,197,94,0.12)] px-3 py-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="#16A34A" strokeWidth="1.6" /><path d="M3 9h18 M8 3v4 M16 3v4" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" /></svg>
        <span className="font-inter text-[11px] font-bold text-[#16A34A]">Se liquida a tu cuenta mañana</span>
      </div>
    </div>
  );
}

function StepsSimulator() {
  const [mode, setMode] = useState(0); // 0 monto · 1 productos
  const [active, setActive] = useState(0);
  useEffect(() => {
    // always auto-advances; clicking a step just jumps there and it keeps going
    const id = setInterval(() => setActive((a) => (a + 1) % 4), 2600);
    return () => clearInterval(id);
  }, []);
  const steps = [
    { n: "1", title: "Crea el link", desc: mode === 0 ? "Pon el monto y el concepto a cobrar." : "Elige los productos de tu catálogo." },
    { n: "2", title: "Compártelo", desc: "Por WhatsApp, redes, correo o SMS." },
    { n: "3", title: "Tu cliente paga", desc: "Elige su método y paga desde el link." },
    { n: "4", title: "Recibes tu dinero", desc: "A tu cuenta al día siguiente." },
  ];
  const barLabel = ["Crear link de pago", "Link creado", "Pantalla de pago", "Comprobante"][active];
  const screen =
    active === 0 ? (mode === 1 ? <ProductoScreen full /> : <MontoScreen />) :
    active === 1 ? <SuccessScreen path={mode} tapShare /> :
    active === 2 ? <PayScreen mode={mode} /> :
    <ReceivedScreen mode={mode} />;
  return (
    <>
      <div data-modal-animate className="mb-10 flex justify-center gap-2">
        {["Monto fijo", "Productos"].map((c, i) => (
          <button
            key={c}
            onClick={() => setMode(i)}
            className="rounded-full px-4 py-2 font-inter text-[13px] font-medium transition-all duration-200"
            style={{ background: mode === i ? "#DB3B2B" : "rgba(255,255,255,0.06)", color: mode === i ? "#fff" : "rgba(255,255,255,0.65)", border: mode === i ? "1px solid #DB3B2B" : "1px solid rgba(255,255,255,0.16)" }}
          >
            {c}
          </button>
        ))}
      </div>
      <div data-modal-animate className="grid grid-cols-1 items-center gap-8 tablet:grid-cols-2 tablet:gap-12 lg:gap-16">
        {/* left — simulated process panel */}
        <div className="mx-auto w-full" style={{ maxWidth: 340 }}>
          <div className="overflow-hidden rounded-[18px] bg-white" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}>
            <div className="flex items-center gap-2 border-b border-black/[0.06] px-4 h-[48px]">
              <span className="h-[8px] w-[8px] rounded-full bg-[#DB3B2B]" />
              <span className="font-sora text-[13px] font-semibold text-black">{barLabel}</span>
            </div>
            <div style={{ height: 420, overflow: "hidden" }}>
              <div key={`${active}-${mode}`} className="h-full px-4 py-4" style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
                {screen}
              </div>
            </div>
          </div>
        </div>
        {/* right — steps list synced to the simulation */}
        <div className="flex flex-col gap-3">
          {steps.map((s, i) => {
            const on = active === i;
            return (
              <button
                key={s.n}
                onClick={() => setActive(i)}
                className="flex items-start gap-4 rounded-[14px] border p-4 text-left transition-all duration-300"
                style={{ borderColor: on ? "rgba(219,59,43,0.5)" : "rgba(255,255,255,0.10)", background: on ? "rgba(219,59,43,0.10)" : "rgba(255,255,255,0.02)", cursor: "pointer" }}
              >
                <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full font-sora text-[15px]" style={{ background: on ? "#DB3B2B" : "rgba(255,255,255,0.06)", color: on ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.4s ease" }}>{s.n}</span>
                <div>
                  <h3 className="font-sora text-[17px] font-normal text-white" style={{ marginBottom: 3 }}>{s.title}</h3>
                  <p className="font-inter text-[13px] font-light text-white/55" style={{ lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function T1LinksDePago() {
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
      <section className="relative overflow-hidden px-5 pt-28 pb-10 tablet:px-10 tablet:pt-36 tablet:pb-12" style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.16) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-[440px] w-[440px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(59,99,219,0.12) 0%, transparent 65%)", filter: "blur(50px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:min-h-[420px] tablet:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tablet:gap-12">
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]" style={{ lineHeight: 1.05, letterSpacing: "-1.7px", marginBottom: 22 }}>
                Cobra a distancia con{" "}
                <span className="relative inline-block">
                  un solo link
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
                .
              </h1>
              <p className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 460 }}>
                Crea un link de pago en segundos, compártelo por WhatsApp, redes o correo y recibe el pago al instante.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Crear mi primer link
                </a>
              </div>
            </div>
            <div className="relative">
              <LinkHeroCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Métricas / problema ── */}
      <section className="relative bg-white px-5 pt-10 pb-12 tablet:px-10 tablet:pt-14 tablet:pb-16" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48, animation: "fadeSlideIn 0.6s ease-out both" }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15 }}>
              Vender no debería requerir un sitio web.
            </h2>
          </div>
          <div data-modal-animate className="mx-auto grid max-w-[820px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { stat: "30 seg", label: "para crear un link y cobrar" },
              { stat: "0", label: "líneas de código o desarrollo" },
              { stat: "+10", label: "métodos de pago en cada link" },
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
            Del link al pago, en segundos.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Crea, comparte y cobra. Todo desde tu teléfono, sin montar una tienda.
          </p>
        </div>
      </section>

      {/* ── Stack cards ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — crear (text left, panel right) */}
        <div className="fs-stack-card" style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Crea un link en segundos
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Elige cobrar un monto fijo o con productos de tu catálogo. Tu link queda listo para compartir en segundos.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Monto fijo o productos de tu catálogo", "Agrega concepto, foto y métodos de pago", "Límite de usos, vencimiento y datos del cliente"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <LinkBuilderPanel />
            </div>
          </div>
        </div>

        {/* Block 2 — compartir (panel left, text right) */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#FBFBFB" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div className="order-2 tablet:order-1">
                <WhatsAppSharePanel />
              </div>
              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Compártelo por donde quieras
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  WhatsApp, redes, correo o un QR para cobrar en persona. Tu cliente paga sin salir de la conversación.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["WhatsApp, redes sociales, correo y SMS", "Tu cliente paga sin salir de la conversación", "Reutiliza el link o úsalo una sola vez"].map((it) => (
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

        {/* Block 3 — seguir (text left, panel right) */}
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Sigue cada cobro en tiempo real
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Mira qué links se pagaron y cuáles siguen pendientes. Te avisamos en el momento en que entra el dinero.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Estado pagado o pendiente por link", "Notificación al instante de cada cobro", "Links con vencimiento y límite de usos"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <LinksListPanel />
            </div>
          </div>
        </div>
      </div>

      {/* ── Métodos aceptados — logos strip ── */}
      <section className="relative bg-white px-5 py-16 tablet:px-10 tablet:py-20">
        <div className="mx-auto max-w-[var(--max-w)] text-center">
          <p data-modal-animate className="font-inter text-[12px] font-semibold uppercase tracking-wider text-black/40" style={{ marginBottom: 22 }}>Aceptamos todos los métodos de pago</p>
          <div data-modal-animate className="flex flex-wrap items-center justify-center gap-3">
            {PAY_LOGOS.map((l, i) => (
              <div key={i} className="flex h-[48px] min-w-[70px] items-center justify-center rounded-[12px] border border-black/[0.06] bg-white px-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <PayLogo l={l} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona — dark animated stepper ── */}
      <section className="relative overflow-hidden px-5 py-24 tablet:px-10 tablet:py-32" style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.14) 0%, transparent 65%)", filter: "blur(50px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Cobra con un link en 4 pasos
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cobra por un monto fijo o con productos. Tú eliges cómo.
            </p>
          </div>
          <StepsSimulator />
          <div data-modal-animate className="mt-14 flex justify-center">
            <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
              Crear mi primer link
            </a>
          </div>
        </div>
      </section>

      {/* ── Lo que incluye ── */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Cobra sin complicaciones
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cada herramienta lista desde el primer cobro.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              { title: "Monto fijo o productos", desc: "Cobra una cantidad exacta o arma el link con productos de tu catálogo.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2v20 M17 6.5C17 4.6 14.8 4 12 4s-5 .9-5 3 2.2 2.7 5 3.2 5 1.3 5 3.3-2.2 3-5 3-5-.8-5-2.7" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Links reutilizables", desc: "Un mismo link para muchos clientes o de un solo uso, con vencimiento y límite de pagos.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Dinero al día siguiente", desc: "Liquidación T+1: el pago de hoy llega a tu cuenta mañana.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="#111827" strokeWidth="1.6" /><path d="M3 9h18 M8 3v4 M16 3v4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /><path d="M9 15l2 2 4-4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Solicita datos del cliente", desc: "Pide dirección y envío, teléfono o datos de facturación al pagar.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="#111827" strokeWidth="1.6" /><path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Múltiples métodos", desc: "Tarjetas, SPEI, transferencias, Kueski y meses sin intereses.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#111827" strokeWidth="1.6" /><path d="M3 10h18" stroke="#111827" strokeWidth="1.6" /></svg>) },
              { title: "Dashboard de cobros", desc: "Mira pagados, pendientes y liquidaciones en un panel claro.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 21h18" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /><rect x="5" y="12" width="3.5" height="7" rx="1" stroke="#111827" strokeWidth="1.6" /><rect x="10.5" y="8" width="3.5" height="11" rx="1" stroke="#111827" strokeWidth="1.6" /><rect x="16" y="4" width="3.5" height="15" rx="1" stroke="#111827" strokeWidth="1.6" /></svg>) },
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
              Crear mi primer link
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative px-5 py-20 tablet:px-10 tablet:py-24" style={{ background: "linear-gradient(135deg, #1A0A0A 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[24px] font-light text-white tablet:text-[34px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Cobrar nunca fue tan simple.
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
            <div data-stagger style={{ ["--i" as string]: 0 }}><CountStat end={30} suffix="s" label="para crear y compartir" /></div>
            <div data-stagger style={{ ["--i" as string]: 1 }}><CountStat end={10} prefix="+" label="métodos en cada link" /></div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>Día +1</p>
              <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">recibes tu dinero al día siguiente</p>
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
              { q: "¿Necesito una página web?", a: "No. El link de pago funciona solo: lo creas, lo compartes y tu cliente paga desde ahí, sin que tengas una tienda o sitio." },
              { q: "¿Cómo comparto el link?", a: "Por WhatsApp, redes sociales, correo o SMS. También puedes generar un QR para cobrar en persona." },
              { q: "¿Qué métodos de pago acepta?", a: "Tarjetas Visa, Mastercard, Amex y Carnet, SPEI, transferencias, Kueski y meses sin intereses." },
              { q: "¿Puedo reutilizar el mismo link?", a: "Sí. Puedes usar un link para varios cobros o configurarlo de un solo uso, con vencimiento y límite de pagos." },
              { q: "¿Cuándo recibo el dinero?", a: "Liquidación T+1 hábil para tarjetas y minutos para SPEI. Te avisamos al instante cuando se paga el link." },
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
        title="¿Listo para cobrar con un link?"
        description="Crea tu primer link de pago y empieza a cobrar por WhatsApp en minutos."
      />
    </div>
  );
}
