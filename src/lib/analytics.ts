import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Generate a session ID for the user
function getSessionId(): string {
  const storageKey = "portfolio_session_id";
  let sessionId = sessionStorage.getItem(storageKey);

  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(storageKey, sessionId);
  }

  return sessionId;
}

// Hash IP for privacy (simple client-side hash)
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Detect device type
function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    return "mobile";
  }
  return "desktop";
}

// Detect browser
function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return "Unknown";
}

// Detect OS
function getOS(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "MacOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad"))
    return "iOS";
  return "Unknown";
}

// Track page visit
export async function trackPageVisit(pagePath?: string): Promise<void> {
  if (!supabase) {
    console.warn("Analytics: Supabase not configured");
    return;
  }

  try {
    const sessionId = getSessionId();
    const currentPath = pagePath || window.location.pathname;
    const referrer = document.referrer || null;

    // Simple IP hash (in production, get from server)
    const ipHash = await hashString(
      navigator.userAgent + sessionId.split("-")[0],
    );

    const visitData = {
      page_path: currentPath,
      referrer: referrer || null,
      user_agent: navigator.userAgent || null,
      device_type: getDeviceType() || null,
      browser: getBrowser() || null,
      os: getOS() || null,
      session_id: sessionId,
      ip_hash: ipHash,
    };

    const { error } = await supabase
      .from("analytics_visits")
      .insert([visitData] as any);

    if (error) {
      console.error("Analytics tracking error:", error);
    }
  } catch (error) {
    console.error("Analytics tracking failed:", error);
  }
}

// Auto-track on page load
export function initAnalytics(): void {
  if (typeof window === "undefined") return;

  // Track initial page load
  if (document.readyState === "complete") {
    trackPageVisit();
  } else {
    window.addEventListener("load", () => trackPageVisit());
  }

  // Track navigation changes (for SPAs)
  let lastPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== lastPath) {
      lastPath = currentPath;
      trackPageVisit(currentPath);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Hook for React components
export function useAnalytics() {
  return {
    trackVisit: trackPageVisit,
  };
}
