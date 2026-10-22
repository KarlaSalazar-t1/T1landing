import T1NotFoundV2 from "@/components/T1NotFoundV2";

export const metadata = {
  title: "Página no encontrada · T1",
  robots: { index: false, follow: false },
};

/* TEMPORAL: preview de la V2 de la 404 (cards tipo Stripe) para comparar contra
   la actual (cualquier URL inexistente). Borrar al decidir. */
export default function NotFoundV2Preview() {
  return <T1NotFoundV2 />;
}
