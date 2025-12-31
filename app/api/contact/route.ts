import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { nombre, correo, mensaje } = await req.json();

    if (!nombre || !correo || !mensaje) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    // Configuración del transporter con Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // tu correo Gmail
        pass: process.env.GMAIL_PASS, // tu App Password
      },
    });

    // Opciones del correo
    await transporter.sendMail({
      from: `"UptimeCore Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // te lo envías a vos mismo
      subject: `Nuevo mensaje de ${nombre}`,
      text: `De: ${correo}\n\n${mensaje}`,
      html: `<p><strong>De:</strong> ${correo}</p><p>${mensaje}</p>`,
    });

    return NextResponse.json({ success: true, message: "Correo enviado" });
  } catch (err) {
    console.error("Error enviando correo:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
