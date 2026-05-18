import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { AppHeader } from "@/components/layout/AppHeader";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Talent Pipeline Tracker | Brasaland Digital",
  description:
    "Herramienta interna de People & Talent para gestionar candidaturas de Brasaland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} min-h-screen bg-[var(--crema)] font-sans antialiased`}>
        <AppHeader />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
