"use client";
import { useRef, useCallback, useState } from "react";
import Image from "next/image";

interface MarketplaceIcon {
  src: string;
  alt: string;
}

interface GlassProductCardProps {
  imageSrc: string;
  price: string;
  title: string;
  units: string;
  marketplaces: MarketplaceIcon[];
  ctaLabel?: string;
  className?: string;
  /** When true, the card tilts on its own (continuous 3D float) instead of on hover. */
  autoTilt?: boolean;
}

export default function GlassProductCard({
  imageSrc,
  price,
  title,
  units,
  marketplaces,
  ctaLabel = "Ver producto",
  className = "",
  autoTilt = false,
}: GlassProductCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const wrapper = wrapperRef.current;
      const spot = spotRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      wrapper.style.setProperty("--spot-x", `${x}px`);
      wrapper.style.setProperty("--spot-y", `${y}px`);
      wrapper.style.setProperty("--glow-opacity", "1");

      if (spot) {
        spot.style.setProperty("--spot-x", `${x - 2}px`);
        spot.style.setProperty("--spot-y", `${y - 2}px`);
        spot.style.setProperty("--spot-opacity", "1");
      }

      // In auto-tilt mode the CSS animation owns the wrapper transform — don't fight it.
      if (!autoTilt) {
        const nx = (x / rect.width - 0.5) * 2;
        const ny = (y / rect.height - 0.5) * 2;
        const rotateX = -ny * 6;
        const rotateY = nx * 6;
        wrapper.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      }
    },
    [autoTilt]
  );

  const handleMouseLeave = useCallback(() => {
    const wrapper = wrapperRef.current;
    const spot = spotRef.current;
    if (!wrapper) return;

    wrapper.style.setProperty("--glow-opacity", "0");
    if (!autoTilt) {
      wrapper.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    }

    if (spot) {
      spot.style.setProperty("--spot-opacity", "0");
    }
    setIsHovered(false);
  }, [autoTilt]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`glass-card-wrapper w-[230px] cursor-pointer ${autoTilt ? "glass-auto-tilt" : ""} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="glass-card">
        <div ref={spotRef} className="glass-card-spotlight" />

        <div className="relative z-[3] p-5 flex flex-col items-center gap-[14px]">
          {/* Product image — floats up + zooms on hover */}
          <div
            className="relative w-[120px] h-[65px] transition-transform duration-500 ease-out"
            style={{
              transform: isHovered ? "translateY(-8px) scale(1.08) rotate(-2deg)" : "none",
            }}
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="120px"
              className="object-contain drop-shadow-lg transition-[filter] duration-500"
              style={{ filter: isHovered ? "drop-shadow(0 12px 20px rgba(0,0,0,0.2))" : "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
            />
          </div>

          {/* Price & title */}
          <div className="flex flex-col items-center gap-[3px] w-full text-white text-center">
            <p className="text-[22px] font-bold font-sora tracking-tight">{price}</p>
            <p className="text-[14px] font-medium font-inter">{title}</p>
          </div>

          {/* Units */}
          <p className="text-white/75 text-[13px] font-medium font-inter text-center">{units}</p>

          {/* Divider */}
          <div className="w-full h-px bg-white/20" />

          {/* Channel icons */}
          <div className="flex items-center gap-3">
            {marketplaces.map((mp, i) => (
              <div
                key={mp.alt}
                className="w-[30px] h-[30px] rounded-lg overflow-hidden bg-white transition-all duration-300 hover:scale-[1.25] hover:shadow-lg hover:z-10"
                style={{
                  transitionDelay: `${i * 40}ms`,
                  transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                }}
              >
                <Image src={mp.src} alt={mp.alt} width={30} height={30} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

          {/* CTA — brand red */}
          <button className="w-full h-[34px] rounded-[8px] bg-[#DB3B2B] text-white text-[12px] font-bold font-sora transition-all duration-200 hover:bg-[#C0332A] hover:scale-[1.03] hover:shadow-[0_4px_15px_rgba(219,59,43,0.4)]">
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
