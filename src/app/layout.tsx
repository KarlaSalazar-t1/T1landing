import type { Metadata } from "next";
import { Sora, Inter, Manrope } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
