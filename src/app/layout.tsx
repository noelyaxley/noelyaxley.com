import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const figtree = localFont({
  src: "./fonts/figtree-latin-wght-normal.woff2",
  variable: "--font-figtree",
  weight: "300 700",
  style: "normal",
  display: "swap",
});

// Archivo kept only for the hero name — one decorative moment
const archivo = localFont({
  src: [
    {
      path: "./fonts/archivo-latin-wght-normal.woff2",
      weight: "700 900",
      style: "normal",
    },
    {
      path: "./fonts/archivo-latin-wght-italic.woff2",
      weight: "700 900",
      style: "italic",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
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
