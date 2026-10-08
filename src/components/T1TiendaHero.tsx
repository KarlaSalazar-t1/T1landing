"use client";

import TiendaPromptBox from "@/components/TiendaPromptBox";
import HeroBackground from "@/components/HeroBackground";

const SOCIAL_PROOF = ["+50,000 negocios", "+40M de envíos", "+200M transacciones"];

export default function T1TiendaHero({ pageContext = "producto_tienda" }: { pageContext?: string }) {
  return (
    <div className="relative z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pb-0 pt-24 tablet:min-h-[min(100svh,880px)] wide:min-h-[min(100svh,980px)] tablet:px-6 tablet:pt-28 tablet:pb-0">
        {/* Fondo (compartido entre los heroes) */}
        <HeroBackground />

        {/* Contenido */}
        <div className="relative z-10 flex w-full max-w-[440px] grow flex-col items-center tablet:max-w-[720px] wide:max-w-[860px]">
          {/* Título */}
          <h1
            className="mt-8 text-center font-sora text-[30px] font-light leading-[1.12] text-white tablet:mt-14 tablet:whitespace-nowrap tablet:text-[44px] wide:text-[56px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Crea tu tienda en segundos
          </h1>

          <p className="mt-4 max-w-[440px] text-center font-inter text-[16px] font-light leading-[1.55] text-white/70 tablet:mt-5 tablet:max-w-none tablet:whitespace-nowrap tablet:text-[17px] wide:text-[20px]">
            Vende, cobra y envía a todo México con T1.
          </p>
          <p className="mt-3 font-inter text-[14px] font-medium leading-none text-white/75 tablet:mt-4 tablet:text-[15px] wide:text-[17px]">
            Empieza gratis. Sin tarjeta de crédito.
          </p>

          {/* Prompt + chips — MISMO componente que la landing /tienda-con-ia */}
          <div className="flex w-full flex-1 flex-col items-center justify-center py-6">
            <TiendaPromptBox pageContext={pageContext} />
          </div>

          {/* Social proof — estilo hero principal: métrica grande arriba, dos abajo */}
          <div className="mb-10 flex flex-col items-center gap-2.5 text-center tablet:mb-14 tablet:gap-4">
            <span className="font-inter text-[19px] font-normal text-white tablet:text-[24px]">{SOCIAL_PROOF[0]}</span>
            <div className="flex items-center gap-6 tablet:gap-12">
              {SOCIAL_PROOF.slice(1).map((s) => (
                <span key={s} className="font-inter text-[15px] font-normal text-white/75 tablet:text-[18px]">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
