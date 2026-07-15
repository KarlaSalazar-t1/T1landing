"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import T1FinalCTA from "@/components/T1FinalCTA";

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";

function CountUp({ end, prefix = "", suffix = "", decimals = 0 }: { end: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const STEPS = 42;
    let i = 0;
    const id = setInterval(() => {
      i++;
      const p = i / STEPS;
      const eased = 1 - Math.pow(1 - p, 3);
      setV(end * eased);
      if (i >= STEPS) {
        setV(end);
        clearInterval(id);
      }
    }, 32);
    return () => clearInterval(id);
  }, [end]);
  const num = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US");
  return <>{prefix}{num}{suffix}</>;
}

const MOTIVOS = [
  { name: "No recibido", pct: 38.5, color: "#DB3B2B", delay: "0s" },
  { name: "No reconoce cargo", pct: 24.2, color: "#E2685C", delay: "0.12s" },
  { name: "Duplicado", pct: 18.1, color: "#F59E0B", delay: "0.24s" },
  { name: "Producto defectuoso", pct: 12.8, color: "#3B82F6", delay: "0.36s" },
  { name: "Cancelación tardía", pct: 6.4, color: "#8B5CF6", delay: "0.48s" },
];

const TABLE_ROWS = [
  { id: "DSP-4501", amt: "$3,450.00", motivo: "Producto no recibido", proc: "Checkout", plazo: "5 días", plazoRed: true, estado: "Abierta", badge: "open" },
  { id: "DSP-4502", amt: "$1,280.00", motivo: "No reconoce el cargo", proc: "Paga con T1", plazo: "12 días", plazoRed: false, estado: "En revisión", badge: "rev" },
  { id: "DSP-4503", amt: "$890.00", motivo: "Duplicado", proc: "Link de pago", plazo: "3 días", plazoRed: true, estado: "Abierta", badge: "open" },
  { id: "DSP-4504", amt: "$2,100.00", motivo: "Producto defectuoso", proc: "Checkout", plazo: "—", plazoRed: false, estado: "Ganada", badge: "won" },
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
  { n: "04", title: "Da seguimiento a la resolución", desc: "Consulta cambios de estado y la respuesta del banco o procesador desde el panel." },
];

/* Marco de teléfono (responsive) */
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 340, fontFamily: MANROPE }}>
      <div className="relative overflow-hidden bg-white" style={{ borderRadius: 44, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
        <div className="px-5 pt-6 pb-7">{children}</div>
      </div>
    </div>
  );
}

function MotivosBars() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 250);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="rounded-[14px] border border-black/[0.08] bg-white px-4 py-4" style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
      <div style={{ fontFamily: MANROPE }}>
        <p className="text-[11px] font-medium text-black/55" style={{ marginBottom: 12 }}>Motivos de disputa</p>
        <div className="flex flex-col gap-2.5">
          {MOTIVOS.map((m) => (
            <div key={m.name} className="flex items-center gap-3">
              <span className="w-[110px] shrink-0 truncate text-right text-[11px] text-black/70">{m.name}</span>
              <div className="relative h-[10px] flex-1 overflow-hidden rounded-full bg-black/[0.05]">
                <div className="h-full rounded-full" style={{ width: on ? `${(m.pct / 38.5) * 100}%` : "0%", background: m.color, transition: "width 1.5s cubic-bezier(0.33,1,0.68,1)", transitionDelay: m.delay }} />
              </div>
              <span className="w-[50px] shrink-0 text-right text-[11px] font-semibold text-black/75">{m.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function T1Reclamaciones() {
  const rootRef = useRef<HTMLDivElement>(null);
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
      <section className="relative flex items-center overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]" style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}>
        <div className="relative mx-auto w-full max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] tablet:gap-16">
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]" style={{ lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 22 }}>
                Ten visibilidad y gestiona{" "}
                <span className="relative inline-block">reclamaciones<span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.35)", borderRadius: 5, zIndex: -1 }} /></span>
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                Recibe alertas, responde con evidencia, controla plazos y da seguimiento a cada reclamación desde un solo panel.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-full bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">Gestionar reclamaciones</a>
              </div>
            </div>

            {/* Visual — mobile: phone-shell */}
            <div className="tablet:hidden">
              <div className="relative">
                <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-[52px]" style={{ background: "radial-gradient(circle at 70% 20%, rgba(219,59,43,0.18) 0%, transparent 62%)", filter: "blur(32px)" }} />
                <div className="relative">
                  <PhoneShell>
                    <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 14 }}>
                      {[
                        { l: "Disputas abiertas", v: <CountUp end={8} /> },
                        { l: "Tasa de CB", v: <CountUp end={0.42} decimals={2} suffix="%" /> },
                        { l: "Monto en disputa", v: <CountUp end={14820} prefix="$" /> },
                        { l: "Ganadas", v: <CountUp end={12} /> },
                      ].map((s) => (
                        <div key={s.l} className="rounded-[14px] border border-black/[0.08] bg-white px-3.5 py-3.5" style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
                          <p className="text-[12px] font-medium text-black/60" style={{ marginBottom: 6 }}>{s.l}</p>
                          <p className="font-sora text-[20px] font-semibold text-black" style={{ lineHeight: 1 }}>{s.v}</p>
                        </div>
                      ))}
                    </div>
                    <MotivosBars />
                  </PhoneShell>
                </div>
              </div>
            </div>

            {/* Visual — desktop: 2 stacked cards */}
            <div className="hidden tablet:block">
              <div className="relative mx-auto flex w-full flex-col gap-4" style={{ maxWidth: 460, fontFamily: MANROPE }}>
                <div className="rounded-[18px] border border-black/[0.08] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]" style={{ padding: 26, boxShadow: "0 16px 50px rgba(0,0,0,0.18)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                    <p className="text-[15px] font-semibold text-black">Disputas abiertas</p>
                    <span className="flex items-center gap-1.5 text-[10px] text-black/40"><span className="h-[6px] w-[6px] rounded-full bg-[#F59E0B]" style={{ animation: "pulse-soft 1.6s ease-in-out infinite" }} />requieren atención</span>
                  </div>
                  <p className="font-sora text-[44px] font-light text-black tabular-nums" style={{ lineHeight: 1, marginBottom: 12 }}><CountUp end={8} /></p>
                  <p className="text-[13px] font-light text-black/55" style={{ lineHeight: 1.5 }}>Chargebacks y disputas pendientes de respuesta o evidencia.</p>
                </div>
                <div className="rounded-[18px] border border-black/[0.08] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]" style={{ padding: 26, boxShadow: "0 16px 50px rgba(0,0,0,0.18)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both", animationDelay: "0.12s" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                    <p className="text-[15px] font-semibold text-black">Tasa de contracargos</p>
                    <span className="flex items-center gap-1.5 text-[10px] text-black/40"><span className="h-[6px] w-[6px] rounded-full bg-[#16A34A]" style={{ animation: "pulse-soft 1.6s ease-in-out infinite" }} />saludable</span>
                  </div>
                  <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
                    <p className="font-sora text-[44px] font-light text-black tabular-nums" style={{ lineHeight: 1 }}><CountUp end={0.42} decimals={2} suffix="%" /></p>
                    <span className="rounded-full bg-[rgba(22,163,74,0.10)] px-2.5 py-1 text-[12px] font-semibold text-[#16A34A]" style={{ animation: "rastreoReveal 0.4s ease both", animationDelay: "0.5s" }}>-0.15%</span>
                  </div>
                  <p className="text-[13px] font-light text-black/55" style={{ lineHeight: 1.5 }}>8 / 1,904 transacciones · últimos 30 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ TODAS TUS DISPUTAS ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 gap-12 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] tablet:items-center tablet:gap-16">
            <div data-modal-animate>
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[38px] lg:text-[46px]" style={{ letterSpacing: "-1.3px", lineHeight: 1.1, marginBottom: 18 }}>Todas tus reclamaciones en un solo lugar.</h2>
              <p className="font-inter text-[15px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>Reunimos las reclamaciones de los cobros que procesas con T1 Pagos —tu checkout, un link de pago o Paga con T1— para que las respondas a tiempo desde un solo panel.</p>
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
                  <h4 className="text-[22px] font-bold text-black" style={{ letterSpacing: "-0.5px" }}>Disputas</h4>
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
                      <div key={r.id} className="grid items-center gap-2 px-3 py-2.5 transition-colors duration-150 hover:bg-[#FAFAF9]" style={{ gridTemplateColumns: TABLE_COLS, borderBottom: i === arr.length - 1 ? "none" : "1px solid rgba(0,0,0,0.05)" }}>
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
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-1.3px", lineHeight: 1.1, marginBottom: 14 }}>Cómo gestionas una disputa en T1</h2>
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
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>Responde con evidencia completa.</h2>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>Responde fácilmente, sin correos o llamadas. Adjunta comprobantes, facturas y capturas de guías directamente desde T1. Todo queda vinculado a la disputa.</p>
              <ul className="flex flex-col gap-2.5">
                {["Sube evidencia sin salir del panel", "Historial completo de cada caso", "Notificación inmediata de resolución"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CONTROLA TU TASA ════════════ */}
      <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[38px] lg:text-[46px]" style={{ letterSpacing: "-1.3px", lineHeight: 1.1, marginBottom: 14 }}>Controla tu tasa de contracargos</h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>Visibilidad total sobre disputas, resoluciones y el impacto en tu operación.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3" style={{ fontFamily: MANROPE }}>
            {[
              { l: "Tasa de contracargos", v: "0.42%", c: "#16A34A", d: "Dentro del rango saludable (<1%)" },
              { l: "Disputas ganadas", v: "72%", c: "#0E0E0E", d: "12 de 17 resueltas a tu favor" },
              { l: "Monto recuperado", v: "$28,450", c: "#0E0E0E", d: "En los últimos 30 días" },
            ].map((s) => (
              <div key={s.l} className="rounded-[18px] border border-black/[0.06] bg-white px-6 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <p className="text-[13px] font-medium text-black/55" style={{ marginBottom: 10 }}>{s.l}</p>
                <p className="font-sora text-[32px] font-light tabular-nums" style={{ lineHeight: 1, color: s.c, marginBottom: 8 }}>{s.v}</p>
                <p className="text-[12px] text-black/45">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>Preguntas frecuentes</h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "¿Qué es un chargeback?", a: "Un contracargo ocurre cuando un tarjetahabiente solicita a su banco la devolución de un cobro. El comercio tiene un plazo limitado para presentar evidencia y defender la transacción." },
              { q: "¿Cómo me ayuda T1 a responder?", a: "T1 centraliza las disputas de todos tus procesadores, te alerta apenas llegan, te permite adjuntar evidencia directo desde el panel y controla los plazos para que nunca pierdas uno." },
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
