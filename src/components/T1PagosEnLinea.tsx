"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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
/* Status bar del teléfono (hora + señal/wifi/batería) */
function StatusBar() {
  const c = "#111";
  return (
    <div className="relative z-20 flex shrink-0 items-center justify-between bg-white px-5" style={{ height: 30, paddingTop: 7 }}>
      <span className="font-sora text-[11px] font-bold" style={{ color: c }}>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="11" viewBox="0 0 18 12" fill="none"><rect x="0" y="8" width="3" height="4" rx="0.6" fill={c} /><rect x="4.6" y="5.5" width="3" height="6.5" rx="0.6" fill={c} /><rect x="9.2" y="3" width="3" height="9" rx="0.6" fill={c} /><rect x="13.8" y="0.5" width="3" height="11.5" rx="0.6" fill={c} /></svg>
        <svg width="15" height="11" viewBox="0 0 16 12" fill="none"><path d="M8 10.2a1 1 0 100-2 1 1 0 000 2z M4 6.6a5.6 5.6 0 018 0 M1.4 4.2a9.2 9.2 0 0113.2 0" stroke={c} strokeWidth="1.3" strokeLinecap="round" /></svg>
        <div className="flex items-center gap-[1.5px]">
          <div className="flex items-center rounded-[2.5px] border" style={{ width: 17, height: 10, borderColor: c, padding: 1.4 }}><div className="h-full rounded-[1px]" style={{ width: "72%", background: c }} /></div>
          <div className="rounded-r-[1px]" style={{ width: 1.5, height: 4, background: c }} />
        </div>
      </div>
    </div>
  );
}

/* Marco de teléfono para las simulaciones */
export function PhoneFrame({ children, height = 500 }: { children: ReactNode; height?: number }) {
  return (
    <div className="relative mx-auto" style={{ width: 290 }}>
      <div className="relative flex flex-col overflow-hidden bg-white" style={{ height, borderRadius: 42, border: "9px solid #14100f", boxShadow: "0 34px 80px rgba(0,0,0,0.55)" }}>
        <div className="absolute left-1/2 top-0 z-30 h-[22px] w-[118px] -translate-x-1/2 rounded-b-[14px] bg-[#14100f]" />
        <StatusBar />
        <div className="relative flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

/* Ripple de "tap" sobre un botón */
function Ripple() {
  return <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.45)", animation: "tapRipple 1s ease-out infinite" }} />;
}

/* Cabecera de WhatsApp */
function WAHeader() {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: "#075E54" }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
      <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/20 font-sora text-[12px] font-bold text-white">O</span>
      <div><p className="font-inter text-[12px] font-semibold leading-tight text-white">Origen MX</p><p className="font-inter text-[9px] leading-tight text-white/70">en línea</p></div>
    </div>
  );
}

/* Thank-you page compartida */
function TypScreen({ order = "#9803890", total = "$1,345.99", label = "origenmx.com" }: { order?: string; total?: string; label?: string }) {
  return (
    <div className="flex h-full flex-col bg-white" style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
      <div className="flex flex-1 flex-col items-center justify-center px-5">
        <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#16A34A]" style={{ marginBottom: 14, animation: "checkPop 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
          <svg width="26" height="26" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <p className="font-sora text-[17px] font-semibold text-black">¡Gracias por tu compra!</p>
        <p className="font-inter text-[11px] text-black/50" style={{ marginTop: 4 }}>Tu pago se realizó con éxito.</p>
        <div className="mt-5 w-full rounded-[12px] border border-black/[0.08] p-4">
          <div className="flex items-center justify-between py-1"><span className="font-inter text-[11px] text-black/45">Pedido</span><span className="font-inter text-[12px] font-semibold text-black">{order}</span></div>
          <div className="flex items-center justify-between py-1"><span className="font-inter text-[11px] text-black/45">Total</span><span className="font-inter text-[12px] font-semibold text-black">{total}</span></div>
        </div>
      </div>
    </div>
  );
}

/* Caja de checkout de la tienda "La noria" (compartida por Tienda y Paga con T1) */
function LaNoriaCheckout() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-2.5">
        <span className="font-sora text-[13px] font-extrabold text-black">La noria</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-12z M6 6L5 3H2 M9 20a1 1 0 100-2 1 1 0 000 2z M18 20a1 1 0 100-2 1 1 0 000 2z" stroke="rgba(0,0,0,0.5)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden px-4 py-3">
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <span className="font-inter text-[12px] font-semibold text-black">Resumen de pedido</span>
          <span className="font-sora text-[15px] font-bold text-black">$1,235.99</span>
        </div>
        <p className="text-center font-inter text-[10px] text-black/45" style={{ marginBottom: 6 }}>Pago exprés</p>
        <div className="flex gap-2" style={{ marginBottom: 14 }}>
          <div className="flex h-[38px] flex-1 items-center justify-center gap-1 rounded-[9px] bg-[#DB3B2B] font-inter text-[12px] font-semibold text-white">Paga con T1</div>
          <div className="flex h-[38px] flex-1 items-center justify-center rounded-[9px] font-sora text-[13px] font-bold" style={{ background: "#FFC43A" }}><span style={{ color: "#253B80" }}>Pay</span><span style={{ color: "#179BD7" }}>Pal</span></div>
        </div>
        <p className="font-sora text-[12px] font-bold text-black" style={{ marginBottom: 8 }}>Información de contacto</p>
        <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
          <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-black font-sora text-[9px] font-bold text-white">LC</span>
          <span className="font-inter text-[11px] text-black/70">luiscervantes@gmail.com</span>
        </div>
        <p className="font-sora text-[12px] font-bold text-black" style={{ marginBottom: 8 }}>Entrega</p>
        <div className="overflow-hidden rounded-[9px] border border-black/[0.10]" style={{ marginBottom: 14 }}>
          <div className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2.5">
            <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border-2 border-black"><span className="h-[6px] w-[6px] rounded-full bg-black" /></span>
            <span className="font-inter text-[11px] text-black/80">Envío a domicilio</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5">
            <span className="h-[14px] w-[14px] shrink-0 rounded-full border border-black/25" />
            <span className="font-inter text-[11px] text-black/55">Recoger en tienda</span>
          </div>
        </div>
        <p className="font-sora text-[12px] font-bold text-black" style={{ marginBottom: 8 }}>Método de pago</p>
        <div className="flex items-center gap-2 rounded-[9px] border px-3 py-2.5" style={{ borderColor: "rgba(219,59,43,0.4)" }}>
          <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border border-[#DB3B2B]"><span className="h-[7px] w-[7px] rounded-full bg-[#DB3B2B]" /></span>
          <span className="flex-1 font-inter text-[11px] text-black/75">Tarjeta ••1234</span>
          <img src="/img/icons/visa.svg" alt="" style={{ height: 12, width: "auto" }} />
        </div>
        <div className="relative mt-auto flex h-[44px] items-center justify-center overflow-hidden rounded-[11px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">Pagar<Ripple /></div>
      </div>
    </div>
  );
}

/* Flujo Tienda en línea: carrito → checkout con datos → TYP */
export function TiendaFlow() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const durs = [3000, 3000, 3400];
    const id = setTimeout(() => setP((x) => (x + 1) % 3), durs[p]);
    return () => clearTimeout(id);
  }, [p]);
  return (
    <div key={p} className="h-full" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
      {p === 0 && (
        <div className="flex h-full flex-col bg-white">
          <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-2.5">
            <span className="font-sora text-[13px] font-extrabold text-black">La noria</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-12z M6 6L5 3H2 M9 20a1 1 0 100-2 1 1 0 000 2z M18 20a1 1 0 100-2 1 1 0 000 2z" stroke="rgba(0,0,0,0.5)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="flex flex-1 flex-col px-4 py-4">
            <p className="font-sora text-[14px] font-bold text-black" style={{ marginBottom: 12 }}>Tu carrito</p>
            <div className="flex items-center gap-2.5">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-[9px] border border-black/[0.05] bg-[#FAFAF9]"><Image src="/img/tenis-transparente.png" alt="" width={36} height={32} className="object-contain" /></div>
              <div className="flex-1 leading-tight"><p className="font-inter text-[12px] font-medium text-black">Tenis blancos clásicos</p><p className="font-inter text-[10px] text-black/50">Talla 26 · 1 pza</p></div>
              <span className="font-inter text-[12px] font-semibold text-black">$1,345.99</span>
            </div>
            <div className="my-3 border-t border-black/[0.06]" />
            <div className="flex items-center justify-between"><span className="font-inter text-[11px] text-black/50">Subtotal</span><span className="font-inter text-[11px] text-black/70">$1,345.99</span></div>
            <div className="mt-1 flex items-center justify-between"><span className="font-inter text-[11px] text-black/50">Envío</span><span className="font-inter text-[11px] text-[#16A34A]">Gratis</span></div>
            <div className="relative mt-auto flex h-[46px] items-center justify-center overflow-hidden rounded-[12px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">Comprar ahora<Ripple /></div>
          </div>
        </div>
      )}
      {p === 1 && (
        <LaNoriaCheckout />
      )}
      {p === 2 && <TypScreen order="#9803890" total="$1,235.99" label="chicosole.com" />}
    </div>
  );
}

/* Flujo Link de pago: WhatsApp (tap link) → checkout link → TYP → WhatsApp (respuesta) */
export function LinkFlow() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const durs = [3000, 2800, 2800, 3200];
    const id = setTimeout(() => setP((x) => (x + 1) % 4), durs[p]);
    return () => clearTimeout(id);
  }, [p]);
  return (
    <div key={p} className="h-full" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
      {(p === 0 || p === 3) && (
        <div className="flex h-full flex-col" style={{ background: "#ECE5DD" }}>
          <WAHeader />
          <div className="flex flex-1 flex-col justify-end gap-2 px-3 py-3">
            <div className="max-w-[82%] self-end rounded-[10px] rounded-tr-[3px] bg-[#DCF8C6] px-3 py-2" style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.08)" }}>
              <p className="font-inter text-[11.5px] text-black/80">¡Hola! Aquí está tu link de pago 👇</p>
            </div>
            <div className="relative max-w-[86%] self-end rounded-[10px] rounded-tr-[3px] bg-[#DCF8C6] p-1.5" style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.08)" }}>
              <div className="rounded-[8px] border border-black/[0.06] bg-white p-2.5">
                <p className="font-sora text-[12px] font-semibold text-black">Anualidad 2025 · $999.00</p>
                <p className="mt-0.5 font-inter text-[10px] font-medium text-[#2563EB]">t1.mx/p/x9k2f</p>
              </div>
              <p className="mt-1 mr-1 text-right font-inter text-[8px] text-black/40">10:24 · ✓✓</p>
              {p === 0 && (
                <span className="pointer-events-none absolute" style={{ left: "50%", top: "48%" }}>
                  <span className="absolute rounded-full" style={{ left: -18, top: -18, width: 36, height: 36, border: "2.5px solid rgba(219,59,43,0.85)", animation: "tapRipple 1.1s ease-out infinite" }} />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#111827" stroke="white" strokeWidth="1.4" strokeLinejoin="round" style={{ position: "absolute", left: 2, top: 2, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}><path d="M5 2.5l6 17.5 2.3-7.2L20.5 10.5z" /></svg>
                </span>
              )}
            </div>
            {p === 3 && (
              <div className="max-w-[86%] self-start rounded-[10px] rounded-tl-[3px] bg-white px-3 py-2" style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.08)", animation: "fadeSlideIn 0.4s ease-out both" }}>
                <p className="font-inter text-[11.5px] text-black/80">Listo, ya quedó pagado ✅</p>
                <p className="mt-0.5 text-right font-inter text-[8px] text-black/35">10:25</p>
              </div>
            )}
          </div>
        </div>
      )}
      {p === 1 && (
        <div className="flex h-full flex-col bg-white">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-sora text-[15px] font-bold text-black/80">LOGO</span>
            <span className="flex items-center gap-1 font-inter text-[11px] font-semibold text-black/70">Ver detalle<svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </div>
          <div className="flex flex-1 flex-col px-4 pb-4">
            <div className="border-b border-black/[0.06] pb-3 text-center">
              <p className="font-inter text-[12px] text-black/60">Anualidad 2025</p>
              <p className="font-sora text-[30px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 2 }}>$999.00</p>
            </div>
            <p className="font-sora text-[12px] font-semibold text-black" style={{ marginTop: 14, marginBottom: 8 }}>Información de contacto</p>
            <div className="flex items-center rounded-[9px] border border-black/[0.12] px-3" style={{ height: 38, marginBottom: 8 }}><span className="font-inter text-[11px] text-black/40">Correo electrónico</span></div>
            <div className="flex items-center gap-2 rounded-[9px] border border-black/[0.12] px-3" style={{ height: 38 }}>
              <span className="flex items-center gap-1 border-r border-black/10 pr-2 font-inter text-[11px] text-black/60">🇲🇽<svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <span className="font-inter text-[11px] text-black/40">Número celular</span>
            </div>
            <p className="font-sora text-[12px] font-semibold text-black" style={{ marginTop: 14, marginBottom: 8 }}>Método de pago</p>
            <div className="overflow-hidden rounded-[9px] border border-black/[0.12]">
              <div className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2.5">
                <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border border-[#DB3B2B]"><span className="h-[7px] w-[7px] rounded-full bg-[#DB3B2B]" /></span>
                <span className="flex-1 font-inter text-[11px] text-black/75">Tarjetas de crédito o débito</span>
                <img src="/img/icons/visa.svg" alt="" style={{ height: 11 }} />
                <img src="/img/icons/mastercard.svg" alt="" style={{ height: 14 }} />
                <img src="/img/icons/amex.svg" alt="" style={{ height: 13 }} />
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5">
                <span className="h-[14px] w-[14px] shrink-0 rounded-full border border-black/25" />
                <span className="flex-1 font-inter text-[11px] text-black/55">Transferencia bancaria</span>
                <img src="/img/icons/spei.svg" alt="" style={{ height: 11 }} />
              </div>
            </div>
            <div className="relative mt-auto flex h-[46px] w-full items-center justify-center overflow-hidden rounded-[12px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">Pagar<Ripple /></div>
          </div>
        </div>
      )}
      {p === 2 && <TypScreen order="#AN-2025" total="$999.00" label="t1.mx/p/x9k2f" />}
    </div>
  );
}

/* Flujo Paga con T1: checkout → login T1 → caja Paga con T1 → TYP */
function PagaT1Flow() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const durs = [3000, 2800, 2800, 3200];
    const id = setTimeout(() => setP((x) => (x + 1) % 4), durs[p]);
    return () => clearTimeout(id);
  }, [p]);
  return (
    <div key={p} className="h-full" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
      {p === 0 && <LaNoriaCheckout />}
      {p === 1 && (
        <div className="flex h-full flex-col bg-white">
          <div className="flex items-center justify-center border-b border-black/[0.06] py-3"><span className="font-sora text-[15px] font-extrabold text-black">La noria</span></div>
          <div className="flex flex-1 flex-col justify-center px-5 py-5">
            <div className="rounded-[14px] border border-black/[0.08] p-4" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
              <p className="text-center font-sora text-[15px] font-bold text-black" style={{ marginBottom: 14 }}>Confirma que eres tú</p>
              <div className="flex items-start justify-between gap-2" style={{ marginBottom: 10 }}>
                <p className="font-inter text-[10.5px] leading-snug text-black/70">luiscervantes@gmail.com,<br />+52 55 11327311</p>
                <span className="shrink-0 font-inter text-[11px] font-semibold text-black/70">Cambiar</span>
              </div>
              <p className="font-inter text-[10.5px] text-black/55" style={{ marginBottom: 12, lineHeight: 1.45 }}>Introduce el código que se envió a tu teléfono para usar la información guardada.</p>
              <div className="flex justify-between gap-1.5">
                {["4", "3", "2", "5", "8", "9"].map((d, i) => (
                  <div key={i} className="flex h-[38px] flex-1 items-center justify-center rounded-[8px] border border-black/[0.15] font-sora text-[16px] font-semibold text-black">{d}</div>
                ))}
              </div>
              <p className="text-center font-inter text-[11px] font-semibold text-black/55" style={{ marginTop: 12 }}>Atrás</p>
            </div>
          </div>
        </div>
      )}
      {p === 2 && (
        <div className="flex h-full flex-col bg-white">
          <div className="flex items-center border-b border-black/[0.06] px-4 py-2.5"><span className="font-sora text-[18px] font-extrabold text-[#DB3B2B]">T1</span></div>
          <div className="flex flex-1 flex-col px-4 py-3">
            <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
              <div className="flex items-center gap-2">
                <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-black font-sora text-[9px] font-bold text-white">LC</span>
                <span className="font-inter text-[11px] text-black/70">luiscervantes@gmail.com</span>
              </div>
              <span className="font-inter text-[13px] text-black/40">···</span>
            </div>
            <p className="font-sora text-[13px] font-bold text-black" style={{ marginBottom: 8 }}>Entrega</p>
            <div className="overflow-hidden rounded-[9px] border border-black/[0.10]" style={{ marginBottom: 10 }}>
              <div className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2">
                <span className="flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full border-2 border-black"><span className="h-[5px] w-[5px] rounded-full bg-black" /></span>
                <span className="font-inter text-[11px] text-black/80">Envío a domicilio</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="h-[13px] w-[13px] shrink-0 rounded-full border border-black/25" />
                <span className="font-inter text-[11px] text-black/55">Recoger en tienda</span>
              </div>
            </div>
            <div className="border-t border-black/[0.06] py-2">
              <p className="font-inter text-[10px] text-black/45">Enviar a</p>
              <p className="truncate font-inter text-[11px] text-black/75">Lago Zurich 34, C.P. 11310, Miguel Hidalgo</p>
            </div>
            <div className="border-t border-black/[0.06] py-2">
              <p className="font-inter text-[10px] text-black/45">Método de envío</p>
              <p className="font-inter text-[11px] text-black/75">2-3 días hábiles · <span className="font-semibold">Gratis</span></p>
            </div>
            <div className="flex items-center gap-2 border-t border-black/[0.06] py-2">
              <p className="flex-1 font-inter text-[10px] text-black/45">Método de pago</p>
              <img src="/img/icons/visa.svg" alt="" style={{ height: 12 }} />
              <span className="font-inter text-[11px] text-black/75">••••4242</span>
            </div>
            <div className="relative mt-auto flex h-[46px] items-center justify-center overflow-hidden rounded-[12px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">Pagar ahora<Ripple /></div>
          </div>
        </div>
      )}
      {p === 3 && <TypScreen order="#9803890" total="$1,345.99" label="chicosole.com" />}
    </div>
  );
}

/* ── "Cobra desde donde vendas" — accordion rotativo estilo "Para cada etapa de tu negocio" ── */
const CHANNELS = [
  { title: "Tienda en línea", desc: "Tu cliente arma su carrito y paga en el checkout de tu tienda con todos los métodos.", Flow: TiendaFlow },
  { title: "Link de pago", desc: "Compartes un enlace por WhatsApp o redes y tu cliente paga al instante.", Flow: LinkFlow },
  { title: "Paga con T1", desc: "Checkout express: tus clientes pagan en un tap con su cuenta T1.", Flow: PagaT1Flow },
];
const CHANNELS_DURATION = 11000;

function ChannelsShowcase() {
  const [active, setActive] = useState(0);
  const [barFull, setBarFull] = useState(false);
  useEffect(() => {
    setBarFull(false);
    const raf = requestAnimationFrame(() => setBarFull(true));
    const timer = setTimeout(() => setActive((a) => (a + 1) % CHANNELS.length), CHANNELS_DURATION);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [active]);
  const a = CHANNELS[active];

  return (
    <section className="relative overflow-hidden bg-black" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="relative mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", textAlign: "center", marginBottom: 16 }}>
          Cobra desde donde vendas.
        </h2>
        <p className="mx-auto font-inter text-[16px] font-light text-white/85 tablet:whitespace-nowrap tablet:text-[18px]" style={{ textAlign: "center", marginBottom: 56 }}>
          Tu tienda, un link o el checkout express. Todos tus cobros en una sola cuenta.
        </p>

        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] tablet:items-center tablet:gap-8">
          {/* Left — tabs seleccionables */}
          <div className="flex flex-col gap-3.5">
            {CHANNELS.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className="w-full cursor-pointer rounded-[16px] border p-5 text-left transition-all duration-300"
                  style={{ borderColor: on ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)", background: on ? "rgba(255,255,255,0.05)" : "transparent" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-sora text-[20px] font-normal tablet:text-[24px]" style={{ letterSpacing: "-0.02em", color: on ? "#FFFFFF" : "rgba(255,255,255,0.45)", transition: "color 0.3s" }}>
                      {it.title}
                    </h3>
                    <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full" style={{ background: on ? "#DB3B2B" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }}>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke={on ? "#fff" : "rgba(255,255,255,0.4)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                  {on && (
                    <>
                      <p className="font-inter text-[14px] font-normal leading-relaxed text-white/60 tablet:text-[15px]" style={{ marginTop: 12 }}>{it.desc}</p>
                      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.10)" }}>
                        <div style={{ height: "100%", width: barFull ? "100%" : "0%", background: "#DB3B2B", transition: barFull ? `width ${CHANNELS_DURATION}ms linear` : "none" }} />
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right — simulación en pantalla de teléfono del canal activo */}
          <div className="flex w-full justify-center tablet:justify-end">
            <div key={a.title} style={{ animation: "fadeSlideIn 0.5s ease-out" }}>
              <PhoneFrame>
                <a.Flow />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
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

  // Carrusel "Acepta todos los métodos" — flechas prev/next (estilo "Crea productos como prefieras")
  const payRef = useRef<HTMLDivElement>(null);
  const scrollPay = (dir: number) => {
    const el = payRef.current;
    const card = el?.querySelector<HTMLElement>(".pay-card");
    const step = card ? card.offsetWidth + 20 : (el?.clientWidth ?? 0) * 0.8;
    el?.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Carrusel "Cobra con todo a favor" — dark, flechas + dots (estilo "Todo incluido desde el día uno")
  const incRef = useRef<HTMLDivElement>(null);
  const [incIdx, setIncIdx] = useState(0);
  const [incPages, setIncPages] = useState(1);
  const incStep = () => {
    const el = incRef.current;
    const card = el?.querySelector<HTMLElement>(".incluye-card");
    return card ? card.offsetWidth + 28 : (el?.clientWidth ?? 0) * 0.8;
  };
  const incPageStep = () => {
    const el = incRef.current;
    if (!el) return 1;
    const s = Math.max(1, incStep());
    const visible = Math.max(1, Math.floor(el.clientWidth / s));
    return visible * s;
  };
  useEffect(() => {
    const el = incRef.current;
    if (!el) return;
    const calc = () => {
      const ps = Math.max(1, incPageStep());
      const maxScroll = el.scrollWidth - el.clientWidth;
      setIncPages(maxScroll <= 1 ? 1 : Math.ceil(maxScroll / ps) + 1);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const incGoTo = useCallback((i: number) => {
    const el = incRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = i >= incPages - 1 ? maxScroll : i * incPageStep();
    el.scrollTo({ left: Math.min(target, maxScroll), behavior: "smooth" });
  }, [incPages]);
  const onIncScroll = () => {
    const el = incRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    setIncIdx(atEnd ? incPages - 1 : Math.min(incPages - 1, Math.round(el.scrollLeft / Math.max(1, incPageStep()))));
  };

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
      <section className="relative overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24" style={{ background: "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%), linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.16) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-[440px] w-[440px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(59,99,219,0.12) 0%, transparent 65%)", filter: "blur(50px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:min-h-[420px] tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            <div>
              <h1 className="font-sora text-[32px] font-light text-white tablet:text-[44px] lg:text-[52px]" style={{ lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 20 }}>
                Cobra en línea{" "}
                <span className="relative inline-block">
                  fácil, rápido y seguro
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
                .
              </h1>
              <p className="font-inter text-[16px] font-light text-white/65 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 16, maxWidth: 500 }}>
                Cobra con tarjetas, SPEI, transferencias, efectivo y métodos locales desde un checkout seguro, conectado a tu panel de pagos.
              </p>
              <p className="whitespace-nowrap font-inter text-[15px] font-semibold text-white tablet:text-[16px]" style={{ marginBottom: 32 }}>
                Un pago perdido es una venta perdida.
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
          <div className="mx-auto max-w-[900px] text-center" style={{ marginBottom: 48, animation: "fadeSlideIn 0.6s ease-out both" }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:whitespace-nowrap lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
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
          <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            Cobrar en línea, de principio a fin.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Del checkout a tu cuenta, con cada método y cada canal en un solo lugar.
          </p>
        </div>
      </section>

      {/* ── Acepta todos los métodos — carrusel estilo "Crea productos como prefieras" ── */}
      <section className="relative overflow-hidden bg-white px-5 py-[100px] tablet:px-10 tablet:py-[128px]">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] tablet:items-center tablet:gap-14">
            {/* Left — título + CTA */}
            <div data-modal-animate>
              <h2 className="font-sora text-[32px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16, maxWidth: 420 }}>
                Acepta todos los métodos de pago
              </h2>
              <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 400 }}>
                Tarjetas, meses sin intereses y antifraude, incluidos en cada cobro sin configurar nada.
              </p>
              <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                Comienza a cobrar
              </a>
            </div>

            {/* Right — carrusel de cards con flechas */}
            <div data-modal-animate className="flex flex-col gap-5">
              <div ref={payRef} className="-mr-5 flex gap-5 overflow-x-auto pb-2 pr-5 tablet:mr-0 tablet:pr-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {[
                  { title: "Múltiples métodos de pago", desc: "Tarjetas, SPEI, Kueski y más próximamente.", img: "/img/metodos-pago-v2.png", w: 1163, h: 1024 },
                  { title: "Meses sin intereses", desc: "Hasta 18 MSI con todos los bancos, sin comisión extra.", img: "/img/msi-v2.png", w: 1176, h: 932 },
                  { title: "Antifraude T1 Score", desc: "Cada transacción evaluada en menos de 100 ms, con la menor tasa de fraude del mercado.", img: "/img/t1score-v2.png", w: 1044, h: 1024 },
                ].map((c) => (
                  <div key={c.title} className="pay-card flex w-[280px] shrink-0 snap-start flex-col rounded-[20px] border border-black/[0.07] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <h3 className="font-sora text-[19px] font-normal text-black" style={{ marginBottom: 8 }}>{c.title}</h3>
                    <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.55, marginBottom: 14, minHeight: 63 }}>{c.desc}</p>
                    <div className="mt-auto flex h-[220px] items-center justify-center">
                      <Image src={c.img} alt={c.title} width={c.w} height={c.h} className="max-h-full w-auto object-contain" sizes="300px" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => scrollPay(-1)} aria-label="Anterior" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black/55 transition-colors hover:border-black/30 hover:text-black">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" onClick={() => scrollPay(1)} aria-label="Siguiente" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black/55 transition-colors hover:border-black/30 hover:text-black">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cobra desde donde vendas — accordion ── */}
      <ChannelsShowcase />

      {/* ── Tu dinero, rápido y claro (después de Cobra desde donde vendas) ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto flex max-w-[var(--max-w)] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
            <div className="order-2 tablet:order-1">
              <SettlementPanel />
            </div>
            <div className="order-1 tablet:order-2">
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[38px] lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 18 }}>
                Tu dinero, rápido y claro
              </h2>
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
      </section>

      {/* ── Cómo funciona ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[820px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:whitespace-nowrap lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Comienza a cobrar en cuatro pasos
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

      {/* ── Cobra con todo a favor + métricas: degradado continuo #1A0A0A → #000 ── */}
      <div className="relative" style={{ background: "linear-gradient(180deg, #1A0A0A 0%, #000000 100%)" }}>
        {/* Cobra con todo a favor — carrusel dark estilo "Todo incluido desde el día uno" */}
        <section className="relative overflow-hidden px-5 pt-24 pb-[60px] tablet:px-10 tablet:pt-32 tablet:pb-[60px]">
          <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[640px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(219,59,43,0.12) 0%, transparent 66%)", filter: "blur(46px)" }} />
          <div className="relative mx-auto max-w-[var(--max-w)]">
            <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
              <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
                Todo para operar tus cobros
              </h2>
              <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
                Links de pago, panel en tiempo real e integraciones, listos desde el primer día.
              </p>
            </div>
            <div
              ref={incRef}
              onScroll={onIncScroll}
              className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pt-24 pb-2 tablet:mx-0 tablet:justify-center tablet:px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{ scrollPaddingLeft: 4, scrollPaddingRight: 4 }}
            >
              {[
                { title: "Links de pago", desc: "Cobra compartiendo un enlace por WhatsApp o redes, sin montar una tienda.", img: "/img/links-de-pago-v2.png" },
                { title: "Dashboard en vivo", desc: "Aprobación, conversión y liquidaciones en tiempo real desde un panel claro.", img: "/img/dashboard-pagos.png" },
                { title: "Módulo de contracargos", desc: "Gestiona disputas y contracargos desde el panel, con evidencia lista para ganar más casos.", img: "/img/contracargos-db-v2.png" },
              ].map((f) => (
                <div key={f.title} className="incluye-card flex w-[80vw] max-w-[320px] shrink-0 snap-start flex-col rounded-[18px] border border-white/[0.08] bg-white/[0.03] tablet:w-[300px] tablet:max-w-none" style={{ boxShadow: "0 26px 60px -28px rgba(0,0,0,0.8)" }}>
                  {/* Imagen que sobresale del borde superior */}
                  <div className="relative" style={{ height: 118 }}>
                    <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -56, width: "94%", height: 196 }}>
                      <Image src={f.img} alt={f.title} fill className="pointer-events-none object-contain" style={{ objectPosition: "center top", filter: "drop-shadow(0 22px 34px rgba(0,0,0,0.6))" }} sizes="300px" />
                    </div>
                  </div>
                  <div className="px-6 pb-7 pt-1">
                    <h3 className="font-sora text-[18px] font-normal text-white" style={{ marginBottom: 8, letterSpacing: "-0.02em" }}>{f.title}</h3>
                    <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 tablet:hidden">
              {Array.from({ length: incPages }, (_, i) => i).map((i) => (
                <button key={i} type="button" onClick={() => incGoTo(i)} aria-label={`Ir a la tarjeta ${i + 1}`} className="cursor-pointer rounded-full border-none p-0 transition-all duration-200" style={{ width: incIdx === i ? 22 : 8, height: 8, background: incIdx === i ? "#DB3B2B" : "rgba(255,255,255,0.22)" }} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats (fondo transparente: hereda el degradado) */}
        <section className="relative px-5 py-20 tablet:px-10 tablet:py-24">
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
      </div>

      {/* ── FAQ ── */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}>Preguntas frecuentes</h2>
          </div>
          <div data-modal-animate className="flex flex-col gap-3">
            {[
              { q: "¿Qué métodos de pago puedo aceptar?", a: "Tarjetas Visa, Mastercard y AMEX (crédito y débito), SPEI, transferencias, Kueski y meses sin intereses hasta 18 meses." },
              { q: "¿Cuánto tarda en llegar mi dinero?", a: "Liquidación T+1 hábil para tarjetas. SPEI y transferencias se acreditan en cuestión de minutos." },
              { q: "¿Cómo me integro?", a: "Con plugin para Shopify, WooCommerce, VTEX y Magento, o con nuestra API REST y SDKs. La mayoría empieza a cobrar el mismo día." },
              { q: "¿Necesito contrato con cada banco?", a: "No. Con un solo contrato T1 te conecta a múltiples procesadores y enruta cada cobro al de mayor aprobación." },
              { q: "¿Es seguro?", a: "Sí. Cumplimos PCI DSS, tokenizamos los datos y cada transacción pasa por antifraude T1 Score en menos de 100ms." },
            ].map((f, i) => (
              <details key={f.q} data-stagger className="group rounded-[14px] border border-white/[0.08] bg-white/[0.03] transition-all duration-200 open:border-[rgba(219,59,43,0.4)] open:bg-white/[0.05]" style={{ ["--i" as string]: i }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-white transition-colors duration-150 hover:text-[#FF6F5E]">
                  {f.q}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#FF6F5E]"><path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </summary>
                <p className="px-6 pb-5 font-inter text-[14px] font-light text-white/60" style={{ lineHeight: 1.65 }}>{f.a}</p>
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
