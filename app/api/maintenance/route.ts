import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "services.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const services = JSON.parse(raw);

  // Filtramos solo los servicios en mantenimiento
  const maintenances = services
    .filter((s: any) => s.maintenance?.active)
    .map((s: any) => ({
      service_name: s.name,
      description: s.maintenance?.description,
    }));

  return NextResponse.json(maintenances);
}
