/* Estados del botón de envío de los inputs del hero (tienda, link de pago, cotizar).
   Fuente única para que se vean igual en home, Tienda, Pagos y Envíos.

   Insight PostHog (oct 2026): el inactivo anterior (#60160F, rojo oscuro) sobre fondo
   oscuro se leía como botón activo → 668 personas tocaron "Crea tu tienda" sin enviar.
   Ahora el inactivo es gris neutro (sin rojo) y, si aun así lo tocan, el botón NO
   muere: enfoca el campo que falta y muestra qué escribir (ver CTA_HINT). */

export const CTA_ON = "bg-red-500 text-white hover:bg-red-600";
export const CTA_OFF = "cursor-not-allowed bg-white/[0.08] text-white/35";

/* Texto de error/aviso sobre fondo oscuro (rojo claro legible). */
export const CTA_HINT = "text-[#FF8A7A]";
