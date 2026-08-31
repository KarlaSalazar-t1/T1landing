"use client";

import { useEffect, useState } from "react";

/* API e integraciones — pantalla tipo editor mostrando una petición a la API de
   T1 Pagos y su respuesta aprobada. Se monta dentro de PhoneFrame. */
const MONO = "ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace";
const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";

export function ApiFlow() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setStep((s) => (s + 1) % 2), step === 0 ? 2600 : 3200);
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div className="flex h-full flex-col" style={{ background: "#0f1117", fontFamily: MANROPE }}>
      {/* Barra de ventana */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-3">
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 text-[10px] text-white/40" style={{ fontFamily: MONO }}>checkout.js</span>
      </div>

      {/* Código */}
      <div className="flex-1 px-3.5 py-3.5 text-[10.5px] leading-[1.75]" style={{ fontFamily: MONO }}>
        <p><span style={{ color: "#c678dd" }}>const</span> <span style={{ color: "#e5c07b" }}>charge</span> <span style={{ color: "#56b6c2" }}>=</span> <span style={{ color: "#c678dd" }}>await</span> <span style={{ color: "#61afef" }}>t1</span>.charges.<span style={{ color: "#61afef" }}>create</span>({"{"}</p>
        <p className="pl-4"><span style={{ color: "#e06c75" }}>amount</span>: <span style={{ color: "#d19a66" }}>1345</span>,</p>
        <p className="pl-4"><span style={{ color: "#e06c75" }}>currency</span>: <span style={{ color: "#98c379" }}>&quot;MXN&quot;</span>,</p>
        <p className="pl-4"><span style={{ color: "#e06c75" }}>method</span>: <span style={{ color: "#98c379" }}>&quot;card&quot;</span></p>
        <p className="text-white/80">{"})"}<span className="ml-[1px] inline-block h-[12px] w-[1.5px] align-middle" style={{ background: "#fff", animation: "caretBlink 1s step-end infinite" }} /></p>

        {/* Respuesta */}
        <div key={step} className="mt-3.5" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
          {step === 0 ? (
            <p className="text-white/40">→ Enviando solicitud…</p>
          ) : (
            <>
              <p><span className="rounded bg-[#16A34A]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#4ade80]">200 OK</span></p>
              <p className="mt-2 text-white/80">{"{"} <span style={{ color: "#e06c75" }}>&quot;status&quot;</span>: <span style={{ color: "#98c379" }}>&quot;approved&quot;</span> {"}"}</p>
            </>
          )}
        </div>
      </div>

      {/* Integraciones */}
      <div className="border-t border-white/[0.06] px-3.5 py-3.5">
        <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">Integra con</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {["API REST", "SDKs", "Webhooks", "Shopify", "WooCommerce"].map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9.5px] font-medium text-white/60">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
