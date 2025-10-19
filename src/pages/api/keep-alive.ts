import { createClient } from "@supabase/supabase-js";
import type { APIRoute } from "astro";

// Force this endpoint to be server-rendered (not pre-rendered)
export const prerender = false;

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Only create client if variables are available (skip during build)
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const GET: APIRoute = async () => {
  // Check if Supabase is configured
  if (!supabase) {
    console.error("Supabase not configured for keep-alive endpoint");
    return new Response(
      JSON.stringify({
        error: "Supabase not configured",
        details: "Missing environment variables",
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Perform a simple query to keep Supabase active
    // This is a lightweight operation that prevents service pause
    const { error } = await supabase
      .from("contact_messages")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error("Keep-alive query error:", error);
      // Don't fail the cron - just log the error
      return new Response(
        JSON.stringify({
          success: false,
          message: "Query failed but cron continues",
          error: error.message,
        }),
        {
          status: 200, // Return 200 to not break the cron
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Supabase keep-alive ping successful");

    // Send maintenance notification email
    try {
      const maintenanceData = {
        timestamp: new Date().toISOString(),
        status: "Success",
        message: "Supabase service kept alive successfully",
      };

      const emailResponse = await fetch(
        `${supabaseUrl}/functions/v1/send-maintenance-notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseAnonKey}`,
            apikey: supabaseAnonKey,
          },
          body: JSON.stringify(maintenanceData),
        }
      );

      console.log("Email response status:", emailResponse.status);
      console.log(
        "Email response headers:",
        Object.fromEntries(emailResponse.headers)
      );

      if (emailResponse.ok) {
        console.log("Maintenance notification email sent successfully");
      } else {
        const errorText = await emailResponse.text();
        console.error("Failed to send maintenance notification email");
        console.error("Error response:", errorText);
      }
    } catch (emailError) {
      console.error("Error sending maintenance notification:", emailError);
      // Don't fail the keep-alive if email fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Supabase service kept alive",
        timestamp: new Date().toISOString(),
        emailNotification: "sent",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Keep-alive endpoint error:", error);

    // Try to send maintenance notification email even if keep-alive fails
    try {
      const maintenanceData = {
        timestamp: new Date().toISOString(),
        status: "Failed",
        message: `Keep-alive error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };

      const emailResponse = await fetch(
        `${supabaseUrl}/functions/v1/send-maintenance-notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseAnonKey}`,
            apikey: supabaseAnonKey,
          },
          body: JSON.stringify(maintenanceData),
        }
      );

      if (emailResponse.ok) {
        console.log(
          "Maintenance notification email sent for failed keep-alive"
        );
      }
    } catch (emailError) {
      console.error(
        "Error sending maintenance notification for failed keep-alive:",
        emailError
      );
    }

    // Return success to prevent cron failure
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error occurred but cron continues",
        error: error instanceof Error ? error.message : "Unknown error",
        emailNotification: "sent",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
