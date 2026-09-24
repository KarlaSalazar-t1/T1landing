"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";

/* ──────────────────────────────────────────────────────────────────────────
   El alta, con el mismo patrón que "Todo el ciclo de tu envío" de Envíos:
   título centrado, panel blanco simulado a la izquierda, los pasos clicables
   a la derecha y el CTA abajo. En móvil, puntos + swipe y el texto del paso
   activo arriba del panel.

   Los tres pasos son los del documento de copy: RFC, sello digital y el
   permiso que el SAT pide para que un sistema emita facturas a tu nombre.
   Nada de firma electrónica: no se pide.
   ────────────────────────────────────────────────────────────────────────── */

const FONT = "var(--font-inter), 'Inter', sans-serif";

/* ── Cromo compartido de las pantallas ── */
function Pantalla({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col" style={{ fontFamily: FONT }}>
      <div className="border-b border-black/[0.06] px-5 py-3.5">
        <span className="text-[13px] font-bold text-black">{title}</span>
      </div>
      <div className="flex-1 p-5">{children}</div>
    </div>
  );
}

function Campo({ label, value, check }: { label: string; value: string; check?: boolean }) {
  return (
    <div className="rounded-[12px] border border-black/[0.08] bg-white px-3.5 py-2.5">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.05em] text-black/35">{label}</span>
      <span className="mt-0.5 flex items-center gap-2">
        <span className="flex-1 truncate text-[13px] font-medium text-black">{value}</span>
        {check && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M5 12l4.5 4.5L19 7" stroke="#16A34A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </div>
  );
}

function Boton({ children, ghost }: { children: React.ReactNode; ghost?: boolean }) {
  return (
    <div
      className="flex h-[42px] items-center justify-center rounded-[12px] text-[13px] font-semibold"
      style={ghost ? { border: "1px solid rgba(0,0,0,0.10)", color: "rgba(0,0,0,0.55)" } : { background: "#DB3B2B", color: "#fff" }}
    >
      {children}
    </div>
  );
}

/* ── 1 · RFC ── */
function RfcScreen() {
  return (
    <Pantalla title="Tu negocio">
      <div className="flex flex-col gap-2.5">
        <Campo label="RFC" value="CVE240517J31" check />
        <Campo label="Nombre del negocio" value="Comercializadora Vega" />
        <Campo label="Código postal" value="64000" />
      </div>
      <p className="mt-4 text-[11px] leading-[1.5] text-black/40">
        ¿Tienes más de un negocio? Puedes agregar hasta 3 en la misma cuenta gratis.
      </p>
      <div className="mt-4">
        <Boton>Continuar</Boton>
      </div>
    </Pantalla>
  );
}

/* ── 2 · Sello digital ── */
function SelloScreen() {
  return (
    <Pantalla title="Tu sello digital">
      <div className="rounded-[12px] border border-dashed border-black/[0.14] bg-[#FAFAF9] px-4 py-5 text-center">
        <span className="mx-auto mb-2.5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#DB3B2B]/[0.10]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.5 19h15" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="block text-[12.5px] font-semibold text-black">Arrastra tus archivos aquí</span>
        <span className="mt-0.5 block text-[11px] text-black/40">Los que el SAT te dio: .cer y .key</span>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <Campo label="Certificado" value="00001000000512345678.cer" check />
        <Campo label="Llave privada" value="Claveprivada_FIEL.key" check />
        <Campo label="Contraseña" value="••••••••••" check />
      </div>

      <p className="mt-3.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#DB3B2B]">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
        </svg>
        Ver la guía en video
      </p>
    </Pantalla>
  );
}

/* ── 3 · El permiso del SAT ── */
function PermisoScreen() {
  return (
    <Pantalla title="Permiso del SAT">
      <div className="rounded-[12px] border border-black/[0.07] bg-[#FAFAF9] p-4">
        <p className="text-[12px] font-bold leading-[1.4] text-black">
          Permiso para emitir facturas a nombre de tu negocio
        </p>
        <div className="mt-3 flex flex-col gap-2" aria-hidden>
          {[100, 92, 97, 78, 88, 60].map((w, i) => (
            <span key={i} className="block h-[6px] rounded-full bg-black/[0.07]" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>

      <div className="mt-3.5 flex items-start gap-2.5 rounded-[12px] border border-black/[0.07] px-3.5 py-3">
        <span className="mt-[1px] flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[5px] bg-[#DB3B2B]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-[11.5px] leading-[1.45] text-black/60">
          Autorizo a T1 a emitir mis facturas. Se firma una sola vez.
        </span>
      </div>

      <div className="mt-4">
        <Boton>Firmar</Boton>
      </div>
      <p className="mt-3 text-center text-[11px] text-black/35">No te pedimos tu firma electrónica.</p>
    </Pantalla>
  );
}

/* ── 4 · Listo ── */
function ListoScreen() {
  return (
    <Pantalla title="Todo listo">
      <div className="flex h-full flex-col items-center justify-center text-center" style={{ paddingBottom: 24 }}>
        <span
          className="mb-4 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#16A34A]"
          style={{ animation: "checkPop 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="text-[15px] font-bold text-black">Ya puedes facturar</p>
        <p className="mt-1.5 max-w-[220px] text-[12px] leading-[1.5] text-black/45">
          Tienes 25 facturas gratis este mes, y otras 25 el mes que entra.
        </p>
        <div className="mt-5 w-full max-w-[200px]">
          <Boton ghost>Hacer mi primera factura</Boton>
        </div>
      </div>
    </Pantalla>
  );
}

/* ══════════ Sección ══════════ */
const FRAMES = [RfcScreen, SelloScreen, PermisoScreen, ListoScreen];
const DURS = [3600, 4200, 4000, 3600];
const FRAME_STEP = [0, 1, 2, 2];
const STEP_FIRST = [0, 1, 2];

const STEPS = [
  { n: "1", title: "Da de alta tu RFC", desc: "El de tu negocio. Puedes agregar hasta 3 en la misma cuenta gratis." },
  { n: "2", title: "Sube tu sello digital", desc: "Con una guía en video. Si no lo tienes, te decimos cómo sacarlo." },
  { n: "3", title: "Firma el permiso del SAT", desc: "El que pide para que un sistema emita facturas a tu nombre. Una sola vez." },
];

export default function T1FinanzasAlta() {
  const [frame, setFrame] = useState(0);
  const [started, setStarted] = useState(false);
  const [manual, setManual] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  const activeStep = FRAME_STEP[frame];
  const goToStep = (i: number) => {
    setManual(true);
    setFrame(STEP_FIRST[Math.min(STEPS.length - 1, Math.max(0, i))]);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) goToStep(activeStep + (dx < 0 ? 1 : -1));
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || manual) return;
    const id = setTimeout(() => setFrame((f) => (f + 1) % FRAMES.length), DURS[frame]);
    return () => clearTimeout(id);
  }, [frame, started, manual]);

  const Screen = FRAMES[frame];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0e0d0d] px-5 tablet:px-6" style={{ paddingTop: 90, paddingBottom: 90 }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.13) 0%, transparent 65%)", filter: "blur(50px)" }}
      />
      <div className="relative mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[760px] text-center" style={{ marginBottom: 48 }}>
          <h2
            className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
          >
            En tres pasos ya estás facturando
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:whitespace-nowrap tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
            Solo tu RFC y tu sello digital, los archivos que el SAT te da para firmar.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 tablet:grid-cols-2 tablet:gap-12 lg:gap-16">
          {/* Móvil — puntos y el texto del paso activo, arriba del panel */}
          <div className="tablet:hidden" style={{ touchAction: "pan-y" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="mb-4 flex items-center justify-center gap-1.5">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Paso ${i + 1}`}
                  onClick={() => goToStep(i)}
                  className="h-[10px] rounded-full transition-all duration-300"
                  style={{ width: activeStep === i ? 24 : 10, background: activeStep === i ? "#DB3B2B" : "rgba(255,255,255,0.22)" }}
                />
              ))}
            </div>
            <div key={activeStep} className="text-center" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
              <h3 className="font-sora text-[20px] font-normal text-white">{STEPS[activeStep].title}</h3>
              <p className="mx-auto max-w-[320px] font-inter text-[13px] font-light text-white/55" style={{ marginTop: 4, lineHeight: 1.5 }}>
                {STEPS[activeStep].desc}
              </p>
            </div>
          </div>

          {/* Panel simulado */}
          <div className="mx-auto w-full" style={{ maxWidth: 330, touchAction: "pan-y" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="select-none overflow-hidden rounded-[20px] bg-white" aria-hidden style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.4)", pointerEvents: "none" }}>
              <div style={{ height: 430, overflow: "hidden" }}>
                <div key={frame} className="h-full" style={{ animation: "heroWordIn 0.4s ease-out both" }}>
                  {started ? <Screen /> : null}
                </div>
              </div>
            </div>
          </div>

          {/* Pasos — solo desktop */}
          <div className="hidden flex-col gap-3 tablet:flex">
            {STEPS.map((s, i) => {
              const on = activeStep === i;
              return (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => goToStep(i)}
                  className="flex items-start gap-4 rounded-[14px] border p-4 text-left transition-all duration-300"
                  style={{
                    borderColor: on ? "rgba(219,59,43,0.5)" : "rgba(255,255,255,0.10)",
                    background: on ? "rgba(219,59,43,0.10)" : "rgba(255,255,255,0.02)",
                    cursor: "pointer",
                  }}
                >
                  <span
                    className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full font-sora text-[15px]"
                    style={{ background: on ? "#DB3B2B" : "rgba(255,255,255,0.06)", color: on ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.4s ease" }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-sora text-[18px] font-normal text-white tablet:text-[19px]" style={{ marginBottom: 3 }}>
                      {s.title}
                    </h3>
                    <p className="font-inter text-[13px] font-light text-white/55" style={{ lineHeight: 1.55 }}>
                      {s.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-5">
          <a
            href={SIGNUP_URL}
            data-cta-text="Empieza a facturar gratis"
            data-cta-destination={SIGNUP_URL}
            data-cta-section="alta"
            className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
          >
            Empieza a facturar gratis
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* PENDIENTE (Jurídico): este texto tiene que decir lo mismo que los
              términos y condiciones antes de publicar. */}
          <p className="flex items-center gap-2.5 text-center font-inter text-[13.5px] font-light text-white/45">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            Tu sello se guarda protegido y nadie de T1 puede verlo.
          </p>
        </div>
      </div>
    </section>
  );
}
