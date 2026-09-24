"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Cómo funciona, en tres pestañas: la factura de un pedido en un clic, la
   factura global de cada tienda y marketplace (lo que hoy se arma a mano en
   Excel) y la clave de producto que te sugerimos.

   Mismo patrón de T1PagosPilares: lista a la izquierda + panel animado a la
   derecha en desktop, carrusel con stepper en móvil.

   Nunca se dice "inteligencia artificial": es "nuestro sistema inteligente"
   o "te sugerimos".
   ────────────────────────────────────────────────────────────────────────── */

const FONT = "var(--font-inter), 'Inter', sans-serif";

/* Ventana de producto — tarjeta blanca, mismo cromo que el panel del hero. */
function AppWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="mx-auto w-full select-none overflow-hidden rounded-[18px] bg-white"
      aria-hidden
      style={{ maxWidth: 440, fontFamily: FONT, pointerEvents: "none", boxShadow: "0 30px 70px rgba(0,0,0,0.45)" }}
    >
      <div className="flex items-center gap-2 border-b border-black/[0.06] px-5 py-3.5">
        <span className="text-[13px] font-bold text-black">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ══════════ 1 · La factura global, por canal ══════════ */
const CANALES = [
  { name: "T1 Tienda", logo: null, regla: "Diaria" },
  { name: "Mercado Libre", logo: "/img/meli-iso.svg", regla: "Diaria" },
  { name: "Amazon", logo: "/img/amazon-iso.svg", regla: "Fin de mes" },
  { name: "TikTok Shop", logo: "/img/tiktokshop.svg", regla: "Diaria" },
  { name: "Shopify", logo: "/img/shopify.svg", regla: "A mano" },
];

function GlobalPanel() {
  const [hit, setHit] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHit((v) => (v + 1) % CANALES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <AppWindow title="Tus tiendas y marketplaces">
      <div className="flex flex-col gap-2">
        {CANALES.map((c, i) => {
          const on = i === hit;
          const auto = c.regla !== "A mano";
          return (
            <div
              key={c.name}
              className="flex items-center gap-3 rounded-[12px] border px-3 py-2.5 transition-all duration-500"
              style={{
                borderColor: on ? "rgba(219,59,43,0.30)" : "rgba(0,0,0,0.05)",
                background: on ? "rgba(219,59,43,0.05)" : "#FAFAF9",
              }}
            >
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/[0.06] bg-white">
                {c.logo ? (
                  <Image src={c.logo} alt="" width={28} height={28} className="h-[16px] w-[16px] object-contain" />
                ) : (
                  <span className="text-[9.5px] font-extrabold text-[#DB3B2B]">T1</span>
                )}
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[12.5px] font-semibold text-black">{c.name}</span>
                <span className="block text-[10.5px] text-black/45">Factura global · {c.regla.toLowerCase()}</span>
              </span>
              <span
                className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold"
                style={
                  auto
                    ? { background: "rgba(22,163,74,0.12)", color: "#16A34A" }
                    : { background: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.45)" }
                }
              >
                {auto ? "Automática" : "A mano"}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-3">
        <span className="text-[11px] font-medium text-black/45">Ventas sin factura pedida, hoy</span>
        <span className="text-[12.5px] font-bold text-black">104 · 1 factura global</span>
      </div>
    </AppWindow>
  );
}

/* ══════════ 2 · Facturar un pedido con un clic ══════════ */
const FASES = ["idle", "loading", "done"] as const;

function PedidoPanel() {
  const [fase, setFase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFase((v) => (v + 1) % FASES.length), 2200);
    return () => clearInterval(t);
  }, []);
  const estado = FASES[fase];

  return (
    <AppWindow title="Pedido #10482">
      <div className="rounded-[12px] border border-black/[0.05] bg-[#FAFAF9] p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-black">Comercializadora Vega</span>
          <span className="text-[11px] text-black/45">RFC CVE240517J31</span>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {[
            { n: "Playera de algodón · 12 pz", p: "$3,588.00" },
            { n: "Gorra bordada · 6 pz", p: "$1,494.00" },
          ].map((l) => (
            <div key={l.n} className="flex items-center justify-between text-[11.5px]">
              <span className="truncate pr-3 text-black/60">{l.n}</span>
              <span className="shrink-0 font-semibold text-black">{l.p}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-2.5">
          <span className="text-[11px] font-medium text-black/45">IVA 16% incluido</span>
          <span className="text-[14px] font-extrabold text-black">$5,082.00</span>
        </div>
      </div>

      {/* Botón → emisión → factura lista */}
      <div className="mt-4 min-h-[46px]">
        {estado !== "done" ? (
          <div
            className="flex h-[44px] items-center justify-center gap-2 rounded-[12px] text-[13px] font-semibold text-white transition-all duration-300"
            style={{ background: estado === "loading" ? "#C0332A" : "#DB3B2B", transform: estado === "loading" ? "scale(0.985)" : "scale(1)" }}
          >
            {estado === "loading" ? (
              <>
                <span
                  className="h-[14px] w-[14px] rounded-full border-2 border-white/30 border-t-white"
                  style={{ animation: "spin 0.8s linear infinite" }}
                />
                Emitiendo tu factura…
              </>
            ) : (
              "Facturar este pedido"
            )}
          </div>
        ) : (
          <div
            className="flex items-center gap-3 rounded-[12px] border border-[#16A34A]/[0.25] bg-[#16A34A]/[0.07] px-3.5 py-3"
            style={{ animation: "fadeSlideIn 0.4s ease-out" }}
          >
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#16A34A]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block text-[12.5px] font-bold text-black">Factura emitida</span>
              <span className="block text-[10.5px] text-black/45">XML y PDF listos para tu contador</span>
            </span>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-[10.5px] text-black/35">
        Esta venta sale de tu factura global. Nunca se factura dos veces.
      </p>
    </AppWindow>
  );
}

/* ══════════ 3 · Mostrador y WhatsApp, en cuatro preguntas ══════════
   Este panel es la franja que antes vivía en el hero: las cuatro preguntas
   del asistente, que es la prueba de que facturar aquí no se parece al
   portal del SAT. */
const PREGUNTAS = [
  { q: "¿A quién le vendiste?", r: "Comercializadora Vega" },
  { q: "¿Qué vendiste?", r: "Playera de algodón · 12 pz" },
  { q: "¿Cómo te pagaron?", r: "Transferencia, hoy" },
  { q: "Revisa y factura", r: "Total $5,082.00 con IVA" },
];

function MostradorPanel() {
  const [paso, setPaso] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPaso((v) => (v + 1) % (PREGUNTAS.length + 1)), 1700);
    return () => clearInterval(t);
  }, []);

  return (
    <AppWindow title="Nueva factura">
      <div className="flex flex-col gap-2">
        {PREGUNTAS.map((p, i) => {
          const on = i === paso;
          const listo = i < paso;
          return (
            <div
              key={p.q}
              className="flex items-center gap-3 rounded-[12px] border px-3.5 py-3 transition-all duration-500"
              style={{
                borderColor: on ? "rgba(219,59,43,0.35)" : "rgba(0,0,0,0.05)",
                background: on ? "rgba(219,59,43,0.05)" : "#FAFAF9",
              }}
            >
              <span
                className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-500"
                style={{
                  background: on ? "#DB3B2B" : listo ? "#16A34A" : "rgba(0,0,0,0.06)",
                  color: on || listo ? "#fff" : "rgba(0,0,0,0.4)",
                }}
              >
                {listo ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[12.5px] font-semibold text-black">{p.q}</span>
                <span
                  className="block truncate text-[11px] transition-colors duration-500"
                  style={{ color: on || listo ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.25)" }}
                >
                  {p.r}
                </span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 min-h-[44px]">
        {paso >= PREGUNTAS.length ? (
          <div
            className="flex items-center gap-3 rounded-[12px] border border-[#16A34A]/[0.25] bg-[#16A34A]/[0.07] px-3.5 py-3"
            style={{ animation: "fadeSlideIn 0.4s ease-out" }}
          >
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#16A34A]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block text-[12.5px] font-bold text-black">Factura emitida</span>
              <span className="block text-[10.5px] text-black/45">XML y PDF listos para tu contador</span>
            </span>
          </div>
        ) : (
          <div className="flex h-[44px] items-center justify-center rounded-[12px] bg-[#DB3B2B] text-[13px] font-semibold text-white">
            Emitir factura
          </div>
        )}
      </div>
    </AppWindow>
  );
}

/* ══════════ 4 · La clave del SAT sugerida ══════════ */
const PRODUCTOS = [
  { nombre: "Playera de algodón", clave: "53102503", desc: "Camisetas" },
  { nombre: "Consulta dental", clave: "85121600", desc: "Servicios de odontología" },
  { nombre: "Refresco 600 ml", clave: "50202301", desc: "Bebidas carbonatadas" },
];

function ClavePanel() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    setShown(false);
    const a = setTimeout(() => setShown(true), 700);
    const b = setTimeout(() => setI((v) => (v + 1) % PRODUCTOS.length), 3400);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [i]);
  const p = PRODUCTOS[i];

  return (
    <AppWindow title="Clave de producto del SAT">
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-black/40">Tu producto</p>
      <div className="mt-2 rounded-[12px] border border-black/[0.08] bg-white px-3.5 py-3 text-[13px] font-medium text-black">
        {p.nombre}
        <span className="ml-0.5 inline-block h-[14px] w-[1.5px] translate-y-[2px] bg-[#DB3B2B]" style={{ animation: "blink 1s step-end infinite" }} />
      </div>

      <div className="mt-4 min-h-[104px]">
        {shown && (
          <div style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
            <div className="flex items-center gap-2">
              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#DB3B2B]/[0.10]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3l2.1 5.4L19.5 10l-5.4 2.1L12 17.5 9.9 12.1 4.5 10l5.4-1.6L12 3z" fill="#DB3B2B" />
                </svg>
              </span>
              <span className="text-[11px] font-semibold text-[#DB3B2B]">Sugerencia de T1</span>
            </div>
            <div className="mt-2 flex items-center gap-3 rounded-[12px] border border-black/[0.06] bg-[#FAFAF9] px-3.5 py-3">
              <span className="flex flex-col leading-tight">
                <span className="text-[14px] font-extrabold text-black">{p.clave}</span>
                <span className="text-[11px] text-black/45">{p.desc}</span>
              </span>
              <span className="ml-auto shrink-0 rounded-[10px] bg-[#DB3B2B] px-3.5 py-2 text-[11.5px] font-semibold text-white">
                Aceptar
              </span>
            </div>
            <p className="mt-3 text-[10.5px] text-black/35">
              De las 52,513 claves del catálogo del SAT. Tú la apruebas y la puedes cambiar.
            </p>
          </div>
        )}
      </div>
    </AppWindow>
  );
}

/* ══════════ Sección ══════════ */
const ITEMS = [
  {
    id: "pedido",
    title: "Factura un pedido en un clic",
    description:
      "El pedido ya está aquí con sus productos y montos. Agregas los datos de tu cliente, revisas la factura y la emites.",
    Panel: PedidoPanel,
  },
  {
    id: "global",
    title: "La factura global de cada tienda y marketplace, sin Excel",
    description:
      "Junta las ventas de quienes no pidieron factura, una por cada lugar donde vendes. En el plan Gratis la emites con un botón; en el plan Básico se emite sola cada día o a fin de mes.",
    Panel: GlobalPanel,
  },
  {
    id: "mostrador",
    title: "Tus ventas de mostrador o WhatsApp, facturadas en cuatro pasos",
    description:
      "Sirve también para lo que le vendes a una empresa, pagado al momento o a crédito. Respondes a quién le vendiste, qué vendiste y cómo te pagaron, y ves la factura antes de emitirla.",
    Panel: MostradorPanel,
  },
  {
    id: "clave",
    title: "Te sugerimos la clave de producto del SAT",
    description:
      "El SAT tiene 52,513 claves de producto y no tienes que buscar la tuya. Nuestro sistema inteligente te sugiere la que mejor le queda a lo que vendes; tú la apruebas y la puedes cambiar.",
    Panel: ClavePanel,
  },
];

const DURATION = 9000;

export default function T1FinanzasPilares() {
  const [active, setActive] = useState(0);
  const [barFull, setBarFull] = useState(false);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setBarFull(false);
    const raf = requestAnimationFrame(() => setBarFull(true));
    const timer = setTimeout(() => setActive((a) => (a + 1) % ITEMS.length), DURATION);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [active, started]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const programmatic = useRef(false);
  const settleTimer = useRef(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const target = active * el.clientWidth;
    if (Math.abs(el.scrollLeft - target) < 4) return;
    programmatic.current = true;
    el.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);
  const onCarouselScroll = () => {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (programmatic.current) {
        programmatic.current = false;
        return;
      }
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if (i !== active && i >= 0 && i < ITEMS.length) setActive(i);
    }, 110);
  };

  const Panel = ITEMS[active].Panel;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-5 tablet:px-6" style={{ paddingTop: 88, paddingBottom: 88 }}>
      <div className="relative mx-auto max-w-[var(--max-w)]">
        <h2
          className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
          style={{ letterSpacing: "-0.03em", textAlign: "center", marginBottom: 16 }}
        >
          Tus ventas en línea y en mostrador, facturadas desde un solo lugar
        </h2>
        <p
          className="mx-auto font-inter text-[16px] font-light text-white/85 tablet:text-[18px]"
          style={{ textAlign: "center", marginBottom: 52, maxWidth: 680 }}
        >
          Si vendes con T1 Tienda, los pedidos de tu tienda en línea, Mercado Libre y Amazon llegan
          con los datos ya puestos. Lo que vendes en mostrador o por WhatsApp lo capturas en cuatro
          pasos. En los dos casos te sugerimos la clave de producto del SAT.
        </p>

        {/* Desktop */}
        <div className="hidden grid-cols-1 gap-8 tablet:grid tablet:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] tablet:items-center tablet:gap-8">
          <div className="flex flex-col gap-3.5">
            {ITEMS.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className="w-full cursor-pointer rounded-[16px] border p-5 text-left transition-all duration-300"
                  style={{
                    borderColor: on ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)",
                    background: on ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className="font-sora text-[22px] font-normal tablet:text-[24px]"
                      style={{ letterSpacing: "-0.02em", color: on ? "#FFFFFF" : "rgba(255,255,255,0.45)", transition: "color 0.3s" }}
                    >
                      {it.title}
                    </h3>
                    <span
                      className="flex h-[26px] w-[26px] items-center justify-center rounded-full"
                      style={{ background: on ? "#DB3B2B" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4L10 8L6 12" stroke={on ? "#fff" : "rgba(255,255,255,0.4)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  {on && (
                    <>
                      <p className="font-inter text-[16px] font-normal leading-relaxed text-white/60" style={{ marginTop: 12 }}>
                        {it.description}
                      </p>
                      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.10)" }}>
                        <div
                          style={{
                            height: "100%",
                            width: barFull ? "100%" : "0%",
                            background: "#DB3B2B",
                            transition: barFull ? `width ${DURATION}ms linear` : "none",
                          }}
                        />
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex justify-center py-2">{started ? <Panel /> : <div style={{ minHeight: 420 }} />}</div>
        </div>

        {/* Móvil */}
        <div className="tablet:hidden">
          <div
            ref={scrollRef}
            onScroll={onCarouselScroll}
            className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {ITEMS.map((it) => {
              const P = it.Panel;
              return (
                <div key={it.id} className="flex w-full shrink-0 snap-center justify-center px-1 py-2">
                  {started ? <P /> : <div style={{ minHeight: 420 }} />}
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex gap-2 px-1">
            {ITEMS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ir a ${ITEMS[i].title}`}
                className="h-[4px] flex-1 overflow-hidden rounded-full"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <div
                  style={{
                    height: "100%",
                    width: i < active ? "100%" : i === active ? (barFull ? "100%" : "0%") : "0%",
                    background: "#DB3B2B",
                    transition: i === active && barFull ? `width ${DURATION}ms linear` : "none",
                  }}
                />
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <h3 className="font-sora text-[22px] font-normal text-white" style={{ letterSpacing: "-0.02em" }}>
              {ITEMS[active].title}
            </h3>
            <p className="mx-auto mt-2 max-w-[380px] font-inter text-[15px] font-light leading-relaxed text-white/60">
              {ITEMS[active].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
