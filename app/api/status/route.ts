import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "services.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const services = JSON.parse(raw);

  const results = await Promise.all(
    services.map(async (s: any) => {
      let status: "ok" | "down" = "ok";

      // Si el servicio está marcado en mantenimiento, lo devolvemos directo
      if (s.maintenance?.active) {
        return {
          name: s.name,
          category: s.category,
          status: "ok", // se muestra como operativo pero con flag de mantenimiento
          maintenance: s.maintenance,
        };
      }

      // Si no está en mantenimiento, hacemos ping a la URL
      try {
        const res = await fetch(s.url);
        if (!res.ok) status = "down";
      } catch {
        status = "down";
      }

      return {
        name: s.name,
        category: s.category,
        status,
        maintenance: s.maintenance,
      };
    })
  );

  return NextResponse.json(results);
}
