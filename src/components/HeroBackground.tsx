/* Fondo compartido de los heroes (home T1, envíos, tienda, pagos).
   Paleta cálida y coherente (coral/rojo): sin azul/índigo ni rosa, y un punto
   más clara que antes para que los widgets (cotizador, link de pago) se lean
   bien encima. Un solo lugar para que los 4 heroes se vean iguales. */
export default function HeroBackground({ fadeHeight = 260 }: { fadeHeight?: number }) {
  return (
    <>
      {/* Base — degradado cálido (plum → vino), un poco más claro */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(160deg, #6b3a4d 0%, #3e2331 52%, #281620 100%)" }}
      />
      {/* Glows — solo tonos cálidos (coral/rojo), coral al centro-arriba */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 92% 78% at 62% 26%, rgba(232,88,62,0.42) 0%, transparent 62%)," +
            "radial-gradient(ellipse 66% 60% at 14% 24%, rgba(198,58,52,0.26) 0%, transparent 60%)," +
            "radial-gradient(ellipse 58% 54% at 86% 82%, rgba(226,96,74,0.16) 0%, transparent 64%)",
        }}
      />
      {/* Grano sutil (misma textura que las cards) */}
      <div aria-hidden className="noise-grain pointer-events-none absolute inset-0 z-0" style={{ opacity: 0.04 }} />
      {/* Viñeta lateral — solo desktop: orillas un poco más oscuras (neutra cálida) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden tablet:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,10,14,0.5) 0%, rgba(20,10,14,0.18) 14%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(20,10,14,0.18) 86%, rgba(20,10,14,0.5) 100%)",
        }}
      />
      {/* Degradado al negro al fondo — corte suave hacia la sección negra.
          El negro se concentra en la parte baja para que el cálido del hero
          siga visible detrás de los campos/chips y no se los coma el negro. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
        style={{ height: fadeHeight, background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 44%, rgba(3,1,1,0.5) 74%, #000 100%)" }}
      />
    </>
  );
}
