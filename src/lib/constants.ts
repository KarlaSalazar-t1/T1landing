// ── Routes ──
export const SIGNUP_URL = "/registro";
export const LOGIN_URL = "/login";
export const SALES_URL = "/contacto-ventas";
export const CASES_URL = "/casos-de-exito";

// ── Navigation ──
export const NAV_LINKS = [
  { label: "Por qué T1", href: "/por-que-t1" },
  { label: "Clientes", href: CASES_URL },
  { label: "Enterprise", href: SALES_URL },
];

// ── Mega Menu ──
export const MEGA_MENU_COLUMNS = [
  {
    title: "T1tienda",
    href: "/productos/t1tienda",
    items: [
      { title: "Tienda con IA", desc: "Crea tu tienda online en minutos", href: "/productos/t1tienda/tienda-con-ia" },
      { title: "Marketplaces", desc: "Vende en Mercado Libre, Amazon y más", href: "/productos/t1tienda/marketplaces" },
      { title: "Productos e inventario", desc: "Stock, precios y variantes centralizados", href: "/productos/t1tienda/productos" },
      { title: "Pasarela de pagos", desc: "Optimizado para mayor conversión", href: "/productos/t1tienda/pasarela" },
      { title: "Punto de venta", desc: "Vende en tienda física y en línea", href: "/productos/t1tienda/punto-de-venta" },
      { title: "Reportería avanzada", desc: "Ventas, tráfico y rendimiento", href: "/productos/t1tienda/reportes" },
    ],
  },
  {
    title: "T1envíos",
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
    title: "T1pagos",
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
    title: "T1score",
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
    "T1tienda + TikTok Shop",
    "T1score integra Círculo de Crédito",
    "T1envíos llega a Colombia y Brasil",
  ],
};

export const MEGA_MENU_BOTTOM = [
  { title: "Soy emprendedor", desc: "Empieza gratis sin tarjeta", href: SIGNUP_URL },
  { title: "Tengo una PyME", desc: "Planes y precios a tu medida", href: "/precios" },
  { title: "Soy enterprise", desc: "Habla con un experto", href: SALES_URL },
];

// ── Hero ──
export const HERO_DATA = {
  eyebrowWord: "Envía",
  heading: "La plataforma del\ncomercio moderno",
  cta: "Comienza gratis",
  ctaSecondary: "Iniciar sesión",
  ctaHref: SIGNUP_URL,
  // Social proof rather than restating "gratis" (which the button already says).
  subtitle: "Únete a +25,000 negocios que ya venden con T1.",
};

// ── Feature cards (Todo tu negocio) ──
export const FEATURES_HEADING = "Todo tu negocio, en un solo lugar";
export const FEATURES_SUBTITLE =
  "Vende, cobra y envía con una sola plataforma.";

export const FEATURE_CARDS = [
  {
    id: "vende",
    label: "VENDE",
    description:
      "En tu tienda en línea o marketplaces. Gestiona tus productos y pedidos desde un solo lugar.",
    icon: "/img/vende.svg",
  },
  {
    id: "cobra",
    label: "COBRA",
    description:
      "Con tarjeta o transferencia con nuestro checkout integrado en tienda en línea o creando links de pagos.",
    icon: "/img/cobra.svg",
  },
  {
    id: "envia",
    label: "ENVÍA",
    description:
      "Cotiza y crea envíos con las mejores paqueterías, con los precios más bajos y el mejor servicio.",
    icon: "/img/envia.svg",
  },
];

// ── Footer ──
export const FOOTER_SOLUTIONS = [
  { label: "T1tienda", href: "/productos/t1tienda" },
  { label: "T1pagos", href: "/productos/t1pagos" },
  { label: "T1envíos", href: "/productos/t1envios" },
  { label: "T1score", href: "/productos/t1score" },
];

export const FOOTER_COMPANY = [
  { label: "¿Qué es T1?", href: "/por-que-t1" },
  { label: "Únete a T1", href: SIGNUP_URL },
  { label: "Historias de éxito", href: CASES_URL },
  { label: "Contacto", href: SALES_URL },
];
