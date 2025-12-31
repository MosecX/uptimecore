"use client";
import {
  CheckCircleIcon,
  XCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Varela_Round } from "next/font/google";

const varela = Varela_Round({
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  name?: string; // lo hacemos opcional para evitar undefined
  status?: "ok" | "down"; // también opcional, con fallback
  maintenance?: { active: boolean; description?: string };
  uptime?: number;
};

export default function ServiceCard({
  name,
  status = "ok", // fallback por defecto
  maintenance,
  uptime,
}: Props) {
  const isMaintenance = maintenance?.active;

  const config = {
    ok: {
      bg: "from-green-500 to-emerald-700",
      icon: <CheckCircleIcon className="h-5 w-5 text-white" />,
      label: "Operativo",
    },
    down: {
      bg: "from-red-500 to-rose-700",
      icon: <XCircleIcon className="h-5 w-5 text-white" />,
      label: "Caído",
    },
    maintenance: {
      bg: "from-yellow-500 to-amber-700",
      icon: <WrenchScrewdriverIcon className="h-5 w-5 text-white" />,
      label: "En mantenimiento",
    },
  };

  // fallback defensivo si status no existe en config
  const { bg, icon, label } = isMaintenance
    ? config.maintenance
    : config[status] ?? config.ok;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`rounded-lg bg-gradient-to-br ${bg} text-white shadow-[0_2px_10px_rgba(0,0,0,0.25)] px-4 py-3 w-full flex flex-col justify-between transition-transform hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-2">
        <div className="shrink-0">{icon}</div>
        <h3 className={`${varela.className} text-base font-semibold tracking-tight`}>
          {typeof name === "string" && name.trim() !== "" ? name : "Servicio sin nombre"}
        </h3>
      </div>

      <div className="mt-1 text-sm font-medium opacity-90">
        {typeof label === "string" ? label : "Estado desconocido"}
      </div>

      {isMaintenance && typeof maintenance?.description === "string" && (
        <p className="mt-1 text-xs text-gray-200 opacity-80 italic">
          {maintenance.description}
        </p>
      )}

      {typeof uptime === "number" && (
        <div className="mt-2 text-right text-xs font-medium text-gray-200 opacity-80">
          {uptime}% uptime
        </div>
      )}
    </motion.div>
  );
}
