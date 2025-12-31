import type { Metadata } from "next";
import { Geist, Geist_Mono, Varela_Round } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const varela = Varela_Round({
  variable: "--font-varela",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "UptimeCore - Monitoreo de Servicios en Tiempo Real",
  description: "Real-time monitoring of your services status.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${varela.variable} text-gray-100`}
        style={{
          background: `
            radial-gradient(1200px 600px at 15% 0%, rgba(16,185,129,.35), transparent 55%),
            radial-gradient(900px 540px at 90% 15%, rgba(45,212,191,.30), transparent 56%),
            radial-gradient(800px 500px at 0% 85%, rgba(99,102,241,.28), transparent 60%),
            radial-gradient(700px 400px at 50% 100%, rgba(139,92,246,.25), transparent 65%),
            linear-gradient(165deg, #0f172a, #020617 42%, #000000)
          `,
          backdropFilter: "blur(14px)",
        }}
      >
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
