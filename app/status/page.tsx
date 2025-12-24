"use client";
import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { motion, Variants } from "framer-motion";

type Maintenance = { active: boolean; description?: string };
type Service = {
  name: string;
  status: "ok" | "down";
  category: string;
  maintenance?: Maintenance;
  uptime?: number;
};

// Variants para el contenedor (stagger)
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

// Variants para cada ítem
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

export default function StatusPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/check");
      const resStatus = await fetch("/api/status");
      const dataStatus = await resStatus.json();

      const resUptime = await fetch("/api/uptime");
      const dataUptime = await resUptime.json();

      const merged = dataStatus.map((s: Service) => {
        const u = dataUptime.find((x: any) => x.name === s.name);
        return { ...s, uptime: u?.uptime ?? 0 };
      });

      setServices(merged);
      setLoading(false);
    };
    fetchData();
  }, []);

  const grouped = services.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 px-6 py-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Estado del sistema
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

          {/* 🔥 Resumen global con badges */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center gap-4 mt-6"
            >
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                {services.filter((s) => s.status === "down").length} caídos
              </span>
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold">
                {services.filter((s) => s.maintenance?.active).length} en mantenimiento
              </span>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                {services.filter((s) => s.status === "ok").length} operativos
              </span>
            </motion.div>
          )}
        </header>

        {loading ? (
          <p className="text-center text-gray-400">Cargando estado de servicios...</p>
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <motion.section
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                {category}
              </h2>

              {/* Contenedor animado con stagger */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-6 grid-cols-1 sm:grid-cols-2"
              >
                {items.map((s) => (
                  <motion.div key={s.name} variants={itemVariants}>
                    <ServiceCard
                      name={s.name}
                      status={s.status}
                      maintenance={s.maintenance}
                      uptime={s.uptime}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          ))
        )}
      </div>
    </div>
  );
}
