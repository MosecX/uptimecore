"use client";
import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Varela_Round } from "next/font/google";

const varela = Varela_Round({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-950 to-black shadow-[0_4px_20px_rgba(0,0,0,0.6)] fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className={`${varela.className} text-2xl font-bold text-white tracking-tight hover:text-emerald-400 transition-colors`}
          >
            Uptime<span className="text-emerald-400">Core</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/status"
            className={`${varela.className} px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-400 transition-all font-medium shadow-sm`}
          >
            Estado
          </Link>
          <Link
            href="/maintenance"
            className={`${varela.className} px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-amber-500/20 hover:border-amber-400 transition-all font-medium shadow-sm`}
          >
            Mantenimientos
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-300 hover:text-white transition-colors"
        >
          {open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-950 shadow-lg transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-6 space-y-6">
          <Link
            href="/status"
            className={`${varela.className} block px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-400 transition-all font-medium shadow-sm`}
            onClick={() => setOpen(false)}
          >
            Estado
          </Link>
          <Link
            href="/maintenance"
            className={`${varela.className} block px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-amber-500/20 hover:border-amber-400 transition-all font-medium shadow-sm`}
            onClick={() => setOpen(false)}
          >
            Mantenimientos
          </Link>
        </div>
      </div>
    </nav>
  );
}
