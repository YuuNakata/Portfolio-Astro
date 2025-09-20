// Script para probar la función de notificación por email localmente
// Ejecutar con: node test.js

const testData = {
  name: "Juan Pérez",
  email: "juan@example.com",
  subject: "Consulta sobre desarrollo web",
  message:
    "Hola Raydel,\n\nEstoy interesado en contratarte para un proyecto de desarrollo web. ¿Podemos hablar sobre los detalles?\n\nSaludos,\nJuan",
};

console.log("📧 Probando función de notificación por email...");
console.log("Datos de prueba:", testData);

// Simular la llamada a la Edge Function
async function testEmailFunction() {
  try {
    const response = await fetch(
      "http://localhost:54321/functions/v1/send-contact-notification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_ANON_KEY", // Reemplaza con tu clave
        },
        body: JSON.stringify(testData),
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Email enviado exitosamente:", result);
    } else {
      console.error("❌ Error al enviar email:", result);
    }
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    console.log("\n💡 Asegúrate de que:");
    console.log("   1. El servidor local de Supabase esté ejecutándose");
    console.log(
      "   2. La función esté desplegada: supabase functions deploy send-contact-notification"
    );
    console.log("   3. Las variables de entorno estén configuradas");
  }
}

// Ejecutar la prueba
testEmailFunction();
