"use client";

import { useEffect, useState } from "react";
import { ENVIOS_SIGNUP_URL } from "@/lib/constants";

/* CTA sticky solo-móvil para T1 Envíos. La métrica que decide el A/B es
   "alta iniciada" (llegar a onboarding) y el scroll cae en seco tras el hero,
   así que este botón mantiene el CTA a la vista sin depender del scroll.
   Aparece al pasar ~el primer viewport y se oculta cerca del final (para no
   encimarse con el CTA final). data-cta-* quedan como hooks de instrumentación. */
export default function T1EnviosStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const nearBottom = y + vh >= docH - 680;
      setShow(y > vh * 0.8 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 tablet:hidden"
      style={{
        transform: show ? "translateY(0)" : "translateY(130%)",
        transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="border-t border-white/10 bg-[#0d070b]/92 px-4 pt-3 backdrop-blur" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}>
        <a
          href={ENVIOS_SIGNUP_URL}
          data-cta-location="sticky_mobile"
          data-cta-text="Comienza a enviar"
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-red-500 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600 active:bg-red-600"
        >
          Comienza a enviar
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </div>
  );
}
