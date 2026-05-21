"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Cotizador panel — mirrors the T1envíos shipping-rate quote tool.
 * Auto-fills the form fields, then reveals the carrier results table.
 *
 * Stages:
 *   0 → empty form
 *   1 → CP origen
 *   2 → CP destino
 *   3 → dimensiones (largo, alto, ancho)
 *   4 → peso
 *   5 → results table visible
 */
type Stage = 0 | 1 | 2 | 3 | 4 | 5;

const FONT = "var(--font-manrope-var), sans-serif";

function InputField({
  label,
  value,
  placeholder,
  suffix,
  filled,
  width,
}: {
  label: string;
  value: string;
  placeholder?: string;
  suffix?: string;
  filled: boolean;
  width?: number | string;
}) {
  return (
    <div className="flex flex-col" style={{ width }}>
      <span className="font-inter text-[10px] font-medium text-black/55" style={{ marginBottom: 4 }}>
        {label}
      </span>
      <div
        className="flex items-center rounded-[10px] border bg-white px-3"
        style={{
          height: 36,
          borderColor: filled ? "rgba(155, 200, 175, 0.6)" : "rgba(0,0,0,0.08)",
          background: filled ? "rgba(235, 245, 240, 0.6)" : "#FFFFFF",
        }}
      >
        <span className="flex-1 text-[12px] font-medium text-black/85 tabular-nums">
          {filled ? value : <span className="text-black/30 font-normal">{placeholder}</span>}
        </span>
        {filled && (
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#22C55E" />
            <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {!filled && suffix && (
          <span className="text-[10px] text-black/30">{suffix}</span>
        )}
      </div>
    </div>
  );
}

const RESULTS: { logo: string; carrier: string; service: string; eta: string; price: string; recommended?: boolean }[] = [
  { logo: "/img/icons/fedex-logo.svg", carrier: "FedEx", service: "Día siguiente", eta: "20 de may", price: "$148.30", recommended: true },
  { logo: "/img/dhl-iso.svg", carrier: "DHL", service: "Económico / 2 días", eta: "21 de may", price: "$155.75" },
  { logo: "/img/99min-iso.svg", carrier: "99minutos", service: "Mismo día", eta: "Hoy", price: "$210.00" },
];

export default function CotizadorPanel({ animate }: { animate: boolean }) {
  const [stage, setStage] = useState<Stage>(0);

  useEffect(() => {
    if (!animate) { setStage(0); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    [1, 2, 3, 4, 5].forEach((s, i) => {
      timers.push(setTimeout(() => setStage(s as Stage), 600 + i * 700));
    });
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  return (
    <div className="relative h-full w-full" style={{ paddingTop: 12, paddingLeft: 12, fontFamily: FONT }}>
      {/* Glass border frame */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "18px 0 0 0",
          background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.03) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 1px 0 0 rgba(255,255,255,0.3)",
        }}
      />

      {/* White panel inside */}
      <div
        className="relative flex h-full flex-col overflow-hidden bg-white"
        style={{ borderRadius: "14px 0 0 0" }}
      >
        {/* Header */}
        <div className="px-5" style={{ paddingTop: 16, paddingBottom: 6 }}>
          <h3 className="text-[18px] font-bold text-black">Cotizador</h3>
          <p className="text-[10px] text-black/45" style={{ marginTop: 2 }}>
            Completa estos campos para calcular tu envío
          </p>
        </div>

        {/* Form row */}
        <div
          className="mx-5 flex items-end gap-2 rounded-[14px] border border-black/[0.06] bg-white px-3"
          style={{ paddingTop: 10, paddingBottom: 10, marginTop: 12, boxShadow: "0 0 12px rgba(0,0,0,0.04)" }}
        >
          <InputField label="CP origen" value="55712" placeholder="06700" filled={stage >= 1} width="14%" />
          <InputField label="CP destino" value="55712" placeholder="06700" filled={stage >= 2} width="14%" />
          <InputField label="Largo" value="23" placeholder="" suffix="cm" filled={stage >= 3} width="11%" />
          <InputField label="Alto" value="23" placeholder="" suffix="cm" filled={stage >= 3} width="11%" />
          <InputField label="Ancho" value="2" placeholder="" suffix="cm" filled={stage >= 3} width="11%" />
          <InputField label="Peso" value="2" placeholder="" suffix="kg" filled={stage >= 4} width="11%" />
          <div className="flex flex-1 items-end justify-end gap-2">
            <span className="text-[10px] text-black/35">Limpiar</span>
            <span
              className="inline-flex items-center justify-center rounded-full px-4 text-[10px] font-semibold text-white"
              style={{
                height: 28,
                background: stage >= 4 ? "#DB3B2B" : "#E9A89F",
                transition: "background 0.3s",
              }}
            >
              Cotizar
            </span>
          </div>
        </div>

        {/* Weight summary */}
        {stage >= 4 && (
          <div className="px-5 text-[10px] text-black/50" style={{ marginTop: 8 }}>
            <span>Peso físico: <strong className="text-black/80">2 kg</strong></span>
            <span className="mx-2 text-black/25">•</span>
            <span>Peso volumétrico: <strong className="text-black/80">0.21 kg</strong></span>
            <span className="mx-2 text-black/25">•</span>
            <span>Peso a cotizar: <strong className="text-black/80">2.00 kg</strong></span>
          </div>
        )}

        {/* Results header */}
        {stage >= 5 && (
          <>
            <div
              className="grid border-b border-black/[0.06] px-5 text-[9px] font-semibold uppercase tracking-wide text-black/35"
              style={{
                gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr) minmax(0,0.7fr)",
                paddingTop: 14,
                paddingBottom: 6,
                marginTop: 14,
                gap: "0 10px",
                animation: "fadeSlideIn 0.5s ease-out",
              }}
            >
              <span>Paquetería</span>
              <span>Tipo de servicio</span>
              <span>Fecha estimada ⇅</span>
              <span>Precio estimado ⇅</span>
              <span></span>
            </div>

            {/* Rows */}
            <div className="flex-1">
              {RESULTS.map((row, i) => (
                <div
                  key={`${row.carrier}-${i}`}
                  className="grid items-center border-b border-black/[0.04] px-5"
                  style={{
                    gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr) minmax(0,0.7fr)",
                    paddingTop: 10,
                    paddingBottom: 10,
                    gap: "0 10px",
                    animation: `fadeSlideIn 0.5s ease-out ${0.15 + i * 0.1}s both`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-[#FFE600]">
                      <Image src={row.logo} alt="" width={20} height={20} className="object-contain" />
                    </div>
                    <div className="flex flex-col">
                      {row.recommended && (
                        <span
                          className="w-fit rounded-[3px] text-[7px] font-bold uppercase text-white"
                          style={{ background: "#DB3B2B", padding: "1px 4px", letterSpacing: "0.04em", marginBottom: 2 }}
                        >
                          Recomendada
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-black">{row.carrier}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-black/65">{row.service}</span>
                  <span className="text-[10px] font-semibold text-black/75">{row.eta}</span>
                  <span className="text-[11px] font-bold text-black tabular-nums">
                    {row.price}
                    <span className="ml-0.5 text-[8px] font-medium text-black/40">MXN</span>
                  </span>
                  <span
                    className="inline-flex h-[24px] items-center justify-center rounded-full text-[9px] font-semibold text-white"
                    style={{ background: "#DB3B2B", padding: "0 10px" }}
                  >
                    Crear envío
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
