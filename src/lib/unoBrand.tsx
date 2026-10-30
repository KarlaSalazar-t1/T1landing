"use client";

/* Propuesta "Uno en el home": un interruptor para que las páginas de propuesta
   (/hero-uno, /hero-uno/b) presenten a Uno sin tocar el home publicado.
   Con el interruptor encendido, el menú de Productos suma a Uno y los textos
   que dicen "la IA" pasan a decir "Uno". */

import { createContext, useContext, type ReactNode } from "react";

const UnoBrand = createContext(false);

export function UnoBrandProvider({ children }: { children: ReactNode }) {
  return <UnoBrand.Provider value={true}>{children}</UnoBrand.Provider>;
}

export function useUnoBrand() {
  return useContext(UnoBrand);
}

/* Frases del home que hablan de "la IA" → su versión con Uno */
const UNO_COPY: [string, string][] = [
  ["Describe tu negocio y la IA crea tu tienda", "Describe tu negocio y Uno crea tu tienda"],
  ["Describe tu negocio y nuestra IA creará tu tienda en segundos", "Describe tu negocio y Uno crea tu tienda en segundos"],
  ["Crea tu tienda con IA y vende", "Crea tu tienda con Uno y vende"],
  ["desde una sola plataforma potenciada con IA", "desde una sola plataforma, con Uno, la IA de T1"],
];

export function useUnoCopy() {
  const on = useUnoBrand();
  return (text: string) => (on ? UNO_COPY.reduce((t, [a, b]) => t.replace(a, b), text) : text);
}

/* Columna de Uno en el menú de Productos (sin temas: va junto a POS y Finanzas) */
export const UNO_MENU_COLUMN = {
  title: "Uno",
  href: "/uno",
  desc: "La IA de T1: pídele lo que necesites y lo hace por ti.",
  items: [] as { title: string; desc: string; href?: string }[],
};
