import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const display = Bebas_Neue({ variable: "--font-display", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Ithan New York — Música, Placeres y shows | Flow New York",
  description: "El sitio oficial de Ithan NY y Flow New York. Descubre Placeres, escucha su música, mira sus videos y conecta con el artista. De Villa Francia para el mundo.",
  metadataBase: new URL("https://www.flownewyork.cl"),
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Ithan New York — Flow New York",
    description: "Música, Placeres, videos y shows. De Villa Francia para el mundo.",
    url: "https://www.flownewyork.cl",
    siteName: "Flow New York",
    locale: "es_CL",
    type: "website",
    images: [{ url: "/media/hero-poster.webp", width: 1600, height: 1000, alt: "Ithan New York — Flow New York" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ithan New York — Flow New York",
    description: "El sonido de Chile para el mundo.",
    images: ["/media/hero-poster.webp"],
  },
};

export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geist.variable} ${mono.variable} ${display.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "MusicGroup", name: "Ithan New York", alternateName: "Ithan NY",
          url: "https://www.flownewyork.cl", image: "https://www.flownewyork.cl/media/hero-poster.webp", genre: ["Reggaetón", "Trap"],
          sameAs: ["https://open.spotify.com/artist/0LshXUmIub6xKvOq4QmtNs", "https://www.youtube.com/channel/UCHUwaZ29fbxOHBmk32U-Xdw", "https://www.instagram.com/ithannewyork/", "https://www.tiktok.com/@ithannewyork"],
        }) }} />
        {children}
      </body>
    </html>
  );
}
