/* ──────────────────────────────────────────────────────────────────────────
   Colores y tipografía de los paneles, tomados de la interfaz real.

   Van en su propio archivo, sin "use client", porque el hero es un
   componente de servidor: si importa constantes desde un módulo de cliente,
   Next le entrega una referencia y las propiedades llegan vacías. Eso dejaba
   los textos de la tabla sin color, heredando el blanco de la página.
   ────────────────────────────────────────────────────────────────────────── */

export const FUENTE = "var(--font-inter), 'Inter', sans-serif";

export const UI = {
  texto: "#17161A",
  suave: "#6B7280",
  tenue: "#9CA3AF",
  borde: "rgba(0,0,0,0.08)",
  bordeSuave: "rgba(0,0,0,0.05)",
  rojo: "#E2402F",
  fondo: "#FAFAF9",
};
