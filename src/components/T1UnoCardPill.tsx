"use client";

/* Versión B del home: encima de la animación del admin de cada stack card,
   una barra flotante de Uno (como la de la app). Se escribe lo que pides →
   se manda → Uno contesta en una línea. El admin sigue siendo lo principal;
   la barra solo enseña que eso mismo se lo puedes pedir a Uno.
   Corre solo mientras la card se ve y se repite. */

import { useEffect, useRef, useState } from "react";
import { Typed, UnoMark } from "@/components/T1UnoStage";

/* Lo que se le pide a Uno en cada card (por id de la card). Habla de lo
   mismo que muestra la animación del admin de esa card. Tienda en línea y
   POS no llevan barra. */
const PEDIDOS: Record<string, { pide: string; responde: string }> = {
  t1tienda: { pide: "¿Qué pedidos tengo por preparar?", responde: "Tienes 12 pedidos por preparar hoy" },
  t1pagos: { pide: "Crea un link de pago para los tenis blancos", responde: "Tu link de $1,345.99 está listo" },
  t1envios: { pide: "Cotiza un envío de 2 kg al CP 55712", responde: "Lo más barato: FedEx, mañana, $148.30" },
  t1finanzas: { pide: "Factura los pedidos de hoy", responde: "Listo, timbré 4 facturas" },
};
export const UNO_PILL_IDS = Object.keys(PEDIDOS);

const T_SEND = 2400; // termina de escribirse y se manda
const T_REPLY = 3900; // contesta Uno
const CICLO_MS = 9000;

/* control: cuando la animación del admin manda el ritmo (Pagos), la barra
   no lleva su propio reloj y solo muestra la fase que le pasan. */
export default function T1UnoCardPill({ id, control }: { id: string; control?: { fase: number; vuelta: number } }) {
  const p = PEDIDOS[id];
  const [faseLocal, setFase] = useState(0);
  const [vueltaLocal, setVuelta] = useState(0);
  const fase = control ? control.fase : faseLocal;
  const vuelta = control ? control.vuelta : vueltaLocal;
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (!e.isIntersecting) setFase(0);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || control) return;
    const ts = [
      window.setTimeout(() => setFase(1), T_SEND),
      window.setTimeout(() => setFase(2), T_REPLY),
      window.setTimeout(() => { setFase(0); setVuelta((v) => v + 1); }, CICLO_MS),
    ];
    return () => ts.forEach((t) => window.clearTimeout(t));
  }, [visible, vueltaLocal, control]);

  if (!p) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="flex w-full items-center gap-2.5 rounded-[16px] bg-white py-2 pl-2.5 pr-2"
      style={{ boxShadow: "0 0 0 1px rgba(219,59,43,0.2), 0 18px 44px -12px rgba(0,0,0,0.55)" }}
    >
      <UnoMark size={26} />
      <p key={`${vuelta}-${fase}`} className="min-w-0 flex-1 truncate font-inter text-[13.5px] text-black/80" style={fase ? { animation: "fadeSlideIn 0.35s ease-out both" } : undefined}>
        {fase === 0 && <Typed text={p.pide} ms={T_SEND - 300} />}
        {fase === 1 && <span className="text-black/45">Uno está trabajando…</span>}
        {fase === 2 && (
          <span className="inline-flex items-center gap-1.5 font-medium text-black/85">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#16A34A]"><path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {p.responde}
          </span>
        )}
      </p>
      <span className={`flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full text-white transition-colors ${fase === 0 ? "bg-[#DB3B2B]" : "bg-black/15"}`}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 13V3.5M8 3.5L4 7.5M8 3.5L12 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </div>
  );
}
