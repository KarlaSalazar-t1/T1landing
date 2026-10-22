import T1NotFound from "@/components/T1NotFound";

export const metadata = {
  title: "Página no encontrada · T1",
  description: "La página que buscas cambió de lugar o ya no existe.",
};

/* 404 global. Ver T1NotFound. */
export default function NotFound() {
  return <T1NotFound fondo="hero" />;
}
