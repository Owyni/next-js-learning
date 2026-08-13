import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StayFinder",
  description: "Encuentra espacios increíbles para tu próxima estancia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}   