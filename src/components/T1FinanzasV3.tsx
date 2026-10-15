import { SIGNUP_URL } from "@/lib/constants";
import T1Marca from "@/components/T1Marca";

/* ──────────────────────────────────────────────────────────────────────────
   Secciones exclusivas de la v3, inspiradas en lo que hace bien Alegra:

   1 · Que cada quien se reconozca rápido. Alegra abre con "Soy Pyme / Soy
       Contador / Alegra ERP": el perfil en primera persona, una promesa y
       una lista corta de lo que se resuelve en ese caso. Aquí los perfiles
       son las tres maneras de vender, y la lista sale de lo que ya está en
       la landing y en las preguntas frecuentes. Nada inventado.
   2 · Que se entienda que hay un ecosistema detrás, SIN que se lea como
       requisito: T1 Finanzas funciona sola —la FAQ lo dice: "Puedes usar T1
       Finanzas solo"— y el resto de T1 es lo que ganas si ya lo usas, no una
       condición para facturar. Cualquier copy de esta sección se revisa
       contra eso.
   ────────────────────────────────────────────────────────────────────────── */

const Arrow = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3.5 8h9M9 4.5L12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Palomita = (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 8.4l3.2 3.2L13 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PERFILES = [
  {
    quien: "Tengo una tienda en línea",
    donde: "Marketplaces y tienda propia",
    puntos: ["Tus pedidos llegan listos", "No conectas nada", "Una global por cada tienda"],
  },
  {
    quien: "Tengo un local",
    donde: "Mostrador, WhatsApp o en persona",
    puntos: ["La capturas en cuatro pasos", "Te sugerimos la clave", "No pagas otro sistema"],
  },
  {
    quien: "Le vendo a empresas",
    donde: "Clientes que piden factura y pagan a crédito",
    puntos: ["Facturas a crédito", "Cada pago con su recibo", "Cancelas y corriges"],
  },
  {
    quien: "Trabajo con un contador",
    donde: "Tú facturas, él lleva tus impuestos",
    puntos: ["Cada factura con su PDF y su XML", "Se los pasas listos", "Tus declaraciones las sigue viendo él"],
  },
];

/* 1 · Para quién es: el perfil en primera persona y lo que se resuelve. */
export function T1FinanzasPerfiles() {
  return (
    <section className="overflow-hidden bg-black px-5 py-[80px] tablet:px-6 tablet:py-[140px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[760px] text-center">
          <h2
            className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
          >
            Una manera de facturar para cada negocio
          </h2>
          <p className="mx-auto font-inter text-[15px] font-light text-white/60 tablet:text-[17px]" style={{ lineHeight: 1.6, maxWidth: 560 }}>
            Cada negocio factura distinto. Aquí está el tuyo.
          </p>
        </div>

        <div className="-mx-5 mt-12 flex gap-4 overflow-x-auto px-5 pb-2 text-left tablet:mx-0 tablet:mt-14 tablet:grid tablet:grid-cols-2 tablet:gap-5 desktop:grid-cols-4 tablet:overflow-visible tablet:px-0 tablet:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PERFILES.map((p) => (
            <div
              key={p.quien}
              className="flex w-[280px] shrink-0 snap-start flex-col rounded-[20px] border border-white/[0.08] bg-[#121214] p-6 tablet:w-auto tablet:p-7"
            >
              {/* Alto fijo para que las palomitas de las cuatro tarjetas empiecen
                  a la misma altura, aunque el título ocupe dos renglones. */}
              <div className="desktop:min-h-[94px]">
                <h3 className="font-sora text-[20px] font-normal text-white tablet:text-[22px]" style={{ letterSpacing: "-0.02em" }}>
                  {p.quien}
                </h3>
                <p className="mt-1.5 font-inter text-[13.5px] font-light text-white/45">{p.donde}</p>
              </div>

              <ul className="mt-6 flex list-none flex-col gap-3.5">
                {p.puntos.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-[1px] shrink-0 text-[#FF6F5E]">{Palomita}</span>
                    <span className="font-inter text-[14px] font-light text-white/65" style={{ lineHeight: 1.5 }}>
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-11 flex justify-center">
          <a
            href={SIGNUP_URL}
            data-cta-text="Comienza gratis"
            data-cta-destination={SIGNUP_URL}
            data-cta-section="perfiles"
            className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
          >
            Comienza gratis
            {Arrow}
          </a>
        </div>
      </div>
    </section>
  );
}

const PIEZAS = [
  { nombre: "Tienda", desc: "Tu tienda en línea, tus marketplaces y tu punto de venta, con el inventario sincronizado.", href: "/productos/t1tienda" },
  { nombre: "Pagos", desc: "Cobras con tarjeta, transferencia o efectivo, en línea o compartiendo un link de pago.", href: "/productos/t1pagos" },
  { nombre: "Envíos", desc: "Cotizas, envías y rastreas con más de diez paqueterías desde un solo lugar.", href: "/productos/t1envios" },
];

/* 2 · El ecosistema: la frase y, debajo, una sola tarjeta con los otros tres
   productos separados por una línea. Una tarjeta, no tres: lo que se veía de
   relleno en las versiones anteriores era tener una caja por producto con el
   isotipo repetido en cada una. En móvil la línea se vuelve horizontal. */
export function T1FinanzasEcosistema() {
  return (
    <section className="bg-[#0e0d0d] px-5 py-[64px] tablet:px-6 tablet:py-[96px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <p
          className="mx-auto text-center font-sora text-[22px] font-light text-white tablet:text-[30px]"
          style={{ letterSpacing: "-0.02em", lineHeight: 1.35, maxWidth: 760, marginBottom: 36 }}
        >
          Facturar es una parte de T1. Úsala sola o con las otras tres.
        </p>

        <div
          className="mx-auto grid grid-cols-1 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#141416] tablet:grid-cols-3"
          style={{ maxWidth: 900 }}
        >
          {PIEZAS.map((p, i) => (
            <a
              key={p.nombre}
              href={p.href}
              className={`group flex flex-col items-center gap-2.5 px-7 py-8 text-center no-underline transition-colors hover:bg-white/[0.03] ${
                i ? "border-t border-white/[0.08] tablet:border-l tablet:border-t-0" : ""
              }`}
            >
              <span className="flex items-center gap-2.5">
                <T1Marca size={27} />
                <span
                  className="font-sora text-[19px] font-normal text-white/85 transition-colors group-hover:text-white tablet:text-[21px]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {p.nombre}
                </span>
              </span>
              <span className="font-inter text-[14.5px] font-light text-white/55 tablet:text-[15px]" style={{ lineHeight: 1.5 }}>
                {p.desc}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
