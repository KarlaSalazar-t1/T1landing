import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import HeroBackground from "@/components/HeroBackground";
import { T1NotFoundHomeCTA, T1NotFoundLinks } from "@/components/T1NotFoundActions";

/* Cuerpo de la 404, en dos columnas (referencia: Shopify): a la izquierda qué
   pasó + "Vuelve al inicio"; a la derecha la lista de productos. En móvil se apilan.
   `fondo`: "hero" = degradado cálido de los heroes (HeroBackground);
   "oscuro" = negro con glow rojo. */
export default function T1NotFound({ fondo = "hero" }: { fondo?: "oscuro" | "hero" }) {
  const hero = fondo === "hero";

  return (
    <main className="min-h-screen bg-black">
      <T1Navbar pageType="sublanding" />

      {/* Padding inferior alto para que el degradado al negro sea largo y no
          se corte de golpe contra el footer. */}
      <section className="relative overflow-hidden px-5 pb-36 pt-[92px] tablet:px-10 tablet:pb-52 tablet:pt-[150px]">
        {hero ? (
          <HeroBackground fadeHeight={480} />
        ) : (
          /* Ambient red glow */
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[38%] h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(219,59,43,0.16) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
        )}

        <div className="relative z-[1] mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col items-start text-left">
            {/* 404 en contorno, sutil (sobre el degradado del hero va en blanco) */}
            <div
              aria-hidden
              className="select-none font-sora text-[56px] font-semibold leading-none tablet:text-[88px]"
              style={{
                letterSpacing: "-0.05em",
                marginBottom: 12,
                background: hero
                  ? "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%)"
                  : "linear-gradient(180deg, rgba(219,59,43,0.12) 0%, rgba(219,59,43,0) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextStroke: hero ? "0.75px rgba(255,255,255,0.3)" : "0.75px rgba(255,140,125,0.15)",
              }}
            >
              404
            </div>
            <h1
              className="font-sora text-[32px] font-light text-white tablet:text-[48px] lg:text-[56px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 14 }}
            >
              Página no encontrada
            </h1>
            <p className={`font-inter text-[15px] font-light tablet:text-[18px] ${hero ? "text-white/70" : "text-white/50"}`} style={{ lineHeight: 1.5, marginBottom: 24 }}>
              El enlace cambió o está mal escrito.
            </p>
            <T1NotFoundHomeCTA />
          </div>

          <T1NotFoundLinks />
        </div>
      </section>

      <T1Footer />
    </main>
  );
}
