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

      // Si está en mantenimiento, lo marcamos directo
      if (s.maintenance?.active) {
        return { name: s.name, status: "ok" };
      }

      try {
        const res = await fetch(s.url);
        if (!res.ok) status = "down";
      } catch {
        status = "down";
      }

      return { name: s.name, status };
    })
  );

  const historyPath = path.join(process.cwd(), "status-history.json");
  let history: any[] = [];

  try {
    const rawHistory = fs.existsSync(historyPath)
      ? fs.readFileSync(historyPath, "utf-8").trim()
      : "[]";
    history = rawHistory ? JSON.parse(rawHistory) : [];
  } catch {
    history = [];
  }

  history.unshift({
    timestamp: new Date().toISOString(),
    services: results,
  });

  fs.writeFileSync(historyPath, JSON.stringify(history.slice(0, 50), null, 2));

  return NextResponse.json({ message: "Chequeo guardado", results });
}
