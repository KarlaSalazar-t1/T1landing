/* Fondo compartido de los heroes (home T1, envíos, tienda, pagos).
   Es un punto intermedio entre el de T1 general (muy oscuro) y el de Tienda
   (muy claro): se parte del de Tienda y se oscurece un poco. Un solo lugar
   para que los 4 heroes se vean iguales. */
export default function HeroBackground() {
  return (
    <>
      {/* Base — degradado intermedio (Tienda oscurecida un poco) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(160deg, #5d3046 0%, #351b28 51%, #22111c 100%)" }}
      />
      {/* Glows de color — coral/rojo al centro, azul en las orillas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(230,72,54,0.42) 0%, transparent 61%)," +
            "radial-gradient(ellipse 60% 58% at 14% 22%, rgba(163,42,44,0.29) 0%, transparent 59%)," +
            "radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,116,152,0.14) 0%, transparent 63%)," +
            "radial-gradient(ellipse 60% 70% at -4% 88%, rgba(68,86,178,0.47) 0%, transparent 53%)," +
            "radial-gradient(ellipse 42% 60% at 102% 10%, rgba(68,86,178,0.39) 0%, transparent 51%)",
        }}
      />
      {/* Grano sutil (misma textura que las cards) */}
      <div aria-hidden className="noise-grain pointer-events-none absolute inset-0 z-0" style={{ opacity: 0.04 }} />
      {/* Viñeta lateral — solo desktop: orillas un poco más oscuras */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden tablet:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,9,14,0.6) 0%, rgba(12,11,16,0.24) 13%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 72%, rgba(12,11,16,0.24) 87%, rgba(10,9,14,0.6) 100%)",
        }}
      />
      {/* Acento azul — esquina superior derecha, solo desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden tablet:block"
        style={{ background: "radial-gradient(circle at 97% -2%, rgba(4,24,82,0.7) 0%, rgba(17,0,85,0) 27%)" }}
      />
      {/* Degradado al negro al fondo — corte suave hacia la sección negra */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[260px]"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(3,1,1,0.85) 55%, #000 100%)" }}
      />
    </>
  );
}
