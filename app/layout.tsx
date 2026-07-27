import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const display = Bebas_Neue({ variable: "--font-display", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Ithan New York — Dossier oficial",
  description: "Dossier oficial 2026 de Ithan NY: artista urbano chileno, música, audiencia, colaboraciones y contacto profesional.",
  metadataBase: new URL("https://ithan-new-york-orbit.fcpanxocastro.chatgpt.site"),
  openGraph: {
    title: "Ithan New York — Project Orbit",
    description: "El sonido de Chile para el mundo.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Ithan New York — Project Orbit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ithan New York — Project Orbit",
    description: "El sonido de Chile para el mundo.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geist.variable} ${mono.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
