"use client";
import Link from "next/link";
import { Varela_Round } from "next/font/google";

const varela = Varela_Round({
  subsets: ["latin"],
  weight: "400",
});

export default function Footer() {
  return (
    <footer
      className={`mt-20 bg-white/5 backdrop-blur-md border-t border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] ${varela.className}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors"
        >
          Uptime<span className="text-emerald-400">Core</span>
        </Link>

        {/* Links */}
        <nav className="flex gap-6 text-sm">
          <Link
            href="/status"
            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-400 transition-all font-medium shadow-sm"
          >
            Estado
          </Link>
          <Link
            href="/maintenance"
            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-amber-500/20 hover:border-amber-400 transition-all font-medium shadow-sm"
          >
            Mantenimientos
          </Link>
          <Link
            href="/contact"
            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-sky-500/20 hover:border-sky-400 transition-all font-medium shadow-sm"
          >
            Contacto
          </Link>
        </nav>

        {/* Derechos */}
        <p className="text-xs text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} StatusPro · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
