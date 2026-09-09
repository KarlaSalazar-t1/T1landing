/* Biblioteca única de chips y frases del hero de creación de tienda con IA.
   Compartida por la home (/) y la landing de T1 Tienda para que el set y las
   frases sean idénticos (comparabilidad del A/B). Las frases van en minúscula
   en la data; la UI capitaliza la primera letra al mostrarlas.
   Set de 8 chips (~90% de la demanda medida). Accesorios y Calzado se cubren
   desde Moda (por eso Moda lleva 8 frases y el resto 6). */

export type HeroChip = { label: string; examples: string[] };

/* Frases del prompt animado (muestreo transversal del set). */
export const HERO_PROMPT_PLACEHOLDERS = [
  "quiero vender ropa casual con un estilo minimalista y colores neutros",
  "quiero vender bolsas y accesorios de piel hechos a mano",
  "quiero vender dulces y postres para eventos y regalos",
  "quiero vender joyería de plata con diseños elegantes y delicados",
  "quiero vender productos de skincare naturales para piel sensible",
  "quiero vender audífonos y accesorios para gaming",
  "quiero vender regalos personalizados para bodas y eventos",
  "quiero vender muebles y decoración con un estilo minimalista",
];

export const HERO_CHIPS: HeroChip[] = [
  { label: "Moda", examples: [
    "quiero vender ropa casual con un estilo minimalista y colores neutros",
    "quiero vender bolsas y accesorios de piel hechos a mano",
    "quiero vender playeras y sudaderas con estampados propios de mi marca",
    "quiero vender tenis y calzado urbano de marcas originales",
    "quiero vender ropa de mujer elegante para oficina y eventos",
    "quiero vender gorras, lentes y accesorios con un estilo urbano",
    "quiero vender ropa vintage y prendas de segunda mano curadas",
    "quiero vender ropa infantil cómoda y divertida para niños",
  ] },
  { label: "Artesanías", examples: [
    "quiero vender velas aromáticas y decoración hecha a mano",
    "quiero vender regalos personalizados para bodas y eventos",
    "quiero vender piezas de cerámica y barro hechas por artesanos mexicanos",
    "quiero vender bordados y textiles artesanales de mi comunidad",
    "quiero vender cajas de regalo curadas con productos locales",
    "quiero vender arte y láminas ilustradas de creadores independientes",
  ] },
  { label: "Dulces y snacks", examples: [
    "quiero vender dulces y postres para eventos y regalos",
    "quiero vender snacks y botanas mexicanas con empaque llamativo",
    "quiero vender chocolates y repostería fina hechos por encargo",
    "quiero vender mesas de dulces y bocadillos para fiestas",
    "quiero vender galletas decoradas y postres personalizados",
    "quiero vender café de especialidad y productos gourmet artesanales",
  ] },
  { label: "Belleza", examples: [
    "quiero vender productos de skincare naturales para piel sensible",
    "quiero vender maquillaje con una imagen fresca y juvenil",
    "quiero vender perfumes y fragancias con presentación elegante",
    "quiero vender productos para el cuidado del cabello rizado",
    "quiero vender cosméticos veganos y libres de crueldad animal",
    "quiero vender jabones y productos artesanales para el cuidado personal",
  ] },
  { label: "Electrónica", examples: [
    "quiero vender audífonos y accesorios para gaming",
    "quiero vender fundas y accesorios para celular con diseños originales",
    "quiero vender gadgets y tecnología para casa inteligente",
    "quiero vender accesorios de cómputo con un estilo minimalista",
    "quiero vender bocinas y equipo de audio portátil",
    "quiero vender smartwatches y wearables de varias marcas",
  ] },
  { label: "Joyería", examples: [
    "quiero vender joyería de plata con diseños elegantes y delicados",
    "quiero vender bisutería artesanal hecha a mano",
    "quiero vender anillos y collares personalizados para regalo",
    "quiero vender relojes de marca con presentación premium",
    "quiero vender joyería minimalista de acero inoxidable",
    "quiero vender aretes y pulseras con piedras naturales",
  ] },
  { label: "Deportes", examples: [
    "quiero vender ropa y accesorios deportivos de marcas originales",
    "quiero vender suplementos y productos para entrenamiento",
    "quiero vender equipo de ciclismo y accesorios para rodadas",
    "quiero vender artículos de yoga y fitness para entrenar en casa",
    "quiero vender jerseys y artículos de coleccionista de futbol",
    "quiero vender tenis deportivos y calzado para correr",
  ] },
  { label: "Hogar", examples: [
    "quiero vender muebles y decoración con un estilo minimalista",
    "quiero vender textiles para el hogar como cojines y cobijas",
    "quiero vender organizadores y artículos prácticos para casa",
    "quiero vender plantas y macetas con diseños modernos",
    "quiero vender vajillas y utensilios de cocina de diseño",
    "quiero vender lámparas y piezas decorativas para interiores",
  ] },
];

/* Primera letra en mayúscula (la data va en minúscula). */
export const capFirst = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
