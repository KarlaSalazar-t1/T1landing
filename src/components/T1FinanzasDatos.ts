/* Datos compartidos entre el landing de Finanzas y su versión v2.

   Van en un archivo sin "use client" a propósito: si se importan desde un
   módulo de cliente, un Server Component recibe un proxy y las propiedades
   salen undefined. Mismo motivo que T1FinanzasTokens.ts. */

/* Los logos son SOLO los de las tiendas cuyos pedidos llegan a Finanzas el
   día que se publica. WooCommerce queda fuera hasta confirmarlo. */
export const CANAL_LOGOS = [
  { src: "/img/meli-iso.svg", alt: "Mercado Libre" },
  { src: "/img/amazon-iso.svg", alt: "Amazon" },
  { src: "/img/walmart.svg", alt: "Walmart" },
  { src: "/img/tiktokshop.svg", alt: "TikTok Shop" },
  { src: "/img/sears-isotipo.svg", alt: "Sears" },
  { src: "/img/sanborns-iso.svg", alt: "Sanborns" },
  { src: "/img/shein-iso.svg", alt: "SHEIN" },
  { src: "/img/aliexpress.svg", alt: "AliExpress" },
  { src: "/img/shopify.svg", alt: "Shopify" },
  { src: "/img/tiendanube.svg", alt: "Tienda Nube" },
  { src: "/img/totalplay.svg", alt: "Total Play" },
];

/* Los isotipos flotan alrededor del texto, como en "Actualizar cada canal a
   mano" de la sublanding de marketplaces. En móvil se reparten arriba y
   abajo, para que nunca se encimen con el texto. */
export const DISPERSION_DESKTOP = [
  { i: 0, l: "8%", t: "22%", s: 54, r: -8 },
  { i: 1, l: "16%", t: "62%", s: 48, r: 7 },
  { i: 2, l: "90%", t: "24%", s: 52, r: 8 },
  { i: 3, l: "84%", t: "64%", s: 46, r: -7 },
  { i: 4, l: "28%", t: "11%", s: 44, r: 5 },
  { i: 5, l: "72%", t: "10%", s: 42, r: -5 },
  { i: 6, l: "6%", t: "44%", s: 44, r: 6 },
  { i: 7, l: "94%", t: "44%", s: 46, r: -6 },
  { i: 8, l: "30%", t: "88%", s: 46, r: 6 },
  { i: 9, l: "70%", t: "89%", s: 44, r: -6 },
  { i: 10, l: "49%", t: "92%", s: 40, r: 4 },
];
export const DISPERSION_MOVIL = [
  { i: 0, l: "12%", t: "8%", s: 42, r: -8 },
  { i: 4, l: "38%", t: "5%", s: 38, r: 5 },
  { i: 3, l: "64%", t: "6%", s: 38, r: -5 },
  { i: 2, l: "88%", t: "10%", s: 42, r: 8 },
  { i: 6, l: "22%", t: "16%", s: 36, r: 4 },
  { i: 5, l: "78%", t: "17%", s: 36, r: -6 },
  { i: 1, l: "12%", t: "90%", s: 42, r: 7 },
  { i: 8, l: "38%", t: "93%", s: 40, r: -6 },
  { i: 9, l: "62%", t: "92%", s: 40, r: 7 },
  { i: 7, l: "88%", t: "88%", s: 42, r: 6 },
  { i: 10, l: "74%", t: "81%", s: 36, r: -4 },
];

/* Mientras no existan las sublandings, cada tarjeta lleva a la pregunta
   frecuente de su tema, que se abre sola al llegar por la liga. */
export const NEGOCIOS = [
  {
    title: "Marketplaces",
    desc: "Tu factura global de cada marketplace, sin armarla a mano.",
    href: "/productos/t1finanzas#faq-global-marketplaces",
  },
  {
    title: "Tienda en línea",
    desc: "Facturas cada pedido en un clic, y los datos de tu cliente se guardan desde su primera factura.",
    href: "/productos/t1finanzas#faq-ya-uso-t1-tienda",
  },
  {
    title: "Mostrador",
    desc: "Facturas tus ventas sin pagar otro sistema.",
    href: "/productos/t1finanzas#faq-venta-fuera-de-t1",
  },
  {
    title: "Ventas a empresas",
    desc: "Facturas a crédito y registras cada pago con su recibo.",
    href: "/productos/t1finanzas#faq-recibos-de-pago",
  },
];
