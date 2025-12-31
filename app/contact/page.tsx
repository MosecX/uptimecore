"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const nombre = formData.get("nombre");
    const correo = formData.get("correo");
    const mensaje = formData.get("mensaje");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, mensaje }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Error al enviar el mensaje");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen px-4 sm:px-6 py-12 flex items-center justify-center text-white"
    >
      <div className="w-full max-w-lg backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
          Contáctanos
        </h1>

        {submitted ? (
          <p className="text-center text-green-400 font-medium">
            ¡Gracias por tu mensaje! Te responderemos pronto.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                required
                className="mt-1 w-full rounded-md bg-gray-800/40 text-white px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Correo electrónico
              </label>
              <input
                type="email"
                name="correo"
                required
                className="mt-1 w-full rounded-md bg-gray-800/40 text-white px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Mensaje
              </label>
              <textarea
                name="mensaje"
                required
                rows={4}
                className="mt-1 w-full rounded-md bg-gray-800/40 text-white px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
