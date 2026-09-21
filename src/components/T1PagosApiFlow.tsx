"use client";

import { useEffect, useState } from "react";

/* API e integraciones — pantalla tipo editor mostrando una petición REAL a la API
   REST de T1 Pagos (POST /cargo) y su respuesta. Basado en docs.t1pagos.com:
   endpoints POST /tarjeta (tokeniza) y POST /cargo (cobra) con campos en español
   (monto, descripcion, metodo_pago, tarjeta.token) y respuesta {status,http_code}.
   Se monta dentro de PhoneFrame. */
const MONO = "ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace";
const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";

export function ApiFlow() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setStep((s) => (s + 1) % 2), step === 0 ? 2600 : 3200);
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div
      className="mx-auto flex w-full max-w-[320px] flex-col overflow-hidden rounded-[14px] border border-white/[0.08]"
      style={{ height: 452, background: "#0f1117", fontFamily: MANROPE, boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}
    >
      {/* Barra de ventana (tipo editor: círculos rojo/amarillo/verde) */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-3">
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 text-[10px] text-white/40" style={{ fontFamily: MONO }}>t1pagos · /cargo</span>
      </div>

      {/* Petición REST real (POST /cargo) */}
      <div className="flex-1 px-3.5 py-3.5 text-[10.5px] leading-[1.7]" style={{ fontFamily: MONO }}>
        <p className="mb-1.5"><span className="rounded bg-[#61afef]/20 px-1.5 py-0.5 text-[9.5px] font-semibold text-[#61afef]">POST</span> <span className="text-white/70">/cargo</span></p>
        <p className="text-white/80">{"{"}</p>
        <p className="pl-4"><span style={{ color: "#e06c75" }}>&quot;monto&quot;</span>: <span style={{ color: "#98c379" }}>&quot;349.00&quot;</span>,</p>
        <p className="pl-4"><span style={{ color: "#e06c75" }}>&quot;metodo_pago&quot;</span>: <span style={{ color: "#98c379" }}>&quot;tarjeta&quot;</span>,</p>
        <p className="pl-4"><span style={{ color: "#e06c75" }}>&quot;tarjeta&quot;</span>: {"{"} <span style={{ color: "#e06c75" }}>&quot;token&quot;</span>: <span style={{ color: "#98c379" }}>&quot;5c4a7103…&quot;</span> {"}"}</p>
        <p className="text-white/80">{"}"}<span className="ml-[1px] inline-block h-[12px] w-[1.5px] align-middle" style={{ background: "#fff", animation: "caretBlink 1s step-end infinite" }} /></p>

        {/* Respuesta */}
        <div key={step} className="mt-3.5" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
          {step === 0 ? (
            <p className="text-white/40">→ Enviando solicitud…</p>
          ) : (
            <>
              <p><span className="rounded bg-[#16A34A]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#4ade80]">200</span></p>
              <p className="mt-2 text-white/80">{"{"} <span style={{ color: "#e06c75" }}>&quot;status&quot;</span>: <span style={{ color: "#98c379" }}>&quot;success&quot;</span> {"}"}</p>
            </>
          )}
        </div>
      </div>

      {/* Capacidades reales de la API */}
      <div className="border-t border-white/[0.06] px-3.5 py-3.5">
        <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">Incluye</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {["API REST", "Tokenización", "Webhooks", "Suscripciones", "Sandbox"].map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9.5px] font-medium text-white/60">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
