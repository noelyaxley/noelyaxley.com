import type { Metadata } from "next";
import { Figtree, Archivo } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Archivo kept only for the hero name — one decorative moment
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

const siteUrl = "https://noelyaxley.com";

export const metadata: Metadata = {
  title: "Noel Yaxley — Builder, Founder, Architect",
  description:
    "Serial entrepreneur building across construction, property, technology, and health.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Noel Yaxley — Builder, Founder, Architect",
    description:
      "Serial entrepreneur building across construction, property, technology, and health.",
    url: siteUrl,
    siteName: "Noel Yaxley",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Noel Yaxley — 8 ventures, one builder",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noel Yaxley — Builder, Founder, Architect",
    description:
      "Serial entrepreneur building across construction, property, technology, and health.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${archivo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
