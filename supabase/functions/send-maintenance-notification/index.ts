import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "raydel.reuco@gmail.com";

interface MaintenanceData {
  timestamp: string;
  status: string;
  message: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  try {
    const body = await req.text();

    if (!body || body.trim() === "") {
      throw new Error("Request body is empty");
    }

    const { timestamp, status, message }: MaintenanceData = JSON.parse(body);

    if (!timestamp || !status) {
      throw new Error("Missing required fields in maintenance data");
    }

    // Crear contenido HTML del email de mantenimiento
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Notificación de Mantenimiento - Keep Alive</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
              🔧 Servicio de Mantenimiento - Keep Alive
            </h1>

            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <h2 style="margin-top: 0; color: #065f46;">Estado del Servicio:</h2>

              <p><strong>Estado:</strong> ${status}</p>
              <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString("es-ES")}</p>

              ${message ? `<p><strong>Mensaje:</strong> ${message}</p>` : ""}
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Este es un mensaje automático del sistema de mantenimiento de tu portafolio.
              </p>
              <p style="color: #6b7280; font-size: 12px;">
                Servicio ejecutado el: ${new Date().toLocaleString("es-ES")}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email usando Resend con remitente de mantenimiento
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sistema de Mantenimiento <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `🔧 Keep-Alive Ejecutado - ${status}`,
        html: html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: "Failed to send maintenance email",
          details: data,
        }),
        {
          status: res.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "authorization, x-client-info, apikey, content-type",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Maintenance email notification sent successfully",
        data: data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "authorization, x-client-info, apikey, content-type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to send maintenance email notification",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "authorization, x-client-info, apikey, content-type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      }
    );
  }
});
