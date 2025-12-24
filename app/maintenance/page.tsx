"use client";
import { useEffect, useState } from "react";
import { Varela_Round } from "next/font/google";
import { motion, Variants } from "framer-motion";

const varela = Varela_Round({
  subsets: ["latin"],
  weight: "400",
});

type Maintenance = {
  service_name: string;
  description?: string;
  start_at?: string;
  end_at?: string;
};

// Variants para animación escalonada
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

export default function MaintenancePage() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenances = async () => {
      const res = await fetch("/api/maintenance");
      const data = await res.json();
      setMaintenances(data);
      setLoading(false);
    };
    fetchMaintenances();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <h1
            className={`${varela.className} text-5xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent`}
          >
            Mantenimientos programados
          </h1>
          <p className="text-sm text-gray-400">
            Última actualización:{" "}
            {new Date().toLocaleString("es-NI", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "long",
            })}
          </p>

          {/* 🔥 Resumen global */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-6"
            >
              <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold">
                {maintenances.length} mantenimiento(s) activo(s)
              </span>
            </motion.div>
          )}
        </header>

        {loading ? (
          <p className="text-center text-gray-400">Cargando mantenimientos...</p>
        ) : maintenances.length === 0 ? (
          <p className="text-center text-gray-500">No hay mantenimientos activos</p>
        ) : (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {maintenances.map((m, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="rounded-xl bg-white/5 backdrop-blur-md border border-yellow-500/30 shadow-lg p-6 transition-transform hover:scale-[1.02]"
              >
                <h2
                  className={`${varela.className} text-lg font-semibold text-yellow-400`}
                >
                  {m.service_name}
                </h2>
                {m.description && (
                  <p className="text-sm text-gray-200 mt-1">{m.description}</p>
                )}
                {m.start_at && m.end_at && (
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(m.start_at).toLocaleString()} →{" "}
                    {new Date(m.end_at).toLocaleString()}
                  </p>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
}
