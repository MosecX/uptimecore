import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const historyPath = path.join(process.cwd(), "status-history.json");

  let history: any[] = [];
  try {
    if (fs.existsSync(historyPath)) {
      const raw = fs.readFileSync(historyPath, "utf-8").trim();
      history = raw ? JSON.parse(raw) : [];
    }
  } catch {
    history = [];
  }

  const counts: Record<string, { ok: number; total: number }> = {};

  history.forEach((entry: any) => {
    entry.services.forEach((s: any) => {
      if (!counts[s.name]) counts[s.name] = { ok: 0, total: 0 };
      counts[s.name].total += 1;
      if (s.status === "ok") counts[s.name].ok += 1;
    });
  });

  const uptime = Object.entries(counts).map(([name, { ok, total }]) => ({
    name,
    uptime: total > 0 ? Math.round((ok / total) * 100) : 0,
  }));

  return NextResponse.json(uptime);
}
