<div align="center">
  <img src="./public/logo.png" alt="UptimeCore Logo" width="120" />

  # UptimeCore

  **El núcleo que garantiza la disponibilidad de tus servicios.**  
  Dashboard moderno, emocional y confiable para monitoreo de estado, mantenimientos y contacto directo.

  [![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/FramerMotion-10.16-purple?logo=framer)](https://www.framer.com/motion/)
  [![Nodemailer](https://img.shields.io/badge/Nodemailer-6.9-orange?logo=gmail)](https://nodemailer.com/about/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

  [🌐 Demo en vivo](https://uptimecore.vercel.app) · [🐛 Reportar issue](https://github.com/MosecX/uptimecore/issues)
</div>

---

## 🧠 ¿Qué es UptimeCore?

**UptimeCore** es una aplicación web diseñada para visualizar el estado de tus servicios en tiempo real, con una experiencia visual premium.  
Combina diseño emocional, animaciones suaves y glassmorphism para transmitir confianza y claridad.  
Incluye **formulario de contacto integrado con envío de correos vía Gmail SMTP**.

---

## ✨ Características principales

- 🔍 **Resumen global animado** con estado general del sistema  
- 📦 **Cards de servicio** con badges, uptime y mantenimiento  
- 🧊 **Glassmorphism extendido** en navbar, cards y footer  
- 🎬 **Animaciones con Framer Motion** para narrativa visual  
- 📱 **Diseño responsive** para escritorio y móvil  
- 🧠 **Tipografía emocional** con Varela Round  
- ⚡ **Next.js 16.1.1** con App Router y optimización avanzada  
- 📧 **Formulario de contacto** con integración a `/api/contact` y envío directo vía Gmail SMTP  
- 🟢 **Optimización de rendimiento móvil** (97–100 Lighthouse)  

---

## 🖼️ Captura de pantalla ![Preview](./public/preview.png)

---

![Opti 1](./public/opti1.png)

![Opti 2](./public/opti2.png)

---

## 🚀 Instalación

```bash
# Clona el repositorio
git clone https://github.com/MosecX/uptimecore.git
cd uptimecore

# Instala dependencias
npm install

# Configura variables de entorno
# Genera una App Password en tu cuenta de Google (Seguridad → Contraseñas de aplicaciones)
# y crea un archivo .env.local en la raíz del proyecto con lo siguiente:

GMAIL_USER=tu_correo@gmail.com
GMAIL_PASS=tu_app_password

# Ejecuta en modo desarrollo
npm run dev

# Compila y ejecuta en producción
npm run build
npm run start
