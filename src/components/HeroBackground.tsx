/* Fondo compartido de los heroes (home T1, envíos, tienda, pagos).
   Paleta cálida y coherente (coral/rojo): sin azul/índigo ni rosa, y un punto
   más clara que antes para que los widgets (cotizador, link de pago) se lean
   bien encima. Un solo lugar para que los 4 heroes se vean iguales. */
export default function HeroBackground({ fadeHeight = 260 }: { fadeHeight?: number }) {
  return (
    <>
      {/* Base — degradado cálido más saturado (rojo-vino, no pastel) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(160deg, #7a2f45 0%, #4a1e2d 52%, #2a111d 100%)" }}
      />
      {/* Glows — tonos cálidos (coral/rojo) más vibrantes, coral al centro-arriba */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 92% 78% at 62% 26%, rgba(242,84,50,0.55) 0%, transparent 62%)," +
            "radial-gradient(ellipse 66% 60% at 14% 24%, rgba(214,48,44,0.36) 0%, transparent 60%)," +
            "radial-gradient(ellipse 58% 54% at 86% 82%, rgba(238,96,66,0.24) 0%, transparent 64%)",
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
