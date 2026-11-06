/* Estados del botón de envío de los inputs del hero (tienda, link de pago, cotizar).
   Fuente única para que se vean igual en home, Tienda, Pagos y Envíos.

   Insight PostHog (oct 2026): el inactivo anterior (#60160F, rojo oscuro) sobre fondo
   oscuro se leía como botón activo → 668 personas tocaron "Crea tu tienda" sin enviar.
   Ahora el inactivo es gris neutro (sin rojo) y, si aun así lo tocan, el botón NO
   muere: enfoca el campo que falta y muestra qué escribir (ver CTA_HINT). */

export const CTA_ON = "bg-red-500 text-white hover:bg-red-600";
export const CTA_OFF = "cursor-not-allowed bg-white/[0.08] text-white/35";

/* Aviso de "qué falta" sobre fondo oscuro. Neutro a propósito: es una guía, no un
   error, y en rojo se sentía regaño. Más claro que el placeholder (white/40). */
export const CTA_HINT = "text-white/85";

/* Foco de los inputs del hero (prompt, CP, link). Insight PostHog: clics repetidos en
   la caja porque no se notaba cuándo estaba lista. Borde claro + halo suave, en blanco
   para que no se lea como error. Con aviso activo (FOCUS_ON) se ve igual que con foco. */
// Clases completas y literales (Tailwind no detecta clases armadas con ${}).
export const FOCUS_ON = "ring-white/60 shadow-[0_0_0_4px_rgba(255,255,255,0.08)]";
export const FOCUS_BOX = "ring-transparent focus-within:ring-white/60 focus-within:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]";
export const FOCUS_FIELD = "focus-within:border-white/60 focus-within:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]";
export const FOCUS_LINE = "focus-within:border-white focus-within:shadow-[0_1px_0_0_#fff]";
