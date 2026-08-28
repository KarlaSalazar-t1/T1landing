import Image from "next/image";

/* Halo con logos de paquetería orbitando — recreado del landing actual de T1 Envíos. */
const LOGOS = [
  "/img/circles/dhl.svg",
  "/img/circles/fedex.svg",
  "/img/circles/ups.svg",
  "/img/circles/ampm.svg",
  "/img/circles/99.svg",
];
const DUR = 26; // segundos por vuelta

export default function T1EnviosOrbitHalo({ size = 420, radius = 190 }: { size?: number; radius?: number }) {
  const n = LOGOS.length;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Glow suave */}
      <div aria-hidden className="absolute rounded-full" style={{ inset: -30, background: "radial-gradient(ellipse at 50% 50%, rgba(229,144,134,0.16) 0%, transparent 65%)" }} />
      {/* Aro */}
      <div aria-hidden className="absolute inset-0 rounded-full" style={{ border: "1.5px solid rgba(219,59,43,0.22)", boxShadow: "0 0 0 14px rgba(219,59,43,0.03), inset 0 0 40px rgba(219,59,43,0.05)" }} />
      <div aria-hidden className="absolute rounded-full" style={{ inset: size * 0.16, border: "1px solid rgba(255,255,255,0.05)" }} />

      {/* Núcleo */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full" style={{ width: size * 0.3, height: size * 0.3, background: "radial-gradient(circle, rgba(219,59,43,0.22) 0%, rgba(219,59,43,0.05) 55%, transparent 72%)" }}>
        <span className="flex items-center justify-center rounded-full bg-white" style={{ width: size * 0.19, height: size * 0.19, boxShadow: "0 10px 34px rgba(0,0,0,0.35)" }}>
          <Image src="/img/icon-envios.svg" alt="T1 Envíos" width={72} height={72} style={{ width: size * 0.11, height: size * 0.11 }} className="object-contain" />
        </span>
      </div>

      {/* Logos orbitando */}
      {LOGOS.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className="halo-orbit-item absolute left-1/2 top-1/2"
          style={{
            width: 62,
            height: 62,
            margin: "-31px 0 0 -31px",
            transformOrigin: "31px 31px",
            ["--halo-r" as string]: `${radius}px`,
            animation: `halo-orbit ${DUR}s linear infinite`,
            animationDelay: `${-(DUR / n) * i}s`,
          }}
        >
          <span className="flex h-[62px] w-[62px] items-center justify-center overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 6px 22px rgba(0,0,0,0.20)" }}>
            <Image src={src} alt="" width={72} height={72} className="h-full w-full object-cover" />
          </span>
        </div>
      ))}
    </div>
  );
}
