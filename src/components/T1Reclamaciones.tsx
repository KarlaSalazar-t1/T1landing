"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import T1FinalCTA from "@/components/T1FinalCTA";

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";


const TABLE_ROWS = [
  { id: "DSP-4501", amt: "$3,450.00", motivo: "Producto no recibido", proc: "Checkout", plazo: "5 días", plazoRed: true, estado: "Abierta", badge: "open" },
  { id: "DSP-4502", amt: "$1,280.00", motivo: "No reconoce el cargo", proc: "Paga con T1", plazo: "12 días", plazoRed: false, estado: "En revisión", badge: "rev" },
  { id: "DSP-4503", amt: "$890.00", motivo: "Duplicado", proc: "Link de pago", plazo: "3 días", plazoRed: true, estado: "Abierta", badge: "open" },
  { id: "DSP-4504", amt: "$2,100.00", motivo: "Producto defectuoso", proc: "Checkout", plazo: "—", plazoRed: false, estado: "Ganada", badge: "won" },
  { id: "DSP-4505", amt: "$560.00", motivo: "Cancelación tardía", proc: "Paga con T1", plazo: "8 días", plazoRed: false, estado: "En revisión", badge: "rev" },
];
const badgeCls = (b: string) => (b === "won" ? "bg-[rgba(22,163,74,0.10)] text-[#16A34A]" : b === "rev" ? "bg-black/[0.06] text-black/55" : "bg-[rgba(245,158,11,0.12)] text-[#B45309]");
const TABLE_COLS = "0.8fr 0.7fr 1.1fr 0.7fr 0.6fr 0.7fr";

const DETAIL_FIELDS: [string, string][] = [
  ["ID de disputa", "DSP-4501"],
  ["Transacción original", "TXN-82190"],
  ["Monto disputado", "$3,450.00"],
  ["Canal", "Checkout"],
  ["Motivo", "Producto no recibido"],
  ["Fecha de apertura", "28/06/2026"],
  ["Plazo de respuesta", "03/07/2026"],
  ["Días restantes", "5 días"],
];
const FILES = [
  { name: "comprobante-entrega.pdf", size: "245 KB", type: "PDF", color: "#DB3B2B", bg: "rgba(219,59,43,0.08)" },
  { name: "factura-venta.pdf", size: "128 KB", type: "PDF", color: "#DB3B2B", bg: "rgba(219,59,43,0.08)" },
  { name: "captura-tracking.png", size: "890 KB", type: "IMG", color: "#3B82F6", bg: "rgba(59,130,246,0.08)" },
];
const HIST = [
  { t: "Disputa recibida del procesador", d: "28/06/2026 · 09:14 AM", c: "#F59E0B" },
  { t: "Evidencia enviada automáticamente", d: "28/06/2026 · 09:16 AM", c: "#3B82F6" },
  { t: "En revisión por el banco emisor", d: "29/06/2026 · 02:30 PM", c: "#8B5CF6" },
];

const STEPS = [
  { n: "01", title: "Recibe la notificación", desc: "T1 muestra la disputa cuando llega desde el procesador conectado." },
  { n: "02", title: "Revisa el motivo y el plazo", desc: "Consulta monto, transacción, motivo de reclamación y fecha límite de respuesta." },
  { n: "03", title: "Adjunta evidencia", desc: "Sube comprobantes de entrega, facturas, capturas de tracking o documentos solicitados." },
  { n: "04", title: "Da seguimiento a la resolución", desc: "Consulta cambios de estado y la respuesta del banco o procesador desde el administrador." },
];

/* Panel simulado (responsive) — radio 12, sombra sutil */
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 360, fontFamily: MANROPE }}>
      <div className="relative overflow-hidden bg-white" style={{ borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
        <div className="px-5 py-6">{children}</div>
      </div>
    </div>
  );
}

/* Hero — cards glass (fondo blanco transparente) estilo Reportería logística */
function ReclamGlassCards({ className = "", stagger = false }: { className?: string; stagger?: boolean }) {
  const SNAPS = [
    { abiertas: 8, tasa: 0.42, ganadas: 72 },
    { abiertas: 7, tasa: 0.40, ganadas: 74 },
    { abiertas: 9, tasa: 0.45, ganadas: 71 },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % SNAPS.length), 2800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const s = SNAPS[i];
  const cards = [
    { l: "Reclamaciones abiertas", v: String(s.abiertas), d: "requieren atención", kind: "amber" },
    { l: "Tasa de contracargos", v: `${s.tasa.toFixed(2)}%`, d: "-0.15%", kind: "up" },
    { l: "Disputas ganadas", v: `${s.ganadas}%`, d: "saludable", kind: "up" },
  ];
  const chip = (k: string) => (k === "amber" ? { bg: "rgba(245,158,11,0.18)", c: "#FBBF6B" } : k === "up" ? { bg: "rgba(34,197,94,0.16)", c: "#7CE0A0" } : { bg: "rgba(219,59,43,0.20)", c: "#FF8A7A" });
  return (
    <div className={`mx-auto flex w-full max-w-[320px] flex-col gap-4 ${className}`} style={{ fontFamily: MANROPE }}>
      {cards.map((c, idx) => (
        <div key={c.l} style={{ transform: stagger && idx === 1 ? "translateX(-38px)" : undefined }}>
          <div className="rounded-[18px] border border-white/[0.16] px-6 py-5" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", boxShadow: "0 16px 44px rgba(0,0,0,0.28)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both", animationDelay: `${idx * 0.1}s` }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
              <p className="text-[13px] font-medium text-white/70">{c.l}</p>
              <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: chip(c.kind).bg, color: chip(c.kind).c }}>{c.d}</span>
            </div>
            <p key={`${s.abiertas}-${idx}`} className="font-sora text-[34px] font-light text-white tabular-nums" style={{ lineHeight: 1, animation: "countBump 0.45s ease-out" }}>{c.v}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function T1Reclamaciones() {
  const rootRef = useRef<HTMLDivElement>(null);
  const chanRef = useRef<HTMLDivElement>(null);
  const scrollChan = (dir: number) => {
    const el = chanRef.current;
    const card = el?.querySelector<HTMLElement>(".chan-card");
    const step = card ? card.offsetWidth + 20 : (el?.clientWidth ?? 0) * 0.8;
    el?.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("modal-visible"); }),
      { root: null, threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    root.querySelectorAll("[data-modal-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="w-full" style={{ ["--max-w" as string]: "1220px" }}>
      {/* ════════════ HERO ════════════ */}
      <section className="relative flex items-center overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]" style={{ background: "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%), linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)" }}>
        <div className="relative mx-auto w-full max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] tablet:gap-16">
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]" style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 22 }}>
                Ten visibilidad y gestiona{" "}
                <span className="relative inline-block">reclamaciones<span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.35)", borderRadius: 5, zIndex: -1 }} /></span>
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                Recibe alertas, responde con evidencia, controla plazos y da seguimiento a cada reclamación desde el administrador.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-full bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">Gestionar reclamaciones</a>
              </div>
            </div>

            {/* Visual — cards glass sobre imagen 3D (estilo Reportería) */}
            <ReclamGlassCards className="tablet:hidden" />
            <div className="relative hidden tablet:block">
              <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[28px]" style={{ background: "radial-gradient(circle at 70% 20%, rgba(219,59,43,0.18) 0%, transparent 62%)", filter: "blur(32px)" }} />
              <Image src="/img/contracargo-hero.png" alt="" width={1536} height={1024} priority className="pointer-events-none absolute z-0 object-contain" style={{ right: "-10%", top: "-30%", width: "104%", height: "auto", filter: "drop-shadow(0 24px 50px rgba(0,0,0,0.5))" }} />
              <div className="relative z-10 tablet:-translate-x-24">
                <ReclamGlassCards stagger />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SIN COMPLICACIONES — 3 cards ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[720px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[38px] lg:text-[46px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
              Responde tus reclamaciones sin complicaciones
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Con T1 ves qué pasó, qué evidencia necesitas, cuánto tiempo tienes para responder y puedes dar seguimiento al caso desde un solo lugar.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-5 tablet:grid-cols-3 tablet:gap-6">
            {[
              { title: "Sin investigar qué sigue", desc: "T1 te muestra el motivo de la reclamación, el plazo y la acción que debes tomar.", icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#111827" strokeWidth="1.7" /><path d="M20 20l-3.5-3.5" stroke="#111827" strokeWidth="1.7" strokeLinecap="round" /></svg>) },
              { title: "Sin correos separados", desc: "Responde desde el administrador, adjunta evidencia y mantén todo vinculado al caso.", icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#111827" strokeWidth="1.7" /><path d="M4 7l8 6 8-6" stroke="#111827" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Sin perder visibilidad", desc: "Consulta el estado, historial y resolución de cada reclamación en línea.", icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="#111827" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="#111827" strokeWidth="1.7" /></svg>) },
            ].map((c, i) => (
              <div key={c.title} data-stagger className="tienda-card flex flex-col rounded-[18px] border border-black/[0.06] bg-white p-7" style={{ ["--i" as string]: i, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <div className="flex h-[40px] w-[40px] items-center justify-center" style={{ marginBottom: 18 }}>{c.icon}</div>
                <h3 className="font-sora text-[19px] font-normal text-black" style={{ marginBottom: 8, letterSpacing: "-0.02em" }}>{c.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CANALES — estilo "Crea productos como prefieras" ════════════ */}
      <section className="relative overflow-hidden bg-[#FBFBFB] px-5 py-[100px] tablet:px-10 tablet:py-[128px]">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] tablet:items-center tablet:gap-14">
            <div data-modal-animate>
              <h2 className="font-sora text-[32px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16, maxWidth: 420 }}>
                Reclamaciones de tus cobros con T1
              </h2>
              <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 400 }}>
                Gestionamos las reclamaciones de los pagos que procesas con T1 Pagos, sin importar por dónde cobres.
              </p>
              <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                Gestionar reclamaciones
              </a>
            </div>
            <div data-modal-animate className="flex flex-col gap-5">
              <div ref={chanRef} className="-mr-5 flex gap-5 overflow-x-auto pb-2 pr-5 tablet:mr-0 tablet:pr-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {[
                  { title: "Checkout", desc: "Cobros desde el checkout de tu tienda en línea.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#111827" strokeWidth="1.6" /><path d="M3 9h18 M7 14h4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
                  { title: "Link de pago", desc: "Cobros con un enlace que compartes por WhatsApp o redes.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
                  { title: "Paga con T1", desc: "Cobros con la cuenta T1 de tus clientes, en un tap.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /></svg>) },
                ].map((c) => (
                  <div key={c.title} className="chan-card flex w-[240px] shrink-0 snap-start flex-col rounded-[20px] border border-black/[0.07] bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#FAFAF9]" style={{ marginBottom: 18 }}>{c.icon}</div>
                    <h3 className="font-sora text-[19px] font-normal text-black" style={{ marginBottom: 8 }}>{c.title}</h3>
                    <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.55, minHeight: 63 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => scrollChan(-1)} aria-label="Anterior" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black/55 transition-colors hover:border-black/30 hover:text-black">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" onClick={() => scrollChan(1)} aria-label="Siguiente" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black/55 transition-colors hover:border-black/30 hover:text-black">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ TODAS TUS RECLAMACIONES ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 gap-12 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] tablet:items-center tablet:gap-16">
            <div data-modal-animate>
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[38px] lg:text-[46px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }}>Reclamaciones en un solo lugar.</h2>
              <p className="font-inter text-[15px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>Reunimos las reclamaciones de los cobros que procesas con T1 Pagos para que las respondas a tiempo desde el administrador.</p>
              <ul className="flex flex-col gap-2.5">
                {["Reclamaciones de tus cobros con T1 Pagos", "Desde tu checkout, link de pago o Paga con T1", "Control de plazos con alertas automáticas"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{it}
                  </li>
                ))}
              </ul>
            </div>

            {/* mobile phone-shell */}
            <div className="tablet:hidden">
              <PhoneShell>
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <h4 className="text-[22px] font-bold text-black" style={{ letterSpacing: "-0.02em" }}>Disputas</h4>
                  <span className="rounded-[11px] px-3.5 py-2 text-[12px] font-semibold text-white" style={{ background: "#DB3B2B" }}>Responder</span>
                </div>
                <p className="text-[13px] font-light text-black/55" style={{ lineHeight: 1.45, marginBottom: 16 }}>Gestiona chargebacks y disputas de todos tus procesadores en un solo lugar.</p>
                <div className="grid grid-cols-2 gap-2.5" style={{ marginBottom: 14 }}>
                  <div className="rounded-[13px] border border-black/[0.08] px-3.5 py-3">
                    <p className="text-[12px] font-semibold text-black/70">Abiertas</p>
                    <p className="font-sora text-[30px] font-light text-black" style={{ lineHeight: 1.15 }}>8</p>
                    <p className="text-[10px] text-black/45" style={{ lineHeight: 1.3 }}>Pendientes de respuesta.</p>
                  </div>
                  <div className="rounded-[13px] border border-black/[0.08] px-3.5 py-3">
                    <p className="text-[12px] font-semibold text-black/70">Tasa de CB</p>
                    <div className="flex items-center gap-1.5"><p className="font-sora text-[24px] font-light text-black" style={{ lineHeight: 1.15 }}>0.42%</p><span className="rounded-full bg-[rgba(22,163,74,0.10)] px-1.5 py-0.5 text-[10px] font-semibold text-[#16A34A]">-0.15%</span></div>
                    <p className="text-[10px] text-black/45">8 / 1,904 txns</p>
                  </div>
                </div>
                {[TABLE_ROWS[0], TABLE_ROWS[2], TABLE_ROWS[3]].map((r) => (
                  <div key={r.id} className="flex items-center gap-3" style={{ paddingTop: 12, paddingBottom: 12, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <div className="min-w-0 flex-1"><p className="text-[13px] font-bold text-black">{r.id}</p><p className="truncate text-[11px] text-black/50">{r.motivo}</p></div>
                    <p className="shrink-0 text-[13px] font-semibold text-black">{r.amt}</p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeCls(r.badge)}`}>{r.estado}</span>
                  </div>
                ))}
              </PhoneShell>
            </div>

            {/* desktop table */}
            <div data-modal-animate className="hidden tablet:block">
              <div className="flex flex-col gap-4" style={{ fontFamily: MANROPE }}>
                <div className="rounded-[18px] border border-black/[0.07] bg-white transition-all duration-300 hover:shadow-[0_18px_44px_rgba(0,0,0,0.10)]" style={{ padding: 24, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
                    <p className="text-[16px] font-semibold text-black">Disputas recientes</p>
                    <span className="rounded-[10px] bg-[#DB3B2B] px-3 py-1.5 text-[11px] font-semibold text-white">Responder disputa</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3" style={{ marginBottom: 18 }}>
                    {[{ l: "Abiertas", v: "8", c: "#F59E0B" }, { l: "Ganadas este mes", v: "12", c: "#16A34A" }, { l: "Monto en disputa", v: "$14,820", c: "#DB3B2B" }].map((s) => (
                      <div key={s.l} className="rounded-[12px] border border-black/[0.06] px-3 py-2.5">
                        <p className="text-[11px] text-black/50">{s.l}</p>
                        <p className="font-sora text-[18px] font-light" style={{ lineHeight: 1.2, color: s.c }}>{s.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="overflow-hidden rounded-[10px] border border-black/[0.06]">
                    <div className="grid gap-2 bg-[#FAFAF9] px-3 py-2" style={{ gridTemplateColumns: TABLE_COLS }}>
                      {["Disputa", "Monto", "Motivo", "Canal", "Plazo", "Estado"].map((h) => (<span key={h} className="text-[10px] font-medium text-black/50">{h}</span>))}
                    </div>
                    {TABLE_ROWS.map((r, i, arr) => (
                      <div key={r.id} className="grid items-center gap-2 px-3 py-3 transition-colors duration-150 hover:bg-[#FAFAF9]" style={{ gridTemplateColumns: TABLE_COLS, borderBottom: i === arr.length - 1 ? "none" : "1px solid rgba(0,0,0,0.05)" }}>
                        <span className="text-[11px] font-semibold text-black">{r.id}</span>
                        <span className="text-[11px] text-black/75">{r.amt}</span>
                        <span className="truncate text-[10px] text-black/60">{r.motivo}</span>
                        <span className="text-[10px] text-black/60">{r.proc}</span>
                        <span className={`text-[10px] font-semibold ${r.plazoRed ? "text-[#DB3B2B]" : "text-black/50"}`}>{r.plazo}</span>
                        <span className={`justify-self-start rounded-full px-2 py-0.5 text-[9px] font-semibold ${badgeCls(r.badge)}`}>{r.estado}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CÓMO RESOLVEMOS — stepper ════════════ */}
      <section className="relative px-5 py-24 tablet:px-10 tablet:py-32" style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-[360px] w-[680px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(219,59,43,0.12) 0%, transparent 64%)", filter: "blur(44px)" }} />
        <div className="relative mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 14 }}>Cómo gestionas una disputa en T1</h2>
            <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>De la notificación a la resolución, con evidencia, plazos y seguimiento en un solo lugar.</p>
          </div>
          <div className="relative">
            <div aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(180deg, rgba(219,59,43,0.5) 0%, rgba(255,255,255,0.08) 100%)" }} />
            <div className="flex flex-col gap-8">
              {STEPS.map((s, i) => (
                <div key={s.n} data-modal-animate data-stagger className="relative flex gap-5" style={{ ["--i" as string]: i }}>
                  <div className="relative z-10 flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#161616]"><span className="font-sora text-[14px] font-light text-[#FF6F5E]">{s.n}</span></div>
                  <div className="flex-1 rounded-[16px] border border-white/[0.08] bg-white/[0.03] px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05]">
                    <h3 className="font-sora text-[18px] font-normal text-white tablet:text-[20px]" style={{ marginBottom: 6 }}>{s.title}</h3>
                    <p className="font-inter text-[14px] font-light text-white/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ RESPONDE CON EVIDENCIA ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-2 tablet:gap-16">
            {/* mobile compact */}
            <div className="order-2 tablet:hidden">
              <PhoneShell>
                <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                  <p className="text-[18px] font-semibold text-black">DSP-4501</p>
                  <span className="rounded-full bg-[rgba(245,158,11,0.12)] px-2.5 py-1 text-[11px] font-semibold text-[#B45309]">Abierta</span>
                </div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-4" style={{ marginBottom: 18 }}>
                  {([["Monto", "$3,450.00"], ["Canal", "Checkout"], ["Motivo", "Producto no recibido"], ["Plazo", "5 días"]] as [string, string][]).map(([l, v]) => (
                    <div key={l}><p className="text-[12px] text-black/45" style={{ marginBottom: 2 }}>{l}</p><p className="text-[14px] text-black/80">{v}</p></div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 14 }}>
                  <p className="text-[14px] font-semibold text-black" style={{ marginBottom: 10 }}>Evidencia</p>
                  {FILES.slice(0, 2).map((f) => (
                    <div key={f.name} className="flex items-center gap-3" style={{ paddingTop: 8, paddingBottom: 8 }}>
                      <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[7px]" style={{ background: f.bg }}><span className="text-[9px] font-bold" style={{ color: f.color }}>{f.type}</span></div>
                      <div className="min-w-0 flex-1"><p className="truncate text-[13px] text-black/70">{f.name}</p><p className="text-[10px] text-black/40">{f.size}</p></div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L19 7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 14, marginTop: 6 }}>
                  <p className="text-[14px] font-semibold text-black" style={{ marginBottom: 10 }}>Historial</p>
                  {[{ t: "Disputa recibida", d: "28/06 · 09:14", c: "#F59E0B" }, { t: "Evidencia enviada", d: "28/06 · 09:16", c: "#3B82F6" }, { t: "En revisión bancaria", d: "29/06 · 14:30", c: "#8B5CF6" }].map((hh) => (
                    <div key={hh.t} className="flex items-start gap-3" style={{ paddingTop: 6, paddingBottom: 6 }}>
                      <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full" style={{ background: `${hh.c}20` }}><span className="h-[7px] w-[7px] rounded-full" style={{ background: hh.c }} /></span>
                      <div className="min-w-0 flex-1"><p className="text-[13px] text-black/75">{hh.t}</p><p className="text-[10px] text-black/40">{hh.d}</p></div>
                    </div>
                  ))}
                </div>
              </PhoneShell>
            </div>

            {/* desktop full detail */}
            <div className="order-2 hidden tablet:order-1 tablet:block">
              <div style={{ fontFamily: MANROPE }}>
                <div className="rounded-[18px] border border-black/[0.07] bg-white transition-all duration-300 hover:shadow-[0_18px_44px_rgba(0,0,0,0.10)]" style={{ padding: 24, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
                    <p className="text-[16px] font-semibold text-black">Detalle de disputa</p>
                    <span className="rounded-full bg-[rgba(245,158,11,0.12)] px-2.5 py-1 text-[11px] font-semibold text-[#B45309]">Abierta · 5 días</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4" style={{ marginBottom: 20 }}>
                    {DETAIL_FIELDS.map(([l, v]) => (<div key={l}><p className="text-[11px] text-black/45" style={{ marginBottom: 2 }}>{l}</p><p className="text-[13px] text-black/80">{v}</p></div>))}
                  </div>
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16 }}>
                    <p className="text-[13px] font-semibold text-black" style={{ marginBottom: 12 }}>Evidencia adjunta</p>
                    <div className="flex flex-col gap-2.5">
                      {FILES.map((f) => (
                        <div key={f.name} className="flex items-center gap-3 rounded-[10px] border border-black/[0.06] px-3 py-2.5 transition-colors duration-150 hover:bg-[#FAFAF9]">
                          <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px]" style={{ background: f.bg }}><span className="text-[10px] font-bold" style={{ color: f.color }}>{f.type}</span></div>
                          <div className="min-w-0 flex-1"><p className="truncate text-[12px] text-black/75">{f.name}</p><p className="text-[10px] text-black/40">{f.size}</p></div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L19 7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16, marginTop: 16 }}>
                    <p className="text-[13px] font-semibold text-black" style={{ marginBottom: 12 }}>Historial</p>
                    <div className="flex flex-col gap-3">
                      {HIST.map((hh) => (
                        <div key={hh.t} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full" style={{ background: `${hh.c}20` }}><span className="h-[7px] w-[7px] rounded-full" style={{ background: hh.c }} /></span>
                          <div className="min-w-0 flex-1"><p className="text-[12px] text-black/75">{hh.t}</p><p className="text-[10px] text-black/40">{hh.d}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 tablet:order-2">
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }}>Responde con evidencia completa.</h2>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>Responde fácilmente, sin correos o llamadas. Adjunta comprobantes, facturas y capturas de guías directamente desde T1. Todo queda vinculado a la disputa.</p>
              <ul className="flex flex-col gap-2.5">
                {["Sube evidencia sin salir del administrador", "Historial completo de cada caso", "Notificación inmediata de resolución"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>Preguntas frecuentes</h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "¿Qué es un chargeback?", a: "Un contracargo ocurre cuando un tarjetahabiente solicita a su banco la devolución de un cobro. El comercio tiene un plazo limitado para presentar evidencia y defender la transacción." },
              { q: "¿Cómo me ayuda T1 a responder?", a: "T1 reúne las reclamaciones de los cobros que procesas con T1 Pagos, te alerta apenas llegan, te permite adjuntar evidencia directo desde el administrador y controla los plazos para que nunca pierdas uno." },
              { q: "¿Qué pasa si no respondo a tiempo?", a: "Si vence el plazo sin respuesta, el banco falla automáticamente a favor del comprador y pierdes el monto. T1 te avisa con anticipación para evitarlo." },
              { q: "¿Puedo ver por qué me están disputando?", a: "Sí. Cada disputa incluye el motivo reportado por el banco: producto no recibido, cargo no reconocido, duplicado, etc. También ves estadísticas de los motivos más frecuentes." },
              { q: "¿Tiene costo adicional?", a: "No. La gestión de reclamaciones viene incluida en T1 Pagos sin cargo extra." },
            ].map((f) => (
              <details key={f.q} className="group rounded-[14px] border border-white/[0.08] bg-white/[0.03] transition-all duration-200 open:border-[rgba(219,59,43,0.4)] open:bg-white/[0.05]">
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

      <T1FinalCTA title="No pierdas otra disputa." description="Gestiona chargebacks con evidencia, plazos controlados y visibilidad total desde T1 Pagos." buttonLabel="Gestionar reclamaciones" />
    </div>
  );
}
