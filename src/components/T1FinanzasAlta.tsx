"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { Cursor, usePasos, useEscritura } from "@/components/T1FinanzasUI";

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

function Campo({ label, value, check, cursor }: { label: string; value: string; check?: boolean; cursor?: boolean }) {
  return (
    <div
      className="rounded-[12px] border bg-white px-3.5 py-2.5 transition-colors duration-300"
      style={{ borderColor: cursor ? "rgba(219,59,43,0.45)" : "rgba(0,0,0,0.08)" }}
    >
      <span className="block text-[10px] font-semibold uppercase tracking-[0.05em] text-black/35">{label}</span>
      <span className="mt-0.5 flex items-center gap-2" style={{ minHeight: 18 }}>
        <span className="flex-1 truncate text-[13px] font-medium text-black">
          {value || <span className="text-black/25">—</span>}
          {cursor && <Cursor alto={13} />}
        </span>
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

/* ── 1 · RFC: los campos se van llenando ── */
function RfcScreen() {
  const paso = usePasos(4, 1100);
  const rfc = useEscritura("CVE240517J31", 85, paso === 0);
  return (
    <Pantalla title="Tu negocio">
      <div className="flex flex-col gap-2.5">
        <Campo label="RFC" value={rfc.escrito} cursor={!rfc.completo} check={rfc.completo} />
        <Campo label="Nombre del negocio" value={paso >= 1 ? "Comercializadora Vega" : ""} check={paso >= 1} />
        <Campo label="Código postal" value={paso >= 2 ? "64000" : ""} check={paso >= 2} />
      </div>
      <p className="mt-4 text-[11px] leading-[1.5] text-black/40">
        ¿Tienes más de un negocio? Puedes agregar hasta 3 en la misma cuenta gratis.
      </p>
      <div className="mt-4" style={{ opacity: paso >= 3 ? 1 : 0.45, transition: "opacity 0.4s" }}>
        <Boton>Continuar</Boton>
      </div>
    </Pantalla>
  );
}

/* ── 2 · Sello: los archivos se sueltan y se van palomeando ── */
function SelloScreen() {
  const paso = usePasos(5, 1000);
  return (
    <Pantalla title="Tu sello digital">
      <div
        className="rounded-[12px] border border-dashed px-4 py-5 text-center transition-colors duration-300"
        style={{
          borderColor: paso === 0 ? "rgba(219,59,43,0.5)" : "rgba(0,0,0,0.14)",
          background: paso === 0 ? "rgba(219,59,43,0.04)" : "#FAFAF9",
        }}
      >
        <span className="mx-auto mb-2.5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#DB3B2B]/[0.10]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.5 19h15" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="block text-[12.5px] font-semibold text-black">
          {paso >= 3 ? "Archivos cargados" : "Sube tus archivos"}
        </span>
        <span className="mt-0.5 block text-[11px] text-black/40">Los que el SAT te dio: .cer y .key</span>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <Campo label="Certificado" value={paso >= 1 ? "00001000000512345678.cer" : ""} check={paso >= 1} />
        <Campo label="Llave privada" value={paso >= 2 ? "Clave_privada_CSD.key" : ""} check={paso >= 2} />
        <Campo label="Contraseña" value={paso >= 3 ? "••••••••••" : ""} check={paso >= 3} />
      </div>

      {/* El permiso del SAT ya no es un paso aparte: es una casilla que se
          marca aquí mismo. */}
      <div
        className="mt-3 flex items-start gap-2.5 rounded-[12px] border px-3.5 py-2.5 transition-colors duration-300"
        style={{ borderColor: paso >= 3 ? "rgba(219,59,43,0.35)" : "rgba(0,0,0,0.07)" }}
      >
        <span
          className="mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-300"
          style={{ background: paso >= 3 ? "#DB3B2B" : "#fff", borderColor: paso >= 3 ? "#DB3B2B" : "rgba(0,0,0,0.2)" }}
        >
          {paso >= 3 && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="text-[11px] leading-[1.45] text-black/55">
          Autorizo a T1 a emitir mis facturas. Es el permiso que pide el SAT y se marca una sola vez.
        </span>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#DB3B2B]">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
        </svg>
        Ver la guía en video
      </p>
    </Pantalla>
  );
}

/* ── 3 · La primera factura ── */
const QUE_FACTURAR = [
  { t: "Un pedido de tus canales", d: "Mercado Libre, Amazon, tu tienda en línea…" },
  { t: "Una venta de mostrador", d: "La capturas en cuatro pasos." },
  { t: "Tu factura global", d: "Junta las ventas sin factura del periodo." },
];

function PrimeraFacturaScreen() {
  const paso = usePasos(3, 1400);
  return (
    <Pantalla title="Nueva factura">
      <p className="text-[12.5px] font-bold text-black">¿Qué quieres facturar?</p>
      <div className="mt-3 flex flex-col gap-2">
        {QUE_FACTURAR.map((o, i) => {
          const on = i === 0 && paso >= 1;
          return (
            <span
              key={o.t}
              className="flex items-start gap-2.5 rounded-[11px] border px-3 py-2.5 transition-colors duration-300"
              style={{
                borderColor: on ? "rgba(219,59,43,0.4)" : "rgba(0,0,0,0.07)",
                background: on ? "rgba(219,59,43,0.04)" : "#fff",
              }}
            >
              <span
                className="relative mt-[1px] block h-[13px] w-[13px] shrink-0 rounded-full border-[1.5px] transition-colors duration-300"
                style={{ borderColor: on ? "#DB3B2B" : "rgba(0,0,0,0.25)" }}
              >
                {on && (
                  <span className="absolute left-1/2 top-1/2 block h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "#DB3B2B" }} />
                )}
              </span>
              <span className="leading-tight">
                <span className="block text-[11.5px] font-semibold text-black">{o.t}</span>
                <span className="mt-0.5 block text-[10px] leading-[1.45] text-black/40">{o.d}</span>
              </span>
            </span>
          );
        })}
      </div>

      <div className="mt-4" style={{ opacity: paso >= 1 ? 1 : 0.45, transition: "opacity 0.4s", transform: paso >= 2 ? "scale(0.985)" : "scale(1)" }}>
        <Boton>{paso >= 2 ? "Creando tu factura…" : "Crear factura"}</Boton>
      </div>
      <p className="mt-3 text-center text-[11px] text-black/35">Tus 25 facturas gratis del mes ya están listas.</p>
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
        <p className="text-[15px] font-bold text-black">Tu primera factura está lista</p>
        <p className="mt-1.5 max-w-[220px] text-[12px] leading-[1.5] text-black/45">
          Te quedan 24 facturas gratis este mes, y otras 25 el mes que entra.
        </p>
        <div className="mt-5 flex items-center gap-2">
          {["XML", "PDF"].map((f) => (
            <span key={f} className="rounded-full border border-black/[0.08] px-3 py-1.5 text-[10.5px] font-semibold text-black/55">
              {f}
            </span>
          ))}
        </div>
      </div>
    </Pantalla>
  );
}

/* ══════════ Sección ══════════ */
const FRAMES = [RfcScreen, SelloScreen, PrimeraFacturaScreen, ListoScreen];
const DURS = [3600, 4200, 4000, 3600];
const FRAME_STEP = [0, 1, 2, 2];
const STEP_FIRST = [0, 1, 2];

const STEPS = [
  { n: "1", title: "Da de alta tu RFC", desc: "Usa el RFC de tu negocio." },
  { n: "2", title: "Sube tu sello digital", desc: "Te guiamos con un video, y marcas el permiso que pide el SAT." },
  { n: "3", title: "Genera tu primera factura", desc: "Eliges qué facturar y la emites." },
];

export default function T1FinanzasAlta() {
  const [frame, setFrame] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  const activeStep = FRAME_STEP[frame];
  const goToStep = (i: number) => {
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
    if (!started) return;
    const id = setTimeout(() => setFrame((f) => (f + 1) % FRAMES.length), DURS[frame]);
    return () => clearTimeout(id);
  }, [frame, started]);

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
            Solo necesitas tu RFC y tu sello digital.
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

        {/* PENDIENTE (Jurídico): la línea "tu sello se guarda protegido" salió
            de la página hasta que el texto coincida con los términos y
            condiciones. */}
        <div className="mt-12 flex justify-center">
          <a
            href={SIGNUP_URL}
            data-cta-text="Comienza gratis"
            data-cta-destination={SIGNUP_URL}
            data-cta-section="alta"
            className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
          >
            Comienza gratis
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
