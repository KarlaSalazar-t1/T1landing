/* Tipos y datos de EJEMPLO del resultado de rastreo (/rastreo/[guia]).
   Sin "use client": lo usa la página (servidor) y el componente (cliente).
   Para conectarlo al API, devolver un objeto con la forma `Rastreo`. */

export type Paso = "guia" | "recolectado" | "transito" | "final";
export type EstatusFinal = "entregado" | "retornado" | null; // null = aún en camino
export type Evento = { fecha: string; hora: string; detalle: string };
export type Rastreo = {
  guia: string;
  paqueteria: { nombre: string; logo: string; url: string };
  estatus: "entregado" | "transito" | "retornado";
  fechaEstatus: string; // "29 de septiembre de 2026"
  pasoActual: Paso;
  final: EstatusFinal;
  entregarEn: string;
  recibe: string;
  historial: {
    guia: { fecha: string };
    recolectado?: { fecha: string; detalle: string };
    transito: Evento[];
    final?: { fecha: string; detalle: string };
  };
};


/* ── Datos de ejemplo: el estatus depende del último dígito de la guía ──
   0-3 → Entregada · 4-6 → En tránsito · 7-9 → Retornada */
export function rastreoDemo(guia: string): Rastreo {
  const ult = Number(guia.trim().slice(-1));
  const estatus: Rastreo["estatus"] = Number.isNaN(ult) ? "transito" : ult <= 3 ? "entregado" : ult <= 6 ? "transito" : "retornado";
  const base = {
    guia,
    entregarEn: "Reforma 222, 14, Juárez, Ciudad de México",
    recibe: "Laura Gómez",
  };
  if (estatus === "entregado") {
    return {
      ...base,
      paqueteria: { nombre: "DHL", logo: "/img/carriers/dhl.svg", url: "https://www.dhl.com/mx-es/home/rastreo.html" },
      estatus,
      fechaEstatus: "15 de octubre de 2026",
      pasoActual: "final",
      final: "entregado",
      historial: {
        guia: { fecha: "14-oct 10:55 AM" },
        recolectado: { fecha: "14-oct 6:13 PM", detalle: "Recolectado por la paquetería" },
        transito: [
          { fecha: "14-oct", hora: "11:13 PM", detalle: "Llegó al centro de distribución" },
          { fecha: "15-oct", hora: "4:33 AM", detalle: "Salió del centro de distribución" },
          { fecha: "15-oct", hora: "3:55 PM", detalle: "En ruta de entrega" },
        ],
        final: { fecha: "15-oct 5:46 PM", detalle: "Entregado · Recibió Laura Gómez" },
      },
    };
  }
  if (estatus === "retornado") {
    return {
      ...base,
      paqueteria: { nombre: "T1 Envíos", logo: "/img/t1envios-logo.svg", url: "#" },
      estatus,
      fechaEstatus: "29 de septiembre de 2026",
      pasoActual: "final",
      final: "retornado",
      historial: {
        guia: { fecha: "10-sep 4:42 PM" },
        recolectado: { fecha: "11-sep 1:20 PM", detalle: "Recolectado por la paquetería" },
        transito: [
          { fecha: "23-sep", hora: "8:00 AM", detalle: "Excepción · Domicilio no localizado" },
          { fecha: "29-sep", hora: "5:47 PM", detalle: "Tránsito · Regresa a origen" },
        ],
        final: { fecha: "29-sep 5:57 PM", detalle: "Retornada al remitente" },
      },
    };
  }
  return {
    ...base,
    paqueteria: { nombre: "FedEx", logo: "/img/carriers/fedex.svg", url: "https://www.fedex.com/es-mx/tracking.html" },
    estatus,
    fechaEstatus: "17 de octubre de 2026",
    pasoActual: "transito",
    final: null,
    historial: {
      guia: { fecha: "15-oct 9:12 AM" },
      recolectado: { fecha: "15-oct 2:30 PM", detalle: "Recolectado por la paquetería" },
      transito: [
        { fecha: "15-oct", hora: "9:40 PM", detalle: "Llegó al centro de distribución" },
        { fecha: "16-oct", hora: "6:05 AM", detalle: "Salió del centro de distribución" },
        { fecha: "16-oct", hora: "8:22 PM", detalle: "Llegó a la ciudad destino" },
      ],
    },
  };
}

