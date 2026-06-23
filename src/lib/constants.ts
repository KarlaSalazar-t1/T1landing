// ── Routes ──
export const SIGNUP_URL = "/registro";
export const LOGIN_URL = "/login";
export const SALES_URL = "/contacto-ventas";
export const CASES_URL = "/casos-de-exito";

// ── Navigation ──
export const NAV_LINKS = [
  { label: "Por qué T1", href: "/por-que-t1" },
  { label: "Precios", href: "/precios" },
  { label: "Clientes", href: CASES_URL },
  { label: "Enterprise", href: SALES_URL },
];

// ── Mega Menu ──
export const MEGA_MENU_COLUMNS = [
  {
    title: "T1 Tienda",
    href: "/productos/t1tienda",
    items: [
      { title: "Tienda con IA", desc: "Crea tu tienda online en minutos", href: "/productos/t1tienda/tienda-con-ia" },
      { title: "Marketplaces", desc: "Vende en Mercado Libre, Amazon y más", href: "/productos/t1tienda/marketplaces" },
      { title: "Productos e inventario", desc: "Inventario, precios y variantes centralizados", href: "/productos/t1tienda/productos" },
      { title: "Pasarela de pagos", desc: "Optimizado para mayor conversión", href: "/productos/t1tienda/pasarela" },
      { title: "Punto de venta", desc: "Vende en tienda física y en línea", href: "/productos/t1tienda/punto-de-venta" },
      { title: "Reportería avanzada", desc: "Ventas, tráfico y rendimiento", href: "/productos/t1tienda/reportes" },
    ],
  },
  {
    title: "T1 Envíos",
    href: "/productos/t1envios",
    items: [
      { title: "Multipaquetería", desc: "Conecta +25 paqueterías en un click", href: "/productos/t1envios/multipaqueteria" },
      { title: "Reglas de envío", desc: "Asignación automática de carriers", href: "/productos/t1envios/reglas" },
      { title: "Rastreo de guías", desc: "Rastrea todas tus guías en un lugar", href: "/productos/t1envios/rastreo" },
      { title: "Control de calidad", desc: "Detecta problemas antes que tu cliente", href: "/productos/t1envios/control-calidad" },
      { title: "Recolecciones", desc: "Programa pickups automáticos", href: "/productos/t1envios/recolecciones" },
      { title: "Reportes logísticos", desc: "Tiempos de entrega, costos y carriers", href: "/productos/t1envios/reportes" },
    ],
  },
  {
    title: "T1 Pagos",
    href: "/productos/t1pagos",
    items: [
      { title: "Pagos en línea", desc: "Tarjetas, transferencias y efectivo", href: "/productos/t1pagos/pagos-en-linea" },
      { title: "Links de pago", desc: "Cobra compartiendo un enlace", href: "/productos/t1pagos/links-de-pago" },
      { title: "Enrutamiento de pagos", desc: "Mayor aprobación entre procesadores", href: "/productos/t1pagos/enrutamiento" },
      { title: "Conciliación", desc: "Cierre contable automatizado", href: "/productos/t1pagos/conciliacion" },
      { title: "Reclamaciones", desc: "Gestiona disputas y chargebacks", href: "/productos/t1pagos/reclamaciones" },
    ],
  },
  {
    title: "T1 Score",
    href: "/productos/t1score",
    items: [
      { title: "Prevención de fraude", desc: "Bloquea fraude en tiempo real", href: "/productos/t1score/prevencion-fraude" },
      { title: "Análisis de riesgo", desc: "Evalúa cada operación al instante", href: "/productos/t1score/analisis-riesgo" },
      { title: "Evaluación crediticia", desc: "Datos tradicionales y alternativos", href: "/productos/t1score/evaluacion-crediticia" },
    ],
  },
];

export const MEGA_MENU_SIDEBAR = {
  caseStudy: {
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=520&h=200&fit=crop",
    text: "Nuestros resultados nos respaldan",
  },
  news: [
    "T1 Tienda + TikTok Shop",
    "T1 Score integra Círculo de Crédito",
    "T1 Envíos llega a Colombia y Brasil",
  ],
};

export const MEGA_MENU_BOTTOM = [
  { title: "Soy emprendedor", desc: "Empieza gratis sin tarjeta", href: SIGNUP_URL },
  { title: "Tengo una PyME", desc: "Planes y precios a tu medida", href: "/precios" },
  { title: "Soy enterprise", desc: "Habla con un experto", href: SALES_URL },
];

// ── Hero ──
export const HERO_DATA = {
  cta: "Comienza gratis",
  ctaSecondary: "Iniciar sesión",
  ctaHref: SIGNUP_URL,
  // IA lives once, fixed and core, in the H1 ("listo con IA") — CEO: "nacimos
  // con IA, es core". The subtitle stays general and platform-wide instead of
  // the old "describe tu negocio" prompt voice, which read as the Tienda-only
  // store builder (CEO: "va muy dirigido a tienda"). It now spans the whole
  // 360 ecosystem with equal weight on the three pillars — vender / cobrar /
  // enviar — our real differentiator, not just an online store.
  subtitle: "Todo lo que tu negocio necesita para vender, cobrar y enviar.",
};

// ── Footer ──
export const FOOTER_SOLUTIONS = [
  { label: "T1 Tienda", href: "/productos/t1tienda" },
  { label: "T1 Pagos", href: "/productos/t1pagos" },
  { label: "T1 Envíos", href: "/productos/t1envios" },
  { label: "T1 Score", href: "/productos/t1score" },
];

export const FOOTER_COMPANY = [
  { label: "¿Qué es T1?", href: "/por-que-t1" },
  { label: "Únete a T1", href: SIGNUP_URL },
  { label: "Historias de éxito", href: CASES_URL },
  { label: "Contacto", href: SALES_URL },
];
