"use client";

import { useState, useEffect } from "react";

const CARDS = [
  {
    brand: "VISA",
    bg: "linear-gradient(135deg, #1a1f71 0%, #2962ff 50%, #1565c0 100%)",
    logo: <span className="font-sora text-[20px] font-bold italic text-white tracking-wide">VISA</span>,
  },
  {
    brand: "Mastercard",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #e53935 50%, #ff6f00 100%)",
    logo: (
      <div className="flex items-center">
        <div className="h-[20px] w-[20px] rounded-full bg-[#eb001b]" />
        <div className="h-[20px] w-[20px] -ml-2.5 rounded-full bg-[#f79e1b] opacity-80" />
      </div>
    ),
  },
  {
    brand: "Amex",
    bg: "linear-gradient(135deg, #006fcf 0%, #00a1e4 50%, #007bc1 100%)",
    logo: <span className="font-sora text-[14px] font-bold text-white tracking-widest">AMEX</span>,
  },
  {
    brand: "SPEI",
    bg: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f0f0f0 100%)",
    logo: <span className="font-sora text-[14px] font-bold text-[#0d1b2a] tracking-wider">SPEI</span>,
    isTransfer: true,
  },
];

export default function GlassCreditCard() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((c) => (c + 1) % CARDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative"
      style={{
        width: 280,
        height: 220,
      }}
    >
      {/* Stacked cards behind — wallet effect */}
      {CARDS.map((card, i) => {
        const isActive = i === activeCard;
        const offset = ((i - activeCard + CARDS.length) % CARDS.length);
        if (offset > 2) return null; // only show 3 cards max

        return (
          <div
            key={card.brand}
            className="absolute left-0 right-0 overflow-hidden"
            style={{
              top: offset * 10,
              height: 175,
              borderRadius: 16,
              background: card.bg,
              padding: "20px 24px",
              boxShadow: isActive
                ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.25)"
                : "0 4px 16px rgba(0,0,0,0.15)",
              zIndex: 10 - offset,
              transform: `scale(${1 - offset * 0.04})`,
              opacity: offset === 0 ? 1 : 0.7 - offset * 0.15,
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              fontFamily: "var(--font-manrope-var), sans-serif",
            }}
          >
            {("isTransfer" in card && card.isTransfer) ? (
              /* SPEI Transfer layout */
              <>
                <div className="relative z-10 flex items-center justify-between">
                  {card.logo}
                  <span className="text-[9px] font-medium text-black/30">Transferencia</span>
                </div>
                <div className="relative z-10 flex flex-col gap-3" style={{ marginTop: 20 }}>
                  <div>
                    <p className="text-[8px] font-medium text-black/30">Beneficiario</p>
                    <p className="text-[12px] font-semibold text-black/70">T1 Comercio S.A. de C.V.</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-medium text-black/30">CLABE</p>
                      <p className="font-mono text-[11px] font-semibold text-black/60">0461 8060 1234 5678</p>
                    </div>
                    <div className="flex h-[22px] items-center rounded-[6px] bg-[#0d1b2a] px-3">
                      <span className="text-[8px] font-bold text-white">Copiar</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] font-medium text-black/30">Banco</p>
                    <p className="text-[11px] font-semibold text-black/60">STP</p>
                  </div>
                </div>
              </>
            ) : (
              /* Credit card layout */
              <>
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)" }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  {card.logo}
                  <div className="h-[24px] w-[32px] rounded-[4px]" style={{ background: "linear-gradient(135deg, #d4af37 0%, #f5d442 50%, #d4af37 100%)" }} />
                </div>
                <div className="relative z-10" style={{ marginTop: 24 }}>
                  <p className="font-mono text-[16px] font-medium tracking-[0.12em] text-white/90">
                    •••• •••• •••• 4589
                  </p>
                </div>
                <div className="relative z-10 flex items-end justify-between" style={{ marginTop: 16 }}>
                  <div>
                    <p className="text-[8px] font-medium uppercase tracking-wider text-white/35">Titular</p>
                    <p className="text-[11px] font-semibold tracking-wide text-white/80">MIGUEL LUNA</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-medium uppercase tracking-wider text-white/35">Expira</p>
                    <p className="text-[11px] font-semibold text-white/80">09/28</p>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
