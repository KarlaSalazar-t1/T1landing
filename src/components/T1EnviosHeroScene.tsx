"use client";

import Image from "next/image";

/* Escena del hero de T1 Envíos — panel del Cotizador (mock de la app) con los
   logos de paquetería orbitando detrás, alineados a un aro. Recreado del hero
   del landing de T1 Envíos (miguelperez-oss/T1-Landing-envios). */

const LOGOS = [
  "/img/circles/dhl.svg",
  "/img/circles/fedex.svg",
  "/img/circles/ups.svg",
  "/img/circles/ampm.svg",
  "/img/circles/99.svg",
  "/img/circles/jt.svg",
  "/img/circles/paquetexpress.svg",
];
const DUR = 30; // segundos por vuelta

const Caret = <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-black/40"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/* Campo estilo input subrayado (como el mock de la app). */
function PanelField({ label, value, unit }: { label: string; value?: string; unit?: string }) {
  return (
    <div className="min-w-0 border-b border-black/[0.14] pb-1">
      <p className="truncate font-inter text-[9px] font-medium text-black/45">{label}</p>
      <div className="flex items-baseline justify-between gap-1">
        <span className={`truncate font-inter text-[13px] ${value ? "text-black/85" : "text-black/30"}`}>{value || "0"}</span>
        {unit && <span className="shrink-0 font-inter text-[10px] text-black/40">{unit}</span>}
      </div>
    </div>
  );
}

function Dropdown({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-[8px] border border-black/[0.12] px-2.5 py-1.5 font-inter text-[10px] font-medium text-black/60">
      {label}
      {Caret}
    </span>
  );
}

/* Panel del Cotizador (mock de la app T1 Envíos). */
function CotizadorPanel() {
  return (
    <div className="w-full overflow-hidden rounded-[16px] bg-white" style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.35)" }}>
      {/* Barra tipo navegador */}
      <div className="flex items-center justify-between border-b border-black/[0.06] px-4" style={{ height: 42 }}>
        <span className="flex h-[26px] w-[34px] items-center justify-center rounded-[8px] border border-black/[0.08]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </span>
        <div className="flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#9ca3af" strokeWidth="1.7" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#9ca3af" strokeWidth="1.7" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#9ca3af" strokeWidth="1.7" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#9ca3af" strokeWidth="1.7" /></svg>
          <span className="flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded-full bg-[#DB3B2B]/15 font-sora text-[10px] font-bold text-[#DB3B2B]">FH</span>
        </div>
      </div>

      {/* Cotizador */}
      <div className="px-4 pt-3.5">
        <p className="font-sora text-[15px] font-semibold text-black">Cotizador</p>
        <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3">
          <PanelField label="Código Postal Origen" value="55635" />
          <PanelField label="Código Postal Destino" value="11529" />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-x-3 gap-y-3">
          <PanelField label="Largo" value="25" unit="cm" />
          <PanelField label="Alto" unit="cm" />
          <PanelField label="Ancho" unit="cm" />
          <PanelField label="Peso" unit="kg" />
        </div>
        <label className="mt-3 flex items-center gap-2 font-inter text-[10.5px] text-black/55">
          <span className="h-[14px] w-[14px] rounded-[4px] border border-black/25" />
          Incluir seguro de envío
        </label>
        <div className="mx-auto mt-3.5 flex h-[34px] w-[62%] items-center justify-center rounded-[9px] text-[12px] font-semibold text-white" style={{ background: "#C0453A" }}>Cotizar</div>
      </div>

      {/* Filtros */}
      <div className="mt-4 flex gap-2 px-4">
        <Dropdown label="Servicio" />
        <Dropdown label="Paquetería" />
        <Dropdown label="Ventajas" />
      </div>

      {/* Tabla de resultados */}
      <div className="px-4 pb-4 pt-3">
        <div className="overflow-hidden rounded-[10px] border border-black/[0.10]">
          <div className="flex items-center justify-between border-b border-black/[0.08] px-3 py-2">
            <span className="font-inter text-[10px] font-semibold text-black/60">Paquetería</span>
            <span className="font-inter text-[10px] font-semibold text-black/60">Precio estimado</span>
            <span className="font-inter text-[10px] font-semibold text-black/60">Acciones</span>
          </div>
          <div style={{ height: 74 }} />
        </div>
      </div>
    </div>
  );
}

export default function T1EnviosHeroScene({ size = 500, radius = 222 }: { size?: number; radius?: number }) {
  const n = LOGOS.length;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Glow */}
      <div aria-hidden className="absolute rounded-full" style={{ inset: -20, background: "radial-gradient(ellipse at 50% 50%, rgba(229,144,134,0.16) 0%, transparent 62%)" }} />
      {/* Aro */}
      <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: radius * 2, height: radius * 2, border: "1.5px solid rgba(219,59,43,0.22)", boxShadow: "0 0 0 14px rgba(219,59,43,0.03)" }} />

      {/* Logos orbitando (detrás del panel) */}
      {LOGOS.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className="halo-orbit-item absolute left-1/2 top-1/2 z-0"
          style={{
            width: 56,
            height: 56,
            margin: "-28px 0 0 -28px",
            transformOrigin: "28px 28px",
            ["--halo-r" as string]: `${radius}px`,
            animation: `halo-orbit ${DUR}s linear infinite`,
            animationDelay: `${-(DUR / n) * i}s`,
          }}
        >
          <span className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 6px 22px rgba(0,0,0,0.20)" }}>
            <Image src={src} alt="" width={72} height={72} className="h-full w-full object-cover" />
          </span>
        </div>
      ))}

      {/* Panel del Cotizador, ligeramente inclinado (mock de la app) */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{ width: 430, transform: "translate(-50%, -50%) perspective(1600px) rotateY(-11deg) rotateX(4deg) rotate(0.4deg)" }}>
        <CotizadorPanel />
      </div>
    </div>
  );
}
