import { redirect } from "next/navigation";

/* El punto de venta pasó a ser producto propio: /productos/t1pos. */
export default function POSRedirect() {
  redirect("/productos/t1pos");
}
