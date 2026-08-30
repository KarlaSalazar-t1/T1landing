"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";

const Check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ArrowLink = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const SALDOS = ["$2,450.00", "$4,820.00", "$6,150.00", "$3,900.00"];

/* ══════════ Recarga — saldo prepago ══════════ */
export function T1EnviosRecarga() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SALDOS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
          <div>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16, maxWidth: 440 }}>
              Recarga y envía sin detenerte
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 24, maxWidth: 440 }}>
              Carga saldo con tarjeta o SPEI y paga tus guías en segundos. Control total, sin costos extra ni procesos complicados.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {[
                "Añade saldo con tarjeta de crédito/débito o por SPEI.",
                "Activa la recarga automática y tus envíos nunca se detienen.",
                "Recibe comprobantes y reportes automáticos de cada movimiento.",
              ].map((it) => (
                <li key={it} className="flex items-start gap-3 font-inter text-[15px] text-white/75 tablet:text-[16px]">{Check}{it}</li>
              ))}
            </ul>
            <a href={SIGNUP_URL} className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
              Comienza a enviar {ArrowLink}
            </a>
          </div>

          {/* Mock — tarjeta de saldo */}
          <div className="flex justify-center tablet:justify-end">
            <div className="w-full max-w-[360px] rounded-[20px] border border-white/[0.10] bg-[#151318] p-6" style={{ boxShadow: "0 24px 60px -30px rgba(0,0,0,0.7)" }}>
              <p className="font-inter text-[13px] font-medium text-white/50">Saldo disponible</p>
              <p className="mt-1 font-sora text-[36px] font-light text-white" style={{ letterSpacing: "-0.02em" }}>
                <span key={i} className="inline-block" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>{SALDOS[i]}</span>
                <span className="ml-1 text-[15px] text-white/40">MXN</span>
              </p>

              <div className="mt-5 flex items-center justify-between rounded-[12px] border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                <span className="font-inter text-[14px] text-white/75">Recarga automática</span>
                <span className="relative h-[22px] w-[38px] rounded-full bg-[#22C55E]">
                  <span className="absolute right-[3px] top-[3px] h-[16px] w-[16px] rounded-full bg-white" />
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-white/[0.08] bg-white/[0.04]">
                  <Image src="/img/icons/visa-card.svg" alt="Visa" width={40} height={26} className="h-[22px] w-auto object-contain" />
                  <Image src="/img/icons/mc-card.svg" alt="Mastercard" width={40} height={26} className="h-[22px] w-auto object-contain" />
                </span>
                <span className="flex h-11 flex-1 items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.04]">
                  <Image src="/img/icons/spei-card.svg" alt="SPEI" width={54} height={26} className="h-[22px] w-auto object-contain" />
                </span>
              </div>

              <div className="mt-4 flex h-[46px] w-full items-center justify-center rounded-[12px] bg-white font-inter text-[14px] font-semibold text-[#151318]">
                Recargar saldo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ Incidencias — resuélvelas antes que tu cliente ══════════ */
export function T1EnviosIncidencias() {
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
          {/* Imagen */}
          <div className="order-2 overflow-hidden rounded-[20px] tablet:order-1">
            <Image src="/img/incidencias-big.png" alt="Torre de control de incidencias T1 Envíos" width={1246} height={1246} className="block h-auto w-full" sizes="(max-width: 768px) 92vw, 560px" />
          </div>

          <div className="order-1 tablet:order-2">
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16, maxWidth: 440 }}>
              Adelántate a las incidencias
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 24, maxWidth: 440 }}>
              Detecta retrasos y problemas de entrega y gestiónalos desde un solo panel, sin perseguir a la paquetería.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {[
                "Alertas automáticas de incidencias por paquetería.",
                "Da seguimiento y resuelve cada caso en un solo lugar.",
                "Mantén informados a tus clientes sin trabajo manual.",
              ].map((it) => (
                <li key={it} className="flex items-start gap-3 font-inter text-[15px] text-white/75 tablet:text-[16px]">{Check}{it}</li>
              ))}
            </ul>
            <a href="/productos/t1envios/control-calidad" className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
              Conoce más {ArrowLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ Amplifica tu operación — ecosistema T1 (Pagos + Tienda) ══════════ */
const ECOSISTEMA = [
  {
    title: "T1 Pagos",
    logo: "/img/t1pagos-white.svg",
    desc: "Acepta tarjetas, SPEI, Kueski y meses sin intereses con una pasarela pensada para convertir.",
    href: "/productos/t1pagos",
    type: "card" as const,
    icons: ["/img/icons/visa-card.svg", "/img/icons/mc-card.svg", "/img/icons/amex-card.svg", "/img/icons/spei-card.svg", "/img/icons/kueski-card.svg"],
  },
  {
    title: "T1 Tienda",
    logo: "/img/t1tienda-white.svg",
    desc: "Crea tu tienda en línea con IA y vende en los principales marketplaces desde un solo panel.",
    href: "/productos/t1tienda",
    type: "brand" as const,
    icons: ["/img/logos/brands/mercadolibre.webp", "/img/logos/brands/amazon.webp", "/img/logos/brands/tiktokshop.webp", "/img/logos/brands/shein.webp"],
  },
];
export function T1EnviosAmplifica() {
  return (
    <section className="bg-[#0e0d0d] px-5 py-[80px] tablet:px-6 tablet:py-[110px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="text-center">
          <h2 className="font-sora text-[28px] font-light text-white tablet:whitespace-nowrap tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Haz crecer tu negocio con todo T1
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] font-inter text-[16px] font-light text-white/60 tablet:text-[18px]">
            T1 Envíos se integra con T1 Pagos y T1 Tienda: cobra, vende y envía desde un mismo lugar.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-1 gap-4 tablet:mt-14 tablet:grid-cols-2">
          {ECOSISTEMA.map((it) => (
            <a key={it.title} href={it.href} className="group flex flex-col rounded-[18px] border border-white/[0.08] bg-[#1A1A1D] p-7 no-underline transition-colors hover:border-white/20">
              <Image src={it.logo} alt={it.title} width={160} height={36} className="h-[30px] w-auto object-contain" style={{ objectPosition: "left" }} />
              <p className="mt-2.5 font-inter text-[15px] font-light leading-relaxed text-white/60 tablet:text-[16px]">{it.desc}</p>
              <div className="mt-auto flex items-center gap-3 pt-6">
                {it.type === "card"
                  ? it.icons.map((src) => (
                      <Image key={src} src={src} alt="" width={80} height={52} className="h-[30px] w-auto shrink-0 object-contain" />
                    ))
                  : it.icons.map((src) => (
                      <Image key={src} src={src} alt="" width={90} height={40} className="h-[22px] w-auto shrink-0 object-contain opacity-90" />
                    ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 font-inter text-[14px] font-medium text-white/80 group-hover:text-white">
                Conoce más
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
