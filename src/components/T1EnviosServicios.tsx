import T1EnviosCotizador from "@/components/T1EnviosCotizador";

const IconCotiza = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><path d="M14.5 9.2c-.4-.9-1.4-1.5-2.5-1.5-1.4 0-2.5.9-2.5 2s1.1 1.7 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2c-1.1 0-2.1-.6-2.5-1.5M12 6.5v1.2M12 16.3v1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
);
const IconEnvia = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
);
const IconSeguimiento = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="14" height="17" rx="2.2" stroke="currentColor" strokeWidth="1.7" /><path d="M9 3.5h6v2.2H9z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M8.6 11l1.3 1.3 2.4-2.4M8.6 16l1.3 1.3 2.4-2.4M15 11h1.5M15 16h1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const CARDS = [
  { icon: IconCotiza, title: "Cotiza", desc: "Descubre y compara las mejores tarifas y tiempos de entrega entre las mejores paqueterías de todo México.", cta: "Cotiza ahora", href: "/productos/t1envios/multipaqueteria" },
  { icon: IconEnvia, title: "Envía", desc: "Genera guías de envío a todo México, crea plantillas de tus paquetes y solicita recolección a tu almacén.", cta: "Realiza un envío", href: "/productos/t1envios/reglas" },
  { icon: IconSeguimiento, title: "Seguimiento", desc: "Conoce la ubicación de tus paquetes en todo momento, da seguimiento a las incidencias y resuélvelas desde T1.", cta: "Rastrea un envío", href: "/productos/t1envios/rastreo" },
];

/* 3 cards de servicio — Cotiza / Envía / Seguimiento (estilo del landing actual). */
export function T1EnviosServicios() {
  return (
    <section className="bg-black px-5 pt-[90px] pb-[48px] tablet:px-6 tablet:pt-[128px] tablet:pb-[64px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
          <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            Simplifica tus envíos
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:whitespace-nowrap tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
            Cotiza, envía y da seguimiento a todas tus paqueterías desde una sola plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
          {CARDS.map((c) => (
            <div key={c.title} className="flex flex-col rounded-[20px] border border-white/[0.08] bg-[#1A1A1D] p-7 tablet:p-8">
              <span className="mb-5 flex h-[40px] w-[40px] items-center justify-center text-white/85">{c.icon}</span>
              <h3 className="font-sora text-[22px] font-normal text-white" style={{ letterSpacing: "-0.02em", marginBottom: 10 }}>{c.title}</h3>
              <p className="font-inter text-[15px] font-light leading-relaxed text-white/60 tablet:text-[16px]" style={{ marginBottom: 24 }}>{c.desc}</p>
              <a href={c.href} className="mt-auto inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-white no-underline transition-colors hover:text-white/70">
                {c.cta}
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Cotizador en vivo — su propia sección, con blobs rojos sutiles a los costados. */
export function T1EnviosCotizadorSection() {
  return (
    <section className="relative overflow-hidden bg-black px-5 pt-[48px] pb-[90px] tablet:px-6 tablet:pt-[64px] tablet:pb-[128px]">
      <div aria-hidden className="pointer-events-none absolute -left-[12%] top-[30%] h-[520px] w-[520px] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(219,59,43,0.18) 0%, transparent 70%)", filter: "blur(22px)" }} />
      <div aria-hidden className="pointer-events-none absolute -right-[6%] top-[74%] h-[340px] w-[340px] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(219,59,43,0.12) 0%, transparent 72%)", filter: "blur(16px)" }} />
      <div className="relative z-[1] mx-auto max-w-[520px] text-center">
        <h3 className="font-sora text-[26px] font-light text-white tablet:text-[38px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
          Cotiza tu envío en segundos
        </h3>
        <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 440 }}>
          Pon tu origen y destino y compara tarifas al instante.
        </p>
        <T1EnviosCotizador />
      </div>
    </section>
  );
}
