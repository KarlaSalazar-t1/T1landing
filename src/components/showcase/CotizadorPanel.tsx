"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Cotizador panel — mirrors the T1 Envíos shipping-rate quote tool.
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
  className,
}: {
  label: string;
  value: string;
  placeholder?: string;
  suffix?: string;
  filled: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
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
  { logo: "/img/dhl-iso.svg", carrier: "DHL", service: "Día siguiente", eta: "20 de may", price: "$151.69" },
  { logo: "/img/dhl-iso.svg", carrier: "DHL", service: "Económico / 2 días", eta: "21 de may", price: "$155.75" },
  { logo: "/img/icons/fedex-logo.svg", carrier: "FedEx", service: "Estándar", eta: "22 de may", price: "$132.40" },
  { logo: "/img/99min-iso.svg", carrier: "99minutos", service: "Mismo día", eta: "Hoy", price: "$210.00" },
  { logo: "/img/icons/paquetexpress.svg", carrier: "Paquetexpress", service: "Económico", eta: "23 de may", price: "$118.50" },
  { logo: "/img/icons/estafeta-logo.svg", carrier: "Estafeta", service: "Día siguiente", eta: "20 de may", price: "$165.20" },
];

function MiniStatusBar() {
  return (
    <div className="flex shrink-0 items-center justify-between bg-white px-5 py-1.5">
      <span className="text-[11px] font-semibold text-black">9:41</span>
      <div className="flex items-center gap-1">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="0" y="3" width="2.5" height="7" rx="0.5" fill="rgba(0,0,0,0.3)" />
          <rect x="3.5" y="2" width="2.5" height="8" rx="0.5" fill="rgba(0,0,0,0.3)" />
          <rect x="7" y="1" width="2.5" height="9" rx="0.5" fill="rgba(0,0,0,0.5)" />
          <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="rgba(0,0,0,0.7)" />
        </svg>
        <svg width="18" height="9" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          <rect x="2" y="2" width="14" height="7" rx="1" fill="rgba(0,0,0,0.7)" />
        </svg>
      </div>
    </div>
  );
}

export default function CotizadorPanel({ animate, mobile = false }: { animate: boolean; mobile?: boolean }) {
  const [stage, setStage] = useState<Stage>(0);

  useEffect(() => {
    if (!animate) { setStage(0); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Stretch the cadence so each form field reveal has time to read.
    // Was 600 + i*700 (max ~3.5s) — now 800 + i*1100 (max ~6.3s).
    [1, 2, 3, 4, 5].forEach((s, i) => {
      timers.push(setTimeout(() => setStage(s as Stage), 800 + i * 1100));
    });
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  // ── Mobile: phone-framed version (rounded card + iOS status bar) ──
  if (mobile) {
    return (
      <div className="relative mx-auto" style={{ width: "88%", maxWidth: 320, fontFamily: FONT }}>
        <div
          className="flex flex-col overflow-hidden bg-white"
          style={{ borderRadius: 22, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", height: 470 }}
        >
          <MiniStatusBar />
          <CotizadorContent stage={stage} mobile />
        </div>
      </div>
    );
  }

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
        <CotizadorContent stage={stage} />
      </div>
    </div>
  );
}

function CotizadorContent({ stage, mobile = false }: { stage: Stage; mobile?: boolean }) {
  const showResults = stage >= 5;
  return (
    <div className={mobile ? "flex flex-1 flex-col overflow-y-auto" : "flex flex-1 flex-col"}>
        {/* Header */}
        <div className="px-5" style={{ paddingTop: 16, paddingBottom: 6 }}>
          <h3 className="text-[18px] font-bold text-black">Cotizador</h3>
          <p className="text-[10px] text-black/45" style={{ marginTop: 2 }}>
            {showResults ? "Estas son tus opciones de envío" : "Completa estos campos para calcular tu envío"}
          </p>
        </div>

        {/* Form + weight summary — hidden once results are shown */}
        {!showResults && (
          <>
            <div
              className="mx-5 rounded-[14px] border border-black/[0.06] bg-white px-3"
              style={{ paddingTop: 10, paddingBottom: 10, marginTop: 12, boxShadow: "0 0 12px rgba(0,0,0,0.04)" }}
            >
              <div className="flex flex-wrap items-end gap-2">
                <InputField label="CP origen" value="55712" placeholder="06700" filled={stage >= 1} className="basis-[46%] grow tablet:basis-0 tablet:grow-[1.5]" />
                <InputField label="CP destino" value="55712" placeholder="06700" filled={stage >= 2} className="basis-[46%] grow tablet:basis-0 tablet:grow-[1.5]" />
                <InputField label="Largo" value="23" placeholder="" suffix="cm" filled={stage >= 3} className="basis-[21%] grow tablet:basis-0 tablet:grow" />
                <InputField label="Alto" value="23" placeholder="" suffix="cm" filled={stage >= 3} className="basis-[21%] grow tablet:basis-0 tablet:grow" />
                <InputField label="Ancho" value="2" placeholder="" suffix="cm" filled={stage >= 3} className="basis-[21%] grow tablet:basis-0 tablet:grow" />
                <InputField label="Peso" value="2" placeholder="" suffix="kg" filled={stage >= 4} className="basis-[21%] grow tablet:basis-0 tablet:grow" />
              </div>
              <div className="mt-3 flex items-center justify-end gap-3">
                <span className="text-[10px] text-black/35">Limpiar</span>
                <span
                  className="inline-flex items-center justify-center rounded-full px-5 text-[10px] font-semibold text-white"
                  style={{ height: 30, background: stage >= 4 ? "#DB3B2B" : "#E9A89F", transition: "background 0.3s" }}
                >
                  Cotizar
                </span>
              </div>
            </div>

            {stage >= 4 && (
              <div className="px-5 text-[10px] text-black/50" style={{ marginTop: 8 }}>
                <span>Peso físico: <strong className="text-black/80">2 kg</strong></span>
                <span className="mx-2 text-black/25">•</span>
                <span>Peso volumétrico: <strong className="text-black/80">0.21 kg</strong></span>
                <span className="mx-2 text-black/25">•</span>
                <span>Peso a cotizar: <strong className="text-black/80">2.00 kg</strong></span>
              </div>
            )}
          </>
        )}

        {/* Results — cards on mobile, table on desktop */}
        {showResults && (
          mobile ? (
            <div className="flex flex-col gap-2 px-4" style={{ paddingTop: 12, paddingBottom: 12 }}>
              {RESULTS.map((row, i) => (
                <div
                  key={`${row.carrier}-${i}`}
                  className="flex items-center gap-2.5 rounded-[12px] border border-black/[0.06] bg-white px-3 py-2.5"
                  style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.04)", animation: `fadeSlideIn 0.5s ease-out ${0.1 + i * 0.08}s both` }}
                >
                  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.06] bg-white">
                    <Image src={row.logo} alt="" width={24} height={24} className="object-contain" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    {row.recommended && (
                      <span
                        className="w-fit rounded-[3px] text-[7px] font-bold uppercase text-white"
                        style={{ background: "#DB3B2B", padding: "1px 4px", letterSpacing: "0.04em", marginBottom: 2 }}
                      >
                        Recomendada
                      </span>
                    )}
                    <span className="truncate text-[12px] font-semibold text-black">{row.carrier}</span>
                    <span className="truncate text-[10px] text-black/55">{row.service} · {row.eta}</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-[12px] font-bold text-black tabular-nums">{row.price}</span>
                    <span
                      className="inline-flex h-[22px] items-center justify-center rounded-full text-[9px] font-semibold text-white"
                      style={{ background: "#DB3B2B", padding: "0 10px" }}
                    >
                      Crear
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div
                className="grid border-b border-black/[0.06] px-5 text-[9px] font-semibold uppercase tracking-wide text-black/35"
                style={{
                  gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr) minmax(0,0.7fr)",
                  paddingTop: 14, paddingBottom: 6, marginTop: 14, gap: "0 10px",
                  animation: "fadeSlideIn 0.5s ease-out",
                }}
              >
                <span>Paquetería</span>
                <span>Tipo de servicio</span>
                <span>Fecha estimada ⇅</span>
                <span>Precio estimado ⇅</span>
                <span></span>
              </div>
              <div className="flex-1">
                {RESULTS.map((row, i) => (
                  <div
                    key={`${row.carrier}-${i}`}
                    className="grid items-center border-b border-black/[0.04] px-5"
                    style={{
                      gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr) minmax(0,0.7fr)",
                      paddingTop: 10, paddingBottom: 10, gap: "0 10px",
                      animation: `fadeSlideIn 0.5s ease-out ${0.15 + i * 0.1}s both`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-black/[0.06] bg-white">
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
                      style={{ background: "#DB3B2B", padding: "0 12px" }}
                    >
                      Crear
                    </span>
                  </div>
                ))}
              </div>
            </>
          )
        )}
    </div>
  );
}
