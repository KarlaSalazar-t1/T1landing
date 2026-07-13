"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GlassScreen } from "@/components/showcase/PosMockups";

/* Scales a fixed-size design to the container width (crisp at any size). */
function ScaledMock({ designW, designH, children }: { designW: number; designH: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / designW);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designW]);
  return (
    <div ref={ref} style={{ width: "100%", aspectRatio: `${designW} / ${designH}`, overflow: "hidden" }}>
      <div style={{ width: designW, height: designH, transform: `scale(${scale || 0.0001})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

const W = 940;
const H = 670;

/* Shared demo data — our own product + neutral store/customer (not the screenshots'). */
const STORE = "Origen MX";
const EMAIL = "ana.lopez@correo.com";
const PRODUCT = { name: "Tenis blancos clásicos", variant: "Talla 26 · Color blanco", price: "$1,345.99", img: "/img/tenis-transparente.png" };

function Tap({ left = "50%", top = "50%" }: { left?: number | string; top?: number | string }) {
  return (
    <span className="pointer-events-none absolute z-[6]" style={{ left, top }}>
      <span className="absolute rounded-full" style={{ left: -17, top: -17, width: 34, height: 34, border: "2.5px solid rgba(219,59,43,0.85)", animation: "tapRipple 1.1s ease-out infinite" }} />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#111827" stroke="white" strokeWidth="1.4" strokeLinejoin="round" style={{ position: "absolute", left: 1, top: 1, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}><path d="M5 2.5l6 17.5 2.3-7.2L20.5 10.5z" /></svg>
    </span>
  );
}

const VisaChip = () => (
  <div className="flex h-[22px] w-[32px] items-center justify-center rounded-[4px] bg-white" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}>
    <svg width="24" height="15" viewBox="0 0 24 16" fill="none"><rect width="24" height="16" rx="2.5" fill="#1A1F71" /><path d="M9.5 11L11 5h1.6l-1.5 6zM15.6 5.2c-.3-.1-.8-.2-1.4-.2-1.5 0-2.6.8-2.6 1.9 0 .8.8 1.3 1.4 1.6.6.3.8.5.8.7 0 .4-.5.6-.9.6-.6 0-.9-.1-1.4-.3l-.2-.1-.2 1.3c.3.1.9.3 1.6.3 1.6 0 2.6-.8 2.6-2 0-.7-.4-1.2-1.3-1.6-.5-.3-.9-.5-.9-.8 0-.3.3-.5.9-.5.5 0 .9.1 1.1.2z" fill="white" /></svg>
  </div>
);

/* Right order summary — consistent across screens. `coupon` shows an applied code. */
function Summary({ shipping, total, aplicarRed = false, coupon = false }: { shipping: boolean; total: string; aplicarRed?: boolean; coupon?: boolean }) {
  return (
    <div className="flex flex-1 flex-col px-8 py-7">
      <div className="flex items-center gap-3.5 border-b border-black/[0.06] pb-6">
        <div className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-[#FAFAF9]">
          <Image src={PRODUCT.img} alt="" width={34} height={26} className="object-contain" />
          <span className="absolute -bottom-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#1A1A1A] font-inter text-[9px] font-bold text-white">1</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-inter text-[13px] text-black/85 leading-tight">{PRODUCT.name}</p>
          <p className="mt-0.5 font-inter text-[11.5px] text-black/45">{PRODUCT.variant}</p>
        </div>
        <span className="font-inter text-[14px] font-semibold text-black">{PRODUCT.price}</span>
      </div>
      <div className="flex items-center gap-2.5 py-6">
        <div className="flex flex-1 items-center rounded-[10px] border px-3.5" style={{ height: 44, borderColor: coupon ? "rgba(34,197,94,0.55)" : "rgba(0,0,0,0.12)" }}>
          <span className={`font-inter text-[12.5px] ${coupon ? "font-semibold text-black" : "text-black/40"}`}>{coupon ? "T1-10" : "Código de descuento o tarjeta de regalo"}</span>
        </div>
        <div className={`relative flex items-center justify-center rounded-[10px] px-6 font-inter text-[13px] font-semibold text-white ${coupon ? "bg-[#16A34A]" : aplicarRed ? "bg-[#F1B0A9]" : "bg-[#AFC9F2]"}`} style={{ height: 44 }}>
          {coupon ? "Aplicado" : "Aplicar"}
          {coupon && <Tap left="50%" top="50%" />}
        </div>
      </div>
      <div className="flex items-center justify-between py-1.5">
        <span className="font-inter text-[13.5px] text-black/65">Subtotal ( 1 producto)</span>
        <span className="font-inter text-[13.5px] text-black/80">{PRODUCT.price}</span>
      </div>
      {shipping && (
        <>
          <div className="flex items-center justify-between py-1.5"><span className="font-inter text-[13.5px] text-black/65">Tarifa de envío</span><span className="font-inter text-[13.5px] text-black/80">$200.00</span></div>
          <div className="flex items-center justify-between py-1.5"><span className="font-inter text-[13.5px] text-black/65">Impuestos (IVA)</span><span className="font-inter text-[13.5px] text-black/80">$215.36</span></div>
        </>
      )}
      {coupon && (
        <div className="flex items-center justify-between py-1.5"><span className="font-inter text-[13.5px] text-[#16A34A]">Descuento (T1-10)</span><span className="font-inter text-[13.5px] font-semibold text-[#16A34A]">−$134.60</span></div>
      )}
      <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-4">
        <span className="font-sora text-[18px] font-semibold text-black">Total</span>
        <span className="font-sora text-[20px] font-semibold text-black" style={{ letterSpacing: "-0.02em" }}>{coupon ? "$1,626.75" : total}</span>
      </div>
    </div>
  );
}

/* Collapsible checkout row — header (label + chevron), value when closed, options when open. */
function Row({ label, value, open, children }: { label: string; value: React.ReactNode; open: boolean; children: React.ReactNode }) {
  return (
    <div className="border-b border-black/[0.07] pb-4" style={{ marginBottom: 14 }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
        <span className="font-inter text-[13px] text-black/45">{label}</span>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "none" }}><path d="M4 6l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      {open
        ? <div className="flex flex-col gap-2" style={{ animation: "modalContentFade 0.3s ease-out" }}>{children}</div>
        : value}
    </div>
  );
}

/* One option line inside an open row. */
function Opt({ sel, main, right }: { sel: boolean; main: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-[10px] border px-3 ${sel ? "border-[#DB3B2B] bg-[rgba(219,59,43,0.04)]" : "border-black/[0.10]"}`} style={{ height: 42 }}>
      <span className={`flex h-[16px] w-[16px] items-center justify-center rounded-full border-2 ${sel ? "border-[#DB3B2B]" : "border-black/25"}`}>{sel && <span className="h-[7px] w-[7px] rounded-full bg-[#DB3B2B]" />}</span>
      <span className="min-w-0 flex-1 truncate font-inter text-[12.5px] text-black/75">{main}</span>
      {right && <span className="shrink-0 font-inter text-[12px] font-medium text-black/60">{right}</span>}
    </div>
  );
}

function Topbar({ logo }: { logo: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-black/[0.06] px-9" style={{ height: 64 }}>
      {logo}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3A3A3A" strokeWidth="1.7"><path d="M6 6h15l-1.5 9h-12zM6 6L5 3H2M9 20a1 1 0 1 0 0 .01M18 20a1 1 0 1 0 0 .01" /></svg>
    </div>
  );
}
const T1Mark = ({ size = 24, fill = "#DB3B2B" }: { size?: number; fill?: string }) => (
  <svg width={size} height={Math.round((size * 44) / 45)} viewBox="0 0 45 44" fill="none" aria-label="T1">
    <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985C31.7332 19.1985 31.7332 19.1985 31.7332 19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457C39.6169 19.2457 39.6169 19.1985 39.6169 19.1513C39.6169 19.1041 39.6169 19.1041 39.6169 19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill={fill} />
    <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506C21.867 13.2034 21.867 13.0617 21.867 13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592C22.2919 12.2592 22.3391 12.2592 22.4335 12.2592H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781C32.6303 6.02781 32.6303 5.9806 32.6303 5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill={fill} />
  </svg>
);
const T1Logo = () => <T1Mark size={30} />;
const StoreLogo = () => <span className="font-sora text-[17px] font-bold text-black">{STORE}</span>;

const Field = ({ ph }: { ph: string }) => (
  <div className="flex items-center rounded-[11px] border border-black/[0.12] px-3.5" style={{ height: 44 }}>
    <span className="font-inter text-[13px] text-black/40">{ph}</span>
  </div>
);

/* ── Filled checkout (hero + flow final) ── */
function CheckoutFilled({ tapPay = false }: { tapPay?: boolean }) {
  // 0 idle · 1 Enviar a · 2 Método de envío · 3 Método de pago · 4 cupón
  const [act, setAct] = useState(0);
  useEffect(() => {
    const d = [1500, 2300, 2300, 2300, 2800];
    const t = setTimeout(() => setAct((act + 1) % 5), d[act]);
    return () => clearTimeout(t);
  }, [act]);

  return (
    <div className="flex h-full w-full flex-col bg-white font-inter" style={{ width: W, height: H }}>
      <Topbar logo={<T1Logo />} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col px-9 py-7" style={{ width: 0.56 * W }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#1A1A1A] font-inter text-[10px] font-bold text-white">AL</span>
              <span className="font-inter text-[14px] text-black/80">{EMAIL}</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#9CA3AF"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
          </div>
          <div className="flex items-center gap-2.5" style={{ marginBottom: 20 }}>
            <span className="h-[15px] w-[15px] rounded-[3px] border border-black/25" />
            <span className="font-inter text-[12.5px] text-black/55">Deseo recibir las últimas ofertas y novedades.</span>
          </div>
          <p className="font-sora text-[22px] font-semibold text-black" style={{ marginBottom: 16 }}>Entrega</p>

          <Row label="Enviar a" open={act === 1} value={<p className="truncate font-inter text-[13px] text-black/70">Ana López, Lago Zurich 34, C.P. 11310, Ampliación Granada, Miguel Hidalgo,…</p>}>
            <Opt sel main="Ana López · Lago Zurich 34, Granada" />
            <Opt sel={false} main="Ana López · Av. Reforma 222, Juárez" />
          </Row>

          <Row label="Método de envío" open={act === 2} value={<p className="font-inter text-[13px] text-black/70">2 - 3 días hábiles  ·  Gratis</p>}>
            <Opt sel main="Estándar · 2-3 días hábiles" right="Gratis" />
            <Opt sel={false} main="Express · 1 día hábil" right="$99.00" />
            <Opt sel={false} main="Recoger en tienda" right="Gratis" />
          </Row>

          <Row label="Método de pago" open={act === 3} value={<div className="flex items-center gap-2.5"><VisaChip /><span className="font-inter text-[14px] tracking-widest text-black/70">•••• 4242</span></div>}>
            <Opt sel main="Visa  ••••  4242" />
            <Opt sel={false} main="Mastercard  ••••  5588" />
            <span className="px-1 pt-0.5 font-inter text-[12.5px] font-semibold text-[#DB3B2B]">+ Agregar tarjeta</span>
          </Row>

          <div className="flex items-center gap-2.5" style={{ marginBottom: 18 }}>
            <span className="h-[15px] w-[15px] rounded-[3px] border border-black/25" />
            <span className="font-inter text-[13px] text-black/60">Solicitar factura</span>
          </div>
          <div className="relative mt-auto flex shrink-0 items-center justify-center rounded-[14px] bg-[#DB3B2B]" style={{ height: 60 }}>
            <span className="font-inter text-[16px] font-semibold text-white">Pagar ahora</span>
            {tapPay && <Tap left="50%" top="50%" />}
          </div>
        </div>
        <div className="flex border-l border-black/[0.06]" style={{ width: 0.44 * W }}><Summary shipping total="$1,761.35" aplicarRed coupon={act === 4} /></div>
      </div>
    </div>
  );
}

export function CheckoutHeroScreen() {
  return (
    <GlassScreen radius={14}>
      <ScaledMock designW={W} designH={H}><CheckoutFilled /></ScaledMock>
    </GlassScreen>
  );
}

/* ── Animated "Pago con T1" flow: express → login → OTP → filled ── */
const OTP_CODE = ["8", "4", "2", "7", "3", "6"];

function PagoFlow() {
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState(0);
  useEffect(() => {
    const d = [2200, 2000, 2400, 2600];
    const t = setTimeout(() => setStep((step + 1) % 4), d[step]);
    return () => clearTimeout(t);
  }, [step]);
  // Type the OTP digits one by one while on the OTP step.
  useEffect(() => {
    if (step !== 2) { setOtp(0); return; }
    let n = 0;
    const id = setInterval(() => { n += 1; setOtp(n); if (n >= 6) clearInterval(id); }, 240);
    return () => clearInterval(id);
  }, [step]);

  return (
    <div className="relative flex h-full w-full flex-col bg-white font-inter" style={{ width: W, height: H }}>
      {step === 3 ? (
        <div key="filled" style={{ animation: "modalContentFade 0.35s ease-out", height: "100%" }}>
          <CheckoutFilled tapPay />
        </div>
      ) : (
        <>
          <Topbar logo={<StoreLogo />} />
          <div className="flex flex-1 overflow-hidden">
            <div key={step} className="flex flex-col px-9 py-7" style={{ width: 0.56 * W, animation: "modalContentFade 0.35s ease-out" }}>
              {/* step 0 — express store */}
              {step === 0 && (
                <>
                  <p className="text-center font-inter text-[13px] font-medium text-black/55" style={{ marginBottom: 12 }}>Pago exprés</p>
                  <div className="relative flex items-center justify-center gap-1.5 rounded-[12px] bg-[#DB3B2B]" style={{ height: 58, marginBottom: 18 }}>
                    <span className="font-inter text-[15px] font-semibold text-white">Paga con</span><T1Mark size={24} fill="#fff" />
                    <Tap left="58%" top="54%" />
                  </div>
                  <div className="flex items-center gap-3" style={{ marginBottom: 18 }}><span className="h-px flex-1 bg-black/[0.10]" /><span className="font-inter text-[11px] text-black/35">o</span><span className="h-px flex-1 bg-black/[0.10]" /></div>
                  <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                    <p className="font-sora text-[19px] font-semibold text-black">Información de contacto</p>
                    <span className="font-inter text-[13px] text-black/55">Iniciar sesión</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Field ph="Correo electrónico" />
                    <Field ph="+52   Número celular" />
                  </div>
                  <p className="font-inter text-[12.5px] text-black/45" style={{ marginTop: 20 }}>Continúa para elegir entrega y método de pago.</p>
                </>
              )}
              {/* step 1 — login card */}
              {step === 1 && (
                <div className="flex flex-1 items-center justify-center">
                  <div className="w-full rounded-[18px] border border-black/[0.08] px-8 py-9 text-center" style={{ maxWidth: 360, boxShadow: "0 18px 50px rgba(0,0,0,0.10)" }}>
                    <p className="font-sora text-[19px] font-semibold text-black" style={{ marginBottom: 16 }}>origenmx.com</p>
                    <p className="font-sora text-[15px] font-medium text-black" style={{ marginBottom: 4 }}>Inicia sesión o crea una cuenta</p>
                    <p className="font-inter text-[12px] text-black/50" style={{ marginBottom: 18 }}>Ingresa tu correo electrónico para iniciar sesión o crear una cuenta</p>
                    <div className="flex items-center rounded-[11px] border border-black/[0.12] px-3.5" style={{ height: 48, marginBottom: 14 }}><span className="font-inter text-[13px] text-black/70">{EMAIL}</span></div>
                    <div className="flex items-center gap-2.5" style={{ marginBottom: 18 }}><span className="h-[15px] w-[15px] rounded-[3px] border border-black/25" /><span className="font-inter text-[12.5px] text-black/55">Mantener sesión iniciada</span></div>
                    <div className="relative flex items-center justify-center gap-1.5 rounded-[12px] bg-[#DB3B2B]" style={{ height: 50 }}>
                      <span className="font-inter text-[14px] font-semibold text-white">Continuar con</span><T1Mark size={22} fill="#fff" />
                      <Tap left="64%" top="52%" />
                    </div>
                  </div>
                </div>
              )}
              {/* step 2 — OTP */}
              {step === 2 && (
                <div className="flex flex-1 items-center justify-center">
                  <div className="w-full rounded-[18px] border border-black/[0.08]" style={{ maxWidth: 380, boxShadow: "0 18px 50px rgba(0,0,0,0.10)" }}>
                    <p className="border-b border-black/[0.07] px-7 py-4 font-inter text-[14px] text-black/80">{EMAIL}</p>
                    <div className="px-7 py-7 text-center">
                      <p className="font-sora text-[16px] font-semibold text-black" style={{ marginBottom: 6 }}>Confirma tu correo electrónico</p>
                      <p className="font-inter text-[12.5px] text-black/55" style={{ marginBottom: 20, lineHeight: 1.5 }}>Introduce el código que se envió a tu correo para verificar tu cuenta.</p>
                      <div className="flex justify-center gap-2" style={{ marginBottom: 18 }}>
                        {[0, 1, 2, 3, 4, 5].map((b) => (
                          <span key={b} className={`flex h-[46px] w-[42px] items-center justify-center rounded-[10px] border-2 ${b === otp ? "border-[#DB3B2B]" : "border-black/[0.12]"} font-sora text-[16px] font-semibold text-black`} style={{ animation: b === otp - 1 ? "countBump 0.3s ease-out" : undefined }}>{b < otp ? OTP_CODE[b] : ""}</span>
                        ))}
                      </div>
                      <span className="font-inter text-[13px] font-semibold text-[#DB3B2B]">Reenviar código</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex border-l border-black/[0.06]" style={{ width: 0.44 * W }}>
              <Summary shipping={false} total={PRODUCT.price} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function PagoFlowScreen() {
  return (
    <GlassScreen radius={14}>
      <ScaledMock designW={W} designH={H}><PagoFlow /></ScaledMock>
    </GlassScreen>
  );
}
