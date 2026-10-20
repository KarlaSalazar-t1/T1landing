"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/* Buscador de guía compartido: lleva a /rastreo/[guia]. Lo usan la página de
   resultado, /rastreo y el hero de /productos/t1envios/rastreo. */
export function useIrARastreo({ nuevaPestana = false }: { nuevaPestana?: boolean } = {}) {
  const router = useRouter();
  return (guia: string) => {
    const g = guia.trim();
    if (!g) return;
    const url = `/rastreo/${encodeURIComponent(g)}`;
    // La sublanding de Rastreo abre el resultado en otra pestaña (no deja la landing).
    if (nuevaPestana) window.open(url, "_blank", "noopener,noreferrer");
    else router.push(url);
  };
}

export default function T1RastreoBuscar({ inicial = "" }: { inicial?: string }) {
  const [q, setQ] = useState(inicial);
  const ir = useIrARastreo();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        ir(q);
      }}
      className="mx-auto w-full"
      style={{ maxWidth: 520 }}
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white p-1.5" style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.45)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-3 shrink-0"><circle cx="11" cy="11" r="7" stroke="rgba(0,0,0,0.4)" strokeWidth="1.8" /><path d="M20 20l-3.2-3.2" stroke="rgba(0,0,0,0.4)" strokeWidth="1.8" strokeLinecap="round" /></svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          required
          placeholder="Ingresa tu número de guía"
          aria-label="Número de guía"
          className="min-w-0 flex-1 bg-transparent px-2 py-2.5 font-inter text-[15px] text-black outline-none placeholder:text-black/40"
        />
        <button type="submit" className="shrink-0 rounded-full bg-[#DB3B2B] px-6 py-3 font-inter text-[14px] font-semibold text-white transition-all duration-150 hover:bg-[#C0332A]">
          Rastrear
        </button>
      </div>
    </form>
  );
}
