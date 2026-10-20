import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import HeroBackground from "@/components/HeroBackground";
import T1RastreoResultado from "@/components/T1RastreoResultado";
import { rastreoDemo } from "@/lib/rastreoDemo";
import T1RastreoBuscar from "@/components/T1RastreoBuscar";
import { ENVIOS_SIGNUP_URL, ENVIOS_QUOTE_URL } from "@/lib/constants";

export const metadata = {
  title: "Estatus de tu envío · T1",
  description: "Consulta el estatus de tu paquete, su historial y la paquetería que lo entrega.",
  robots: { index: false, follow: false },
};

/* Resultado de rastreo: /rastreo/[guia]. Se llega desde el input de /rastreo y
   del hero de /productos/t1envios/rastreo. Página propia (no dentro del hero)
   para que la liga se pueda compartir con el cliente final.
   REFERENCIA PARA DESARROLLO: usa datos de ejemplo (`rastreoDemo`). El
   estatus de ejemplo depende del último dígito de la guía:
   0-3 Entregada · 4-6 En tránsito · 7-9 Retornada
   (p. ej. /rastreo/P2635406835704341 · …345 · …348). */
export default async function RastreoResultadoPage({ params }: { params: Promise<{ guia: string }> }) {
  const { guia } = await params;
  const numero = decodeURIComponent(guia);
  const r = rastreoDemo(numero);

  return (
    <main className="min-h-screen bg-black">
      <T1Navbar ctaLabel="Comienza a enviar" ctaHref={ENVIOS_SIGNUP_URL} product="envios" pageType="sublanding" />

      {/* Banda superior compacta: solo el buscador (sin título visible, para
          que el resultado suba y se vea el historial en el primer pantallazo) */}
      <section className="relative overflow-hidden px-5 pb-40 pt-24 tablet:px-6 tablet:pb-44 tablet:pt-[100px]">
        <HeroBackground fadeHeight={320} />
        <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center text-center">
          <h1 className="sr-only">Rastrea tu envío</h1>
          <div id="buscar-guia" className="w-full scroll-mt-28">
            <T1RastreoBuscar inicial={numero} compacto />
          </div>
        </div>
      </section>

      {/* Resultado (se monta sobre la banda) */}
      <section className="relative z-10 -mt-32 px-5 pb-16 tablet:-mt-40 tablet:px-6 tablet:pb-24">
        <T1RastreoResultado r={r} />

      </section>

      {/* Venta: quien rastrea muchas veces también envía */}
      <section className="px-5 pb-[72px] tablet:px-6 tablet:pb-[96px]">
        <div className="mx-auto flex max-w-[880px] flex-col items-center gap-5 rounded-[24px] border border-white/[0.08] bg-[#141215] px-6 py-12 text-center tablet:px-10">
          <h2 className="font-sora text-[26px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Envía al mejor precio con T1 Envíos
          </h2>
          <p className="max-w-[520px] font-inter text-[15px] font-light leading-[1.55] text-white/60 tablet:text-[17px]">
            Compara tarifas de las principales paqueterías del país y crea tu guía en minutos.
          </p>
          <a href={ENVIOS_QUOTE_URL} className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
            Cotiza tu envío
          </a>
        </div>
      </section>

      <T1Footer />
    </main>
  );
}
