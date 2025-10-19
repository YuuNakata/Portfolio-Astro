import { createClient } from "@supabase/supabase-js";
import type { APIRoute } from "astro";

// Force this endpoint to be server-rendered (not pre-rendered)
export const prerender = false;

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || "";
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "";

// Only create client if variables are available (skip during build)
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

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

    return new Response(
      JSON.stringify({
        success: true,
        message: "Supabase service kept alive",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Keep-alive endpoint error:", error);
    // Return success to prevent cron failure
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error occurred but cron continues",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
