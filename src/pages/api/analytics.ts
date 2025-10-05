import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

// Force this endpoint to be server-rendered (not pre-rendered)
export const prerender = false;

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || "";
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "";

// Only create client if variables are available (skip during build)
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const POST: APIRoute = async ({ request }) => {
  // Check if Supabase is configured
  if (!supabase) {
    console.error("Supabase not configured. Check environment variables:");
    console.error("PUBLIC_SUPABASE_URL:", supabaseUrl ? "✓" : "✗");
    console.error("SUPABASE_SERVICE_ROLE_KEY:", supabaseKey ? "✓" : "✗");

    return new Response(
      JSON.stringify({
        error: "Analytics service not configured",
        details: "Missing Supabase environment variables",
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const body = await request.json();
    const { action, secretKey } = body;

    // Handle tracking visits (no secret key required)
    if (!action || action === "track") {
      const {
        page_path,
        referrer,
        user_agent,
        device_type,
        browser,
        os,
        session_id,
        ip_hash,
      } = body;

      // Insert visit data
      const visitData = {
        page_path: page_path || "/",
        referrer: referrer || null,
        user_agent: user_agent || null,
        device_type: device_type || null,
        browser: browser || null,
        os: os || null,
        session_id: session_id || null,
        ip_hash: ip_hash || null,
      };

      const { error } = await supabase
        .from("analytics_visits")
        .insert([visitData]);

      if (error) {
        console.error("Error inserting visit:", error);
        throw error;
      }

      return new Response(
        JSON.stringify({ success: true, message: "Visit tracked" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // For query actions, verify secret key
    const expectedSecret =
      import.meta.env.ANALYTICS_SECRET_KEY || "portfolio-analytics-secret-2024";

    if (secretKey !== expectedSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let result;

    switch (action) {
      case "summary": {
        // Get overall summary
        const { data, error } = await supabase.rpc("get_analytics_summary", {
          secret_key: secretKey,
        });

        if (error) {
          console.error("Error getting summary:", error);
          throw error;
        }
        result = data;
        break;
      }

      case "daily": {
        // Get daily breakdown
        const daysBack = body.daysBack || 30;
        const { data, error } = await supabase.rpc("get_analytics_daily", {
          secret_key: secretKey,
          days_back: daysBack,
        });

        if (error) {
          console.error("Error getting daily analytics:", error);
          throw error;
        }
        result = data;
        break;
      }

      case "monthly": {
        // Get monthly breakdown
        const monthsBack = body.monthsBack || 12;
        const { data, error } = await supabase.rpc("get_analytics_monthly", {
          secret_key: secretKey,
          months_back: monthsBack,
        });

        if (error) {
          console.error("Error getting monthly analytics:", error);
          throw error;
        }
        result = data;
        break;
      }

      case "custom": {
        // Custom query with date range
        const { startDate, endDate } = body;

        let query = supabase
          .from("analytics_visits")
          .select("*", { count: "exact" });

        if (startDate) {
          query = query.gte("visited_at", startDate);
        }
        if (endDate) {
          query = query.lte("visited_at", endDate);
        }

        const { data, error, count } = await query;

        if (error) {
          console.error("Error in custom query:", error);
          throw error;
        }

        result = {
          total: count,
          visits: data,
        };
        break;
      }

      default:
        return new Response(
          JSON.stringify({
            error:
              "Invalid action. Use: track, summary, daily, monthly, or custom",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
