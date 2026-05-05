"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MARKETPLACES = [
  { name: "MercadoLibre", src: "/img/meli-iso.svg" },
  { name: "Amazon", src: "/img/amazon-iso.svg" },
  { name: "Walmart", src: "/img/walmart.svg" },
  { name: "Sears", src: "/img/sears-isotipo.svg" },
  { name: "SHEIN", src: "/img/shein-iso.svg" },
];

export default function ProductCard({ animate }: { animate: boolean }) {
  const [count, setCount] = useState(13);
  const [amazonBounce, setAmazonBounce] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const timeout = setTimeout(() => {
      setCount(14);
      setAmazonBounce(true);
      // Reset bounce after animation completes
      setTimeout(() => setAmazonBounce(false), 600);
    }, 1200);
    return () => clearTimeout(timeout);
  }, [animate]);

  return (
    <div
      className="flex flex-col items-center"
      style={{
        width: 260,
        padding: "20px 20px 24px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(40px) saturate(1.4)",
        WebkitBackdropFilter: "blur(40px) saturate(1.4)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
        fontFamily: "var(--font-manrope-var), sans-serif",
      }}
    >
      {/* Product image — no background */}
      <div
        className="mb-4 flex items-center justify-center"
        style={{ width: 160, height: 120 }}
      >
        <Image
          src="/img/tenis-transparente.png"
          alt="Tenis blancos"
          width={160}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Price */}
      <p className="text-[24px] font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
        $1,345.99
      </p>

      {/* Product name */}
      <p className="mt-1 text-[13px] font-medium text-white/80">
        Tenis blancos clasicos
      </p>

      {/* Units */}
      <p className="mt-0.5 text-[12px] font-normal text-white/50">
        1,003 unidades
      </p>

      {/* Separator */}
      <div className="my-3 w-full" style={{ height: 1, background: "rgba(255,255,255,0.15)" }} />

      {/* Marketplace SVG icons — only Amazon bumps on count change */}
      <div className="flex items-center gap-2">
        {MARKETPLACES.map((mp) => (
          <div
            key={mp.name}
            className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden transition-transform duration-500"
            style={{
              animation:
                mp.name === "Amazon" && amazonBounce
                  ? "countBump 0.5s ease-out"
                  : "none",
            }}
          >
            <Image src={mp.src} alt={mp.name} width={36} height={36} className="object-contain" />
          </div>
        ))}
      </div>

      {/* Pedidos count — animates from 13 to 14 */}
      <p className="mt-3 text-[13px] font-medium text-white/60">
        <span
          key={count}
          className="inline-block"
          style={{
            animation: count === 14 ? "countBump 0.5s ease-out" : "none",
          }}
        >
          {count} pedidos
        </span>
      </p>
    </div>
  );
}
