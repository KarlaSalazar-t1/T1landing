import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Las fuentes viven en el proyecto (src/app/fonts, versiones variables de
   Google Fonts, subconjunto latin) en lugar de next/font/google: así el build
   no depende de descargarlas de Google, que a veces fallaba en Vercel. */
const sora = localFont({
  src: "./fonts/sora.woff2",
  variable: "--font-sora-var",
  weight: "300 600",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter.woff2",
  variable: "--font-inter-var",
  weight: "300 600",
  display: "swap",
});

const manrope = localFont({
  src: "./fonts/manrope.woff2",
  variable: "--font-manrope-var",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "T1 - La plataforma del comercio moderno",
  description:
    "Todo en uno. Tienda, pagos y envíos para tu negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
