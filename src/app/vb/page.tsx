/* /vb ahora redirige a / — la versión B pasó a ser la original (home). */
import { redirect } from "next/navigation";

export default function HomeVariantB() {
  redirect("/");
}
