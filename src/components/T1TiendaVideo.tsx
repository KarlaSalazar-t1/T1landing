export default function T1TiendaVideo() {
  return (
    <section className="bg-black px-5 py-[80px] tablet:px-6 tablet:py-[120px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 44 }}>
          <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            Mira cómo funciona
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 520 }}>
            Describe tu negocio y la IA arma tu tienda, lista para vender. Así de simple.
          </p>
        </div>

        <div
          className="mx-auto overflow-hidden rounded-[20px] border border-white/[0.08]"
          style={{ maxWidth: 920, boxShadow: "0 30px 80px -30px rgba(0,0,0,0.8)" }}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src="/video/store-creation.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
