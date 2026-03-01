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

export const metadata: Metadata = {
  title: "Noel Yaxley — Builder, Founder, Architect",
  description:
    "Serial entrepreneur building across construction, property, technology, and health.",
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
