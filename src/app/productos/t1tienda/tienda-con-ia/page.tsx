"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import { ProductModal } from "@/components/T1Features";

export default function TiendaConIAPage() {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      {/* Tienda con IA — full-page (no modal chrome) */}
      <ProductModal cardId="t1tienda" onClose={handleClose} pageMode />
      <T1Footer />
    </main>
  );
}
