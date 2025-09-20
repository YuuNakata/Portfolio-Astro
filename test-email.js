// Script de prueba para verificar el envío de emails
// Ejecutar con: node test-email.js

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Variables de entorno no configuradas");
  console.log("Asegúrate de configurar:");
  console.log("PUBLIC_SUPABASE_URL=tu_url_de_supabase");
  console.log("PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima");
  process.exit(1);
}

const testData = {
  name: "Usuario de Prueba",
  email: "test@example.com",
  subject: "Mensaje de prueba desde el portafolio",
  message:
    "Este es un mensaje de prueba para verificar que el sistema de notificaciones por email funciona correctamente.\n\nSaludos,\nUsuario de Prueba",
};

async function testEmailNotification() {
  try {
    console.log("🚀 Probando notificación por email...");
    console.log("Datos de prueba:", testData);

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/send-contact-notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(testData),
      }
    );

    console.log("Estado de respuesta:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error en la función:", errorText);
      return;
    }

    const result = await response.json();
    console.log("✅ Respuesta exitosa:", result);
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    console.log("\n💡 Posibles soluciones:");
    console.log("1. Verifica que las variables de entorno sean correctas");
    console.log("2. Asegúrate de que la función esté desplegada");
    console.log("3. Revisa los logs en Supabase Dashboard");
  }
}

// Ejecutar la prueba
testEmailNotification();
