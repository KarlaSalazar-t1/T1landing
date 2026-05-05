"use client";
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
}

export default function GlassProductCard({
  imageSrc,
  price,
  title,
  units,
  marketplaces,
  ctaLabel = "Comprar",
  className = "",
}: GlassProductCardProps) {
  return (
    <div className={`glass-card-wrapper w-[230px] ${className}`}>
      {/* Inner glass panel */}
      <div className="glass-card">
        {/* Content */}
        <div className="relative z-[3] p-5 flex flex-col items-center gap-[14px]">
          {/* Product Image */}
          <div className="relative w-[120px] h-[65px]">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-contain drop-shadow-lg"
              style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
            />
          </div>

          {/* Price & Title */}
          <div className="flex flex-col items-center gap-[3px] w-full text-white text-center">
            <p className="text-[22px] font-bold font-sora tracking-tight">
              {price}
            </p>
            <p className="text-[14px] font-medium font-inter">
              {title}
            </p>
          </div>

          {/* Units */}
          <p className="text-white text-[13px] font-medium font-inter text-center">
            {units}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-white/20" />

          {/* Marketplace Icons */}
          <div className="flex items-center gap-3">
            {marketplaces.map((mp) => (
              <div
                key={mp.alt}
                className="w-[30px] h-[30px] rounded-lg overflow-hidden"
              >
                <Image
                  src={mp.src}
                  alt={mp.alt}
                  width={30}
                  height={30}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* (CTA button removed per design — main CTA lives on the outer card) */}
        </div>
      </div>
    </div>
  );
}
