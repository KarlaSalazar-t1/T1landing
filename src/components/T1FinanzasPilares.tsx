"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BotonApp, Campo, Chip, Chispa, Cursor, Radio, UI, usePasos, useEscritura, VentanaApp } from "@/components/T1FinanzasUI";

/* ──────────────────────────────────────────────────────────────────────────
   Cómo funciona, en tres pestañas: la factura de un pedido en un clic, la
   factura global de cada tienda y marketplace (lo que hoy se arma a mano en
   Excel) y la clave de producto que te sugerimos.

   Mismo patrón de T1PagosPilares: lista a la izquierda + panel animado a la
   derecha en desktop, carrusel con stepper en móvil.

   Nunca se dice "inteligencia artificial": es "nuestro sistema inteligente"
   o "te sugerimos".
   ────────────────────────────────────────────────────────────────────────── */

/* Los cuatro paneles son pantallas del producto hechas en código, con el
   mismo alto para que nada brinque al cambiar de pestaña. */
const ALTO_PANEL = 420;

/* Aviso de disponibilidad por plan. Los planes se explican en su sección; aquí
   solo se avisa que esa función es de pago. Va como frase completa y en gris:
   un chip rojo en mayúsculas se leía como etiqueta sin sentido, y el rojo es
   el color de lo que sí puedes hacer. */
function DisponibleEn({ planes }: { planes: string }) {
  return (
    <span className="mt-4 inline-flex items-center rounded-full border border-white/[0.10] bg-white/[0.04] px-3.5 py-1.5 font-inter text-[12.5px] font-light text-white/50">
      Disponible en los planes {planes}
    </span>
  );
}

/* ══════════ Sección ══════════
   Las cuatro capacidades ya NO son cuatro tarjetas apiladas: son pestañas en
   una sola fila arriba y un panel abajo. En móvil las pestañas se deslizan y
   solo se ve el panel de la activa, así que la sección ocupa una pantalla y
   no cuatro. */
/* ══════════ 1 · Pedidos de todos los canales ══════════ */
const PEDIDOS = [
  { folio: "ML—2138", canal: "Mercado Libre", logo: "/img/meli-iso.svg", cliente: "Comprador ML #2170", fecha: "05/09/2026", total: "$12,996.00", estado: "Sin facturar", tono: "neutro" as const },
  { folio: "TN—5512", canal: "Tiendanube", logo: "/img/tiendanube.svg", cliente: "Comercializadora Delta", fecha: "04/09/2026", total: "$34,500.00", estado: "Sin facturar", tono: "neutro" as const },
  { folio: "AMZ—7731", canal: "Amazon", logo: "/img/amazon-iso.svg", cliente: "Carlos Ramírez", fecha: "03/09/2026", total: "$8,990.00", estado: "Facturado", tono: "verde" as const },
  { folio: "TT—0914", canal: "TikTok Shop", logo: "/img/tiktokshop.svg", cliente: "María González López", fecha: "02/09/2026", total: "$4,980.00", estado: "Facturado", tono: "verde" as const },
];

function PanelPedidos() {
  return (
    <VentanaApp alto={ALTO_PANEL} cromo="escritorio">
      <div className="px-5 pb-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-bold" style={{ fontSize: 15, color: UI.texto }}>Pedidos</p>
            <p className="mt-0.5" style={{ fontSize: 10.5, color: UI.suave, lineHeight: 1.45, maxWidth: 200 }}>
              Las ventas de todos tus canales, en una sola lista.
            </p>
          </div>
          <BotonApp>Factura global</BotonApp>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {PEDIDOS.map((p) => (
            <div key={p.folio} className="flex items-center gap-3 rounded-[11px] border px-3 py-2.5" style={{ borderColor: UI.bordeSuave, background: UI.fondo }}>
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full border bg-white" style={{ borderColor: UI.borde }}>
                <Image src={p.logo} alt="" width={28} height={28} className="h-[15px] w-[15px] object-contain" />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate font-semibold" style={{ fontSize: 11.5, color: UI.texto }}>{p.folio} · {p.canal}</span>
                <span className="block truncate" style={{ fontSize: 10, color: UI.tenue }}>{p.cliente} · {p.fecha}</span>
              </span>
              <span className="text-right leading-tight">
                <span className="block font-bold" style={{ fontSize: 11.5, color: UI.texto }}>{p.total}</span>
                <span className="mt-1 block"><Chip size={9} tono={p.tono}>{p.estado}</Chip></span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </VentanaApp>
  );
}

/* ══════════ 2 · El asistente de factura global ══════════ */
const FRECUENCIAS = ["Diario", "Semanal", "Quincenal", "Mensual · recomendada", "Bimestral"];

function PanelGlobal() {
  return (
    <VentanaApp alto={ALTO_PANEL} cromo="escritorio">
      <div className="px-5 pb-5 pt-4">
        <p className="font-semibold uppercase" style={{ fontSize: 8.5, letterSpacing: "0.09em", color: UI.tenue }}>Facturación</p>
        <p className="mt-1 font-bold" style={{ fontSize: 15, color: UI.texto }}>Factura global</p>
        <p className="mt-0.5" style={{ fontSize: 10.5, color: UI.suave }}>
          Paso 1 de 3 · <span style={{ color: UI.texto, fontWeight: 600 }}>Periodo</span>
        </p>

        <div className="mt-3.5 rounded-[12px] border p-4" style={{ borderColor: UI.borde }}>
          <p className="font-bold" style={{ fontSize: 12.5, color: UI.texto }}>¿Qué periodo cubre esta factura global?</p>
          <p className="mt-1.5" style={{ fontSize: 10.5, color: UI.suave, lineHeight: 1.5 }}>
            La factura global junta las ventas del periodo que todavía no le facturaste a un cliente con su RFC.
          </p>

          <p className="mt-3.5 font-semibold" style={{ fontSize: 11, color: UI.texto }}>¿Cada cuánto emites esta factura global?</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
            {FRECUENCIAS.map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <Radio on={f.startsWith("Mensual")} />
                <span style={{ fontSize: 10.5, color: f.startsWith("Mensual") ? UI.texto : UI.suave }}>{f}</span>
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-end gap-4">
            <span className="flex-1">
              <span className="block" style={{ fontSize: 10, color: UI.suave }}>Periodo que cubre</span>
              <span className="mt-1 flex items-center justify-between rounded-[9px] border px-3 py-2" style={{ borderColor: UI.borde }}>
                <span style={{ fontSize: 11, color: UI.texto }}>Septiembre</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={UI.tenue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </span>
            <span>
              <span className="block" style={{ fontSize: 10, color: UI.suave }}>Año</span>
              <span className="mt-1 block py-2" style={{ fontSize: 11, color: UI.texto }}>2026</span>
            </span>
          </div>

          <div className="mt-4 flex justify-end">
            <BotonApp>Continuar</BotonApp>
          </div>
        </div>
      </div>
    </VentanaApp>
  );
}

/* ══════════ 3 · El asistente de nueva factura, paso por paso ══════════
   La pestaña promete cuatro pasos, así que el panel los recorre: a quién le
   vendiste, qué vendiste, cómo te pagaron y la revisión antes de emitir. */
const PASOS_FACTURA = ["¿A quién le vendiste?", "¿Qué vendiste?", "¿Cómo te pagaron?", "Revisa y factura"];

function PasoCliente({ activo }: { activo: boolean }) {
  const { escrito, completo } = useEscritura("Talleres San Miguel", 70, activo);
  return (
    <div className="flex flex-col gap-2.5">
      <Campo label="Cliente" valor={escrito} cursor={!completo} lleno={completo} />
      <Campo label="RFC" valor={completo ? "TSM210714QK1" : ""} lleno={completo} />
      <p className="mt-0.5 flex items-center gap-1.5" style={{ fontSize: 9.5, color: UI.tenue }}>
        <Radio />
        Si no te pidió factura, va al público en general.
      </p>
    </div>
  );
}

function PasoConcepto({ activo }: { activo: boolean }) {
  const { escrito, completo } = useEscritura("Playera de algodón", 70, activo);
  return (
    <div className="flex flex-col gap-2.5">
      <Campo label="Qué vendiste" valor={escrito} cursor={!completo} lleno={completo} />
      <div className="grid grid-cols-2 gap-2.5">
        <Campo label="Cantidad" valor={completo ? "12" : ""} lleno={completo} />
        <Campo label="Precio unitario" valor={completo ? "$299.00" : ""} lleno={completo} />
      </div>
      {completo && (
        <p className="flex items-center gap-1.5" style={{ fontSize: 9.5, color: UI.suave, animation: "fadeSlideIn 0.4s ease-out" }}>
          <Chispa size={11} />
          Clave del SAT 53101602 · Camisas para hombre
        </p>
      )}
    </div>
  );
}

const PAGOS = [
  { t: "Me pagan todo de una vez", d: "Ya te pagaron, o te pagan completo antes de que termine el mes.", on: true },
  { t: "Me pagan después, en un solo pago", d: "El pago completo llega más adelante, quizá en otro mes." },
  { t: "Me pagan en partes", d: "Acordaste dos o más pagos y cada uno lleva su recibo." },
];

function PasoPago() {
  return (
    <div className="flex flex-col gap-2">
      {PAGOS.map((p) => (
        <span
          key={p.t}
          className="flex items-start gap-2.5 rounded-[10px] border px-3 py-2.5"
          style={{ borderColor: p.on ? "rgba(226,64,47,0.35)" : UI.bordeSuave, background: p.on ? "rgba(226,64,47,0.04)" : "#fff" }}
        >
          <Radio on={p.on} />
          <span className="leading-tight">
            <span className="block font-semibold" style={{ fontSize: 11, color: UI.texto }}>{p.t}</span>
            <span className="mt-0.5 block" style={{ fontSize: 9.5, color: UI.tenue, lineHeight: 1.45 }}>{p.d}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

function PasoRevision({ emitida }: { emitida: boolean }) {
  return (
    <div>
      <div className="rounded-[10px] border p-3" style={{ borderColor: UI.bordeSuave, background: UI.fondo }}>
        {[
          ["Cliente", "Talleres San Miguel"],
          ["Concepto", "Playera de algodón · 12"],
          ["Pago", "Todo de una vez"],
          ["Total con IVA", "$4,161.60"],
        ].map(([k, v], i) => (
          <span key={k} className="flex items-center justify-between py-[5px]" style={{ borderTop: i ? `1px solid ${UI.bordeSuave}` : undefined }}>
            <span style={{ fontSize: 10, color: UI.suave }}>{k}</span>
            <span className="font-semibold" style={{ fontSize: 10.5, color: UI.texto }}>{v}</span>
          </span>
        ))}
      </div>
      {emitida ? (
        <div
          className="mt-3 flex items-center gap-2.5 rounded-[10px] border px-3 py-2.5"
          style={{ borderColor: "rgba(22,163,74,0.25)", background: "rgba(22,163,74,0.07)", animation: "fadeSlideIn 0.35s ease-out" }}
        >
          <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full" style={{ background: "#16A34A" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span className="leading-tight">
            <span className="block font-bold" style={{ fontSize: 11, color: UI.texto }}>Factura emitida</span>
            <span className="block" style={{ fontSize: 9.5, color: UI.tenue }}>XML y PDF listos para tu contador</span>
          </span>
        </div>
      ) : (
        <div className="mt-3 flex justify-end">
          <BotonApp>Emitir factura</BotonApp>
        </div>
      )}
    </div>
  );
}

function PanelAsistente() {
  const paso = usePasos(5, 2200);
  const visible = Math.min(paso, 3);

  return (
    <VentanaApp alto={ALTO_PANEL} cromo="escritorio">
      <div className="px-5 pb-5 pt-4">
        <div className="flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke={UI.suave} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <p className="font-bold" style={{ fontSize: 14.5, color: UI.texto }}>Nueva factura</p>
        </div>
        <p className="mt-0.5" style={{ fontSize: 10.5, color: UI.suave }}>
          Paso {visible + 1} de 4 · <span style={{ color: UI.texto, fontWeight: 600 }}>{PASOS_FACTURA[visible]}</span>
        </p>

        {/* Barra de avance del asistente */}
        <div className="mt-2.5 flex gap-1.5">
          {PASOS_FACTURA.map((p, i) => (
            <span
              key={p}
              className="h-[3px] flex-1 rounded-full transition-colors duration-500"
              style={{ background: i <= visible ? UI.rojo : "rgba(0,0,0,0.08)" }}
            />
          ))}
        </div>

        {/* Alto mínimo para que la tarjeta no cambie de tamaño entre pasos. */}
        <div className="mt-3.5 rounded-[12px] border p-4" style={{ borderColor: UI.borde, minHeight: 272 }}>
          <p className="font-bold" style={{ fontSize: 12.5, color: UI.texto, marginBottom: 12 }}>
            {PASOS_FACTURA[visible]}
          </p>
          <div key={visible} style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
            {visible === 0 && <PasoCliente activo={paso === 0} />}
            {visible === 1 && <PasoConcepto activo={paso === 1} />}
            {visible === 2 && <PasoPago />}
            {visible === 3 && <PasoRevision emitida={paso === 4} />}
          </div>
        </div>
      </div>
    </VentanaApp>
  );
}

/* ══════════ 4 · El buscador de la clave del SAT ══════════
   Se teclea lo que vendes y el sistema sugiere la clave: eso es lo que hay
   que ver, no una lista ya resuelta. */
const CLAVES = [
  { c: "53101602", d: "Camisas para hombre", sugerida: true },
  { c: "53101604", d: "Camisas o blusas para mujer" },
  { c: "52121702", d: "Toallas playeras" },
];

function PanelClave() {
  const paso = usePasos(3, 2600);
  const { escrito, completo } = useEscritura("playera", 130, paso === 0);
  // Una vez tecleado, el texto se queda: los resultados no pueden salir con
  // el campo vacío.
  const consulta = paso === 0 ? escrito : "playera";
  const tecleando = paso === 0 && !completo;
  const hayResultados = paso >= 1;

  return (
    <VentanaApp alto={ALTO_PANEL} cromo="escritorio">
      <div className="px-5 pb-5 pt-4">
        <div className="flex items-center justify-between">
          <p className="font-bold" style={{ fontSize: 14.5, color: UI.texto }}>Encontrar la clave del SAT</p>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke={UI.tenue} strokeWidth="2" strokeLinecap="round" /></svg>
        </div>
        <p className="mt-2" style={{ fontSize: 10.5, color: UI.suave, lineHeight: 1.5 }}>
          La clave de producto o servicio la pide el SAT. Búscala por nombre o, si ya la conoces, tecléala.
        </p>

        <p className="mt-3.5 font-semibold" style={{ fontSize: 11, color: UI.texto }}>
          Descríbelo en pocas palabras
        </p>
        <div
          className="mt-1.5 rounded-[9px] border px-3 py-2.5 transition-colors duration-300"
          style={{ borderColor: tecleando ? "rgba(226,64,47,0.45)" : UI.borde, minHeight: 36 }}
        >
          <span style={{ fontSize: 11.5, color: consulta ? UI.texto : UI.tenue }}>{consulta || "Qué vendes"}</span>
          {tecleando && <Cursor />}
        </div>

        <div className="mt-3" style={{ minHeight: 190 }}>
          {hayResultados && (
            <div style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
              <p className="flex items-start gap-1.5" style={{ fontSize: 10, color: UI.suave, lineHeight: 1.45 }}>
                <Chispa size={11} />
                Ordenadas por parecido con lo que escribiste. Revisa cuál corresponde a lo que vendes.
              </p>

              <div className="mt-2.5 flex flex-col gap-1.5">
                {CLAVES.map((k, i) => {
                  const elegida = k.sugerida && paso === 2;
                  return (
                    <span
                      key={k.c}
                      className="flex items-center justify-between rounded-[10px] border px-3 py-2 transition-colors duration-500"
                      style={{
                        borderColor: elegida ? "rgba(22,163,74,0.35)" : k.sugerida ? "rgba(37,99,235,0.28)" : UI.bordeSuave,
                        background: elegida ? "rgba(22,163,74,0.06)" : k.sugerida ? "rgba(37,99,235,0.04)" : "#fff",
                        animation: `fadeSlideIn 0.4s ease-out ${i * 90}ms both`,
                      }}
                    >
                      <span className="leading-tight">
                        <span className="block font-semibold" style={{ fontSize: 11.5, color: UI.texto }}>{k.c}</span>
                        <span className="block" style={{ fontSize: 10, color: UI.tenue }}>{k.d}</span>
                      </span>
                      {k.sugerida &&
                        (elegida ? (
                          <Chip size={9.5} tono="verde">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            Aprobada
                          </Chip>
                        ) : (
                          <Chip size={9.5} tono="azul">
                            <Chispa size={10} />
                            Sugerida
                          </Chip>
                        ))}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </VentanaApp>
  );
}

const ITEMS = [
  {
    id: "pedido",
    label: "Pedidos en línea",
    title: "Factura un pedido en un clic",
    description:
      "Llega con sus productos y montos, y con los datos de tu cliente si ya te compró antes.",
    Panel: PanelPedidos,
  },
  {
    id: "global",
    label: "Factura global",
    title: "La factura global de cada tienda, sin Excel",
    description:
      "La factura global junta las ventas de quienes no pidieron factura, una por cada lugar donde vendes. La emites con un botón o se emite sola.",
    plan: "Básico y Avanzado",
    Panel: PanelGlobal,
  },
  {
    id: "mostrador",
    label: "Mostrador y WhatsApp",
    title: "Tus ventas de mostrador, en cuatro pasos",
    description:
      "A quién le vendiste, qué vendiste y cómo te pagaron. Revisas la factura y la emites.",
    Panel: PanelAsistente,
  },
  {
    id: "clave",
    label: "Clave de producto",
    title: "Te sugerimos la clave de producto del SAT",
    description:
      "El SAT tiene 52,513 claves y no tienes que buscar la tuya. Tú apruebas la que te sugerimos, y la puedes cambiar antes de emitir la factura.",
    Panel: PanelClave,
  },
];

const DURATION = 9000;

export default function T1FinanzasPilares() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

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
    const timer = setTimeout(() => setActive((a) => (a + 1) % ITEMS.length), DURATION);
    return () => clearTimeout(timer);
  }, [active, started]);

  // En móvil la pestaña activa se acomoda sola dentro de la fila deslizable.
  useEffect(() => {
    const fila = pillsRef.current;
    const pill = fila?.querySelector<HTMLElement>(`[data-pill="${active}"]`);
    if (!fila || !pill) return;
    const destino = pill.offsetLeft - (fila.clientWidth - pill.clientWidth) / 2;
    fila.scrollTo({ left: Math.max(0, destino), behavior: "smooth" });
  }, [active]);

  // Deslizar en el panel cambia de pestaña, como en el carrusel de Envíos.
  const toqueX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    toqueX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (toqueX.current == null) return;
    const dx = e.changedTouches[0].clientX - toqueX.current;
    toqueX.current = null;
    if (Math.abs(dx) < 40) return;
    setActive((a) => (dx < 0 ? (a + 1) % ITEMS.length : (a - 1 + ITEMS.length) % ITEMS.length));
  };

  const it = ITEMS[active];
  const Panel = it.Panel;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-5 tablet:px-6" style={{ paddingTop: 88, paddingBottom: 88 }}>
      <div className="relative mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[760px] text-center" style={{ marginBottom: 36 }}>
          <h2
            className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
          >
            Tus ventas en línea y de mostrador, en un solo lugar
          </h2>
        </div>

        {/* Pestañas — una sola fila; en móvil se deslizan */}
        <div
          ref={pillsRef}
          className="-mx-5 mb-10 flex gap-2.5 overflow-x-auto px-5 pb-1 tablet:mx-0 tablet:justify-center tablet:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ITEMS.map((t, i) => {
            const on = i === active;
            return (
              <button
                key={t.id}
                type="button"
                data-pill={i}
                onClick={() => setActive(i)}
                className="shrink-0 cursor-pointer rounded-full border px-5 py-2.5 font-inter text-[14px] font-medium transition-all duration-300 tablet:text-[15px]"
                style={{
                  borderColor: on ? "rgba(219,59,43,0.55)" : "rgba(255,255,255,0.10)",
                  background: on ? "rgba(219,59,43,0.14)" : "rgba(255,255,255,0.02)",
                  color: on ? "#fff" : "rgba(255,255,255,0.55)",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Panel + texto de la pestaña activa */}
        <div className="grid grid-cols-1 items-center gap-8 tablet:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] tablet:gap-14">
          <div
            className="flex justify-center"
            style={{ minHeight: ALTO_PANEL + 42, touchAction: "pan-y" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="w-full max-w-[460px]">{started ? <Panel /> : null}</div>
          </div>

          {/* Caja de alto fijo: el título arranca siempre en el mismo punto y la
              barra del temporizador se queda pegada abajo, cambie el texto que
              cambie. */}
          <div
            key={it.id}
            className="flex flex-col text-center tablet:text-left"
            style={{ animation: "fadeSlideIn 0.4s ease-out", minHeight: 232, touchAction: "pan-y" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* El título comparte el ancho de la descripción y de la barra del
                temporizador, así los tres quedan alineados. */}
            <h3
              className="mx-auto font-sora text-[22px] font-normal text-white tablet:mx-0 tablet:text-[30px]"
              style={{ letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 12, maxWidth: 420 }}
            >
              {it.title}
            </h3>
            <p className="mx-auto font-inter text-[15px] font-light leading-relaxed text-white/60 tablet:mx-0 tablet:text-[17px]" style={{ maxWidth: 420 }}>
              {it.description}
            </p>
            {"plan" in it && (it as { plan?: string }).plan ? (
              <DisponibleEn planes={(it as { plan?: string }).plan as string} />
            ) : null}
            <div className="mx-auto mt-auto h-[3px] w-full max-w-[420px] overflow-hidden rounded-full tablet:mx-0" style={{ background: "rgba(255,255,255,0.10)" }}>
              <div
                key={active}
                style={{
                  height: "100%",
                  width: "100%",
                  background: "#DB3B2B",
                  transformOrigin: "left",
                  animation: started ? `pilarProgress ${DURATION}ms linear forwards` : "none",
                  transform: started ? undefined : "scaleX(0)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
