/* "El problema" intro — título + subtítulo centrados sobre la banda negra. */

import { SIGNUP_URL } from "@/lib/constants";

export default function T1Problema() {
  return (
    <section className="relative bg-black px-5 pb-16 pt-[104px] tablet:px-6 tablet:pb-8 tablet:pt-[112px]">
      <div className="mx-auto max-w-[880px] text-center">
        <h2 className="mx-auto font-sora text-[32px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
          Crece sin complicaciones.
        </h2>
        <p className="mx-auto mt-5 font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 640 }}>
          Vende, cobra y envía en un solo ecosistema conectado.
        </p>
        <a
          href={SIGNUP_URL}
          className="group mt-6 inline-flex items-center gap-1.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:text-white/80"
        >
          Comienza gratis
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="transition-transform duration-150 group-hover:translate-x-0.5">
            <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
