"use client";
import { useEffect, useState, memo } from "react";
import ServiceCard from "../components/ServiceCard";
import { motion, Variants } from "framer-motion";

// Tipos
type Maintenance = { active: boolean; description?: string };
type Service = {
  name?: string;
  status: "ok" | "down";
  category?: string;
  maintenance?: Maintenance;
  uptime?: number;
};

// Variants más ligeros
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

// Memo para evitar re-renders innecesarios
const MemoServiceCard = memo(ServiceCard);

export default function StatusPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (err) {
        console.error("Error al cargar estado:", err);
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh cada 60s con try/catch
    const interval = setInterval(() => {
      fetchData().catch((err) =>
        console.error("Error en auto-refresh:", err)
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const grouped = services.reduce((acc, s) => {
    const cat = s.category || "Sin categoría";
    (acc[cat] ||= []).push(s);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="relative min-h-screen text-gray-100 px-4 sm:px-6 py-8 font-sans overflow-hidden">
      {/* 🧊 Contenedor glassmorphism optimizado */}
      <div className="max-w-5xl mx-auto space-y-12 backdrop-blur-sm md:backdrop-blur-xl bg-white/5 rounded-2xl p-6 sm:p-8 shadow-md md:shadow-xl border border-white/10">
        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Estado del sistema
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Última actualización:{" "}
            {new Date().toLocaleString("es-NI", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "long",
            })}
          </p>

          {!loading && (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6"
            >
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                {services.filter((s) => s.status === "down").length} caídos
              </span>
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                {services.filter((s) => s.maintenance?.active).length} en mantenimiento
              </span>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                {services.filter((s) => s.status === "ok").length} operativos
              </span>
            </motion.div>
          )}
        </header>

        {loading ? (
          // Skeleton loader premium
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-800/40 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <motion.section
              key={category}
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                {category}
              </h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2"
              >
                {items.map((s) => (
                  <motion.div
                    key={s.name || Math.random()}
                    variants={itemVariants}
                    className={s.status === "down" ? "animate-pulse-slow" : ""}
                  >
                    <MemoServiceCard
                      name={s.name || "Servicio desconocido"}
                      status={s.status}
                      maintenance={s.maintenance}
                      uptime={s.uptime}
                    />

                    {/* Barra de uptime */}
                    <div className="mt-2">
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            s.uptime === 100
                              ? "bg-green-400"
                              : s.uptime === 0
                              ? "bg-red-400"
                              : "bg-yellow-400"
                          }`}
                          style={{ width: `${s.uptime ?? 0}%` }}
                        />
                      </div>
                    </div>
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
