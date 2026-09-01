export default function T1EnviosVideo() {
  return (
    <section className="bg-[#0e0d0d] px-5 py-[80px] tablet:px-6 tablet:py-[120px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="text-center" style={{ marginBottom: 44 }}>
          <h2 className="mx-auto max-w-[760px] font-sora text-[28px] font-light text-white tablet:whitespace-nowrap tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            Conoce el administrador de T1 Envíos
          </h2>
          <p className="mx-auto max-w-[720px] font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
            Mira cómo puedes cotizar, programar recolecciones, revisar rastreos y consultar tus envíos desde una sola plataforma.
          </p>
        </div>

        <div
          className="mx-auto overflow-hidden rounded-[20px] border border-white/[0.08]"
          style={{ maxWidth: 920, boxShadow: "0 30px 80px -30px rgba(0,0,0,0.8)" }}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video autoPlay muted loop playsInline preload="metadata" className="block h-auto w-full">
            <source src="/video/envios-compara.webm" type="video/webm" />
            <source src="/video/envios-compara.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
