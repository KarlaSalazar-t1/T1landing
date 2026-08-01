/* "El problema" intro — título + subtítulo centrados sobre la banda negra. */

export default function T1Problema() {
  return (
    <section className="relative bg-black px-5 pb-16 pt-[104px] tablet:px-6 tablet:pb-8 tablet:pt-[112px]">
      <div className="mx-auto max-w-[880px] text-left tablet:text-center">
        <h2 className="mx-auto font-sora text-[32px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
          Crece sin complicaciones.
        </h2>
        <p className="mx-auto mt-5 font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 640 }}>
          Vende, cobra y envía en un solo ecosistema conectado.
        </p>
      </div>
    </section>
  );
}
