/* ──────────────────────────────────────────────────────────────────────────
   El diferenciador: los pedidos ya están aquí, no hay que capturarlos.

   Es lo único que la competencia no puede copiar —Alegra, Heru, SenHub y
   FacturaGo te piden capturar la venta porque no son el lugar donde vendes—,
   y antes vivía en pedacitos: el panel del hero, una tarjeta de beneficio,
   una pestaña y un perfil. Aquí tiene su sección, y el video es su prueba.

   El video es hoy un marcador de lugar: Finanzas está en beta y todavía no
   hay grabación.

   Cuando exista, se deja el archivo en /public/video y se le pasa `src`:

     <T1FinanzasPedidos src="/video/finanzas-factura" />

   Con `src`, el componente pinta el mismo video silencioso en bucle que usa
   T1 Envíos (busca .webm y .mp4 con ese nombre) y el marcador desaparece
   solo. Sin `src`, se ve el recuadro con la nota de pendiente, para que
   nadie lo publique por error creyendo que es el video. */
export default function T1FinanzasPedidos({ src }: { src?: string }) {
  return (
    <section className="bg-[#0e0d0d] px-5 py-[80px] tablet:px-6 tablet:py-[120px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="text-center" style={{ marginBottom: 44 }}>
          <h2
            className="mx-auto font-sora text-[28px] font-light text-white tablet:text-[44px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
          >
            Facturar sin capturar nada
          </h2>
          <p className="mx-auto max-w-[720px] font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
            Tu pedido llega con el cliente, los productos y los montos.
          </p>
        </div>

        <div
          className="mx-auto overflow-hidden rounded-[20px] border border-white/[0.08]"
          style={{ maxWidth: 920, boxShadow: "0 30px 80px -30px rgba(0,0,0,0.8)" }}
        >
          {src ? (
            /* eslint-disable-next-line jsx-a11y/media-has-caption */
            <video autoPlay muted loop playsInline preload="metadata" className="block h-auto w-full">
              <source src={`${src}.webm`} type="video/webm" />
              <source src={`${src}.mp4`} type="video/mp4" />
            </video>
          ) : (
            <div
              className="relative flex aspect-video w-full items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1A1A1D 0%, #141416 55%, #1F1512 100%)" }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,59,43,0.18) 0%, transparent 65%)" }}
              />

              <span className="relative flex flex-col items-center gap-5">
                <span
                  className="flex h-[76px] w-[76px] items-center justify-center rounded-full"
                  style={{ background: "rgba(219,59,43,0.14)", border: "1px solid rgba(219,59,43,0.35)" }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#FF6F5E" aria-hidden>
                    <path d="M8 5.2c0-.8.9-1.3 1.6-.9l9 6.8c.6.5.6 1.3 0 1.8l-9 6.8c-.7.4-1.6-.1-1.6-.9V5.2Z" />
                  </svg>
                </span>
                <span className="font-inter text-[14px] font-light text-white/45">
                  Aquí va la captura del producto
                </span>
              </span>

              {/* Marca de pendiente: que no se publique creyendo que es el video */}
              <span
                className="absolute left-5 top-5 rounded-full px-3 py-1.5 font-inter text-[11.5px] font-semibold uppercase tracking-[0.06em]"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}
              >
                Pendiente de grabar
              </span>
            </div>
          )}
        </div>

        <p className="mx-auto mt-8 max-w-[720px] text-center font-inter text-[15px] font-light text-white/45 tablet:mt-10 tablet:text-[16px]">
          Un facturador normal te pide capturar cada venta. Aquí ya está.
        </p>
      </div>
    </section>
  );
}
