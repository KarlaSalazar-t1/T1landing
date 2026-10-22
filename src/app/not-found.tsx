import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1NotFoundActions from "@/components/T1NotFoundActions";

export const metadata = {
  title: "Página no encontrada · T1",
  description: "La página que buscas cambió de lugar o ya no existe.",
};

/* 404 global. Un solo CTA al home general (quien llega desde Google, un
   correo o un link roto no tiene historial dentro del sitio, así que un "back"
   solo lo sacaría de T1; quien venía navegando ya tiene el back del navegador). */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-black">
      <T1Navbar pageType="sublanding" />

      <section className="relative overflow-hidden px-5 pb-16 pt-[96px] tablet:px-10 tablet:pb-24 tablet:pt-[150px]">
        {/* Ambient red glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[38%] h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(219,59,43,0.16) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative mx-auto flex max-w-[860px] flex-col items-center text-center">
          {/* 404 como ilustración arriba del título (no detrás, para que se lea) */}
          <div
            aria-hidden
            className="select-none font-sora text-[76px] font-semibold leading-none tablet:text-[128px]"
            style={{
              letterSpacing: "-0.05em",
              marginBottom: 8,
              background: "linear-gradient(180deg, rgba(219,59,43,0.12) 0%, rgba(219,59,43,0) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextStroke: "0.75px rgba(255,140,125,0.15)",
            }}
          >
            404
          </div>
          <h1
            className="font-sora text-[28px] font-light text-white tablet:text-[44px] lg:text-[52px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}
          >
            Esta página ya no existe
          </h1>
          <p className="font-inter text-[15px] font-light text-white/50 tablet:text-[18px]" style={{ lineHeight: 1.5, marginBottom: 28 }}>
            El enlace cambió o está mal escrito.
          </p>

          <T1NotFoundActions />
        </div>
      </section>

      <T1Footer />
    </main>
  );
}
