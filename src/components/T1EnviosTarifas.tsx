import { SIGNUP_URL } from "@/lib/constants";

/* Sample shipping rates — reference prices for 1 kg, standard service.
   Replace the numbers with T1's real published rates. */
const ROUTES = [
  { from: "CDMX", to: "CDMX", price: "89", carrier: "Estafeta" },
  { from: "CDMX", to: "Guadalajara", price: "115", carrier: "Estafeta" },
  { from: "CDMX", to: "Monterrey", price: "119", carrier: "Estafeta" },
];

const BoxIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M4 7.5l8 4.5 8-4.5M12 12v9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export default function T1EnviosTarifas() {
  return (
    <section className="bg-[#0e0d0d] px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="text-center" style={{ marginBottom: 48 }}>
          <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            Ahorra en cada envío
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 520 }}>
            Tarifas preferenciales de +10 paqueterías, sin volumen mínimo ni contratos.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1040px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
          {ROUTES.map((r) => (
            <div key={r.to} className="rounded-[18px] border border-white/[0.08] bg-[#1A1A1D] p-7">
              {/* Ruta */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1" style={{ marginBottom: 20 }}>
                <span className="font-sora text-[22px] font-normal text-white tablet:text-[24px]" style={{ letterSpacing: "-0.01em" }}>{r.from}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#DB3B2B]">
                  <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-sora text-[22px] font-normal text-white tablet:text-[24px]" style={{ letterSpacing: "-0.01em" }}>{r.to}</span>
              </div>

              {/* Peso / servicio */}
              <div className="flex items-center gap-2 font-inter text-[13px] text-white/55" style={{ marginBottom: 18 }}>
                {BoxIcon}
                <span>1 kg · Envío estándar</span>
              </div>

              {/* Precio */}
              <div className="flex items-end gap-1.5" style={{ marginBottom: 8 }}>
                <span className="font-inter text-[14px] font-light text-white/45" style={{ marginBottom: 6 }}>desde</span>
                <span className="font-sora text-[38px] font-light text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>${r.price}</span>
              </div>
              <p className="font-inter text-[13px] font-light text-white/45">Con T1 Envíos · {r.carrier}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mx-auto mt-8 flex max-w-[620px] items-start justify-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-white/40">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 11v5M12 8v.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <p className="font-inter text-[13px] font-light leading-relaxed text-white/45">
            Precios de referencia para 1 kg en envío estándar. Varían según destino, peso y paquetería.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a href={SIGNUP_URL} className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-8 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors duration-150 hover:bg-[#C0332A]">
            Cotiza tu envío
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
