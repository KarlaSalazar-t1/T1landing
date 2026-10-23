import T1Waitlist from "@/components/T1Waitlist";

export const metadata = {
  title: "Lista de espera · T1 Colombia",
  robots: { index: false, follow: false },
};

/* TEMPORAL: preview de la waitlist de Colombia con el degradado de los heroes,
   para comparar contra /colombia (manchas rojo/azul/morado). Borrar al decidir. */
export default function ColombiaWaitlistHeroPreview() {
  return <T1Waitlist fondo="hero" />;
}
