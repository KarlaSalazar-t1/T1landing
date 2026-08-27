import React from "react";

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";

function PhoneShell({ children, flat = false }: { children: React.ReactNode; flat?: boolean }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 340, fontFamily: MANROPE }}>
      <div className="relative overflow-hidden bg-white" style={{ borderRadius: 14, border: flat ? "none" : "1px solid rgba(0,0,0,0.08)", boxShadow: flat ? "none" : "0 18px 44px rgba(0,0,0,0.35)" }}>
        <div className={flat ? "px-1 pt-1 pb-1" : "px-5 pt-6 pb-6"}>{children}</div>
      </div>
    </div>
  );
}

/* ── Cotizador (versión móvil simplificada del panel de multipaquetería) ── */
export function CotizadorPanel() {
  const BR = "#C0453A";
  const FILTERS = ["Paquetería", "Tipo de servicio", "Ventajas"];
  const OPTIONS = [
    { brand: "fedex", name: "FedEx", sub: "Servicio express", eta: "2 días hábiles", etaSub: "Mié · 24 ene", price: "$143.00", highlight: true },
    { brand: "dhl", name: "DHL", sub: "Estándar", eta: "3 días hábiles", etaSub: "Jue · 25 ene", price: "$128.00", highlight: false },
  ];
  const Chevron = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M6 9l6 6 6-6" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
  return (
    <PhoneShell>
      <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 2 }}>
        {FILTERS.map((f) => (
          <span key={f} className="flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[10.5px] font-medium text-black/75" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
            {f}
            <Chevron />
          </span>
        ))}
      </div>

      {OPTIONS.map((o, i) => (
        <div key={i} className="relative overflow-hidden" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 12, paddingBottom: 12 }}>
          {o.highlight && (
            <span aria-hidden className="cotiza-sweep pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2" style={{ background: "linear-gradient(100deg, transparent 0%, rgba(219,59,43,0.14) 50%, transparent 100%)" }} />
          )}
          <div className="flex items-center gap-2.5">
            <img src={`/img/carriers/${o.brand}.svg`} alt={o.name} width={38} height={38} className="h-[38px] w-[38px] shrink-0" />
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-black leading-tight">{o.name}</p>
              <p className="text-[12px] text-black/55" style={{ marginTop: 1 }}>{o.sub}</p>
            </div>
          </div>
          <div className="flex justify-between" style={{ marginTop: 12 }}>
            <div>
              <span className="block text-[11px] text-black/45">Entrega estimada:</span>
              <span className="block text-[15px] font-bold text-black" style={{ marginTop: 1 }}>{o.eta}</span>
              <span className="block text-[10.5px] text-black/40" style={{ marginTop: 1 }}>{o.etaSub}</span>
            </div>
            <div className="text-right">
              <span className="block text-[11px] text-black/45">Precio:</span>
              <span className={`block text-[15px] font-bold text-black ${o.highlight ? "price-pop" : ""}`} style={{ marginTop: 1 }}>
                {o.price}<span className="ml-1 text-[10px] font-medium text-black/45">MXN</span>
              </span>
            </div>
          </div>
          <button className="mt-3 w-full rounded-[10px] py-2.5 text-[13px] font-semibold text-white" style={{ background: BR }}>Crear envío</button>
        </div>
      ))}
    </PhoneShell>
  );
}

/* ── Rastreo — cronograma con auto-scroll (misma animación de multipaquetería) ── */
export function RastreoPanel() {
  const EVENTS = [
    { chip: "Hoy", icon: "truck", title: "Envío entregado · Guía #5127-SH1 · CDMX", time: "12:02:59 p.m." },
    { icon: "box", title: "Paquete entregado · Recibió: Ana Martínez", time: "12:02:59 p.m." },
    { title: "En reparto · unidad en ruta", time: "09:14:10 a.m." },
    { title: "Recolectado por la paquetería", time: "Ayer · 05:30 p.m." },
    { title: "Guía generada · #5127-SH1", time: "Ayer · 02:02 p.m." },
    { title: "Pedido preparado", time: "Ayer · 01:40 p.m." },
    { title: "Pedido pagado · $292.00 MXN", time: "Ayer · 01:38 p.m." },
  ];
  const mask = "linear-gradient(to bottom, transparent 0, #000 16px, #000 calc(100% - 22px), transparent 100%)";
  return (
    <PhoneShell>
      <div className="flex items-center" style={{ marginBottom: 14 }}>
        <p className="text-[16px] font-semibold text-black">Rastreo de envíos</p>
      </div>
      <div className="relative overflow-hidden" style={{ height: 300, maskImage: mask, WebkitMaskImage: mask }}>
        <div className="crono-track flex flex-col">
          {[...EVENTS, ...EVENTS].map((e, i) => (
            <div key={i} className="relative flex gap-3" style={{ paddingBottom: 20 }}>
              <span aria-hidden className="absolute" style={{ left: 9, top: 22, bottom: -2, borderLeft: "2px dotted rgba(0,0,0,0.16)" }} />
              <div className="relative z-10 flex w-[20px] shrink-0 justify-center" style={{ paddingTop: 3 }}>
                {e.icon === "box" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                ) : e.icon === "truck" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="1" y="6" width="13" height="10" rx="1" stroke="#1A1A1A" strokeWidth="1.5" /><path d="M14 9h4l3 3v4h-7M4 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM15 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <span className="h-[9px] w-[9px] rounded-full bg-[#1A1A1A]" style={{ marginTop: 2 }} />
                )}
              </div>
              <div className="flex-1" style={{ minWidth: 0 }}>
                {e.chip && <span className="mb-1.5 inline-block rounded-[6px] bg-black/[0.06] px-2 py-0.5 text-[11px] font-medium text-black/55">{e.chip}</span>}
                <p className="text-[12.5px] text-black/85" style={{ lineHeight: 1.4 }}>{e.title}</p>
                <p className="text-[11px] text-black/40" style={{ marginTop: 2 }}>{e.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}
