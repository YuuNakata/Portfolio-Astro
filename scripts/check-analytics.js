#!/usr/bin/env node

/**
 * Portfolio Analytics Checker (ESM)
 *
 * Script para consultar las estadísticas de visitas del portfolio
 * de forma privada y segura.
 *
 * Uso:
 *   node scripts/check-analytics.js summary
 *   node scripts/check-analytics.js daily
 *   node scripts/check-analytics.js monthly
 *
 * Configurar SECRET_KEY en .env como ANALYTICS_SECRET_KEY
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno desde .env
function loadEnv() {
  try {
    const envPath = join(__dirname, "..", ".env");
    const envFile = readFileSync(envPath, "utf-8");
    const env = {};

    envFile.split("\n").forEach((line) => {
      const match = line.match(/^([^=]+)=(.+)$/);
      if (match) {
        env[match[1].trim()] = match[2].trim();
      }
    });

    return env;
  } catch (error) {
    console.error("⚠️  No se pudo cargar .env, usando valores por defecto");
    return {};
  }
}

const env = loadEnv();

const API_URL = env.PUBLIC_URL || "https://portfolio-ray.is-a.dev";
const SECRET_KEY =
  env.ANALYTICS_SECRET_KEY || "portfolio-ray-analytics-secret-2025";

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
};

function log(message, color = "reset") {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function printHeader(title) {
  console.log("\n" + "=".repeat(60));
  log(title, "bright");
  console.log("=".repeat(60) + "\n");
}

function printSummary(data) {
  printHeader("📊 RESUMEN GENERAL DE ANALYTICS");

  log(
    `📈 Total de visitas: ${COLORS.bright}${data.total}${COLORS.reset}`,
    "green",
  );
  log(
    `👥 Visitantes únicos: ${COLORS.bright}${data.unique_visitors}${COLORS.reset}`,
    "green",
  );

  console.log("\n📅 HOY:");
  log(`  Visitas: ${data.today.visits}`, "cyan");
  log(`  Únicos: ${data.today.unique}`, "cyan");

  console.log("\n📅 ESTA SEMANA:");
  log(`  Visitas: ${data.this_week.visits}`, "cyan");
  log(`  Únicos: ${data.this_week.unique}`, "cyan");

  console.log("\n📅 ESTE MES:");
  log(`  Visitas: ${data.this_month.visits}`, "cyan");
  log(`  Únicos: ${data.this_month.unique}`, "cyan");

  if (data.top_pages && data.top_pages.length > 0) {
    console.log("\n🏆 PÁGINAS MÁS VISITADAS:");
    data.top_pages.slice(0, 5).forEach((page, i) => {
      log(`  ${i + 1}. ${page.page} - ${page.views} visitas`, "yellow");
    });
  }

  if (data.devices) {
    console.log("\n📱 DISPOSITIVOS:");
    Object.entries(data.devices).forEach(([device, count]) => {
      const percentage = ((count / data.total) * 100).toFixed(1);
      log(`  ${device}: ${count} (${percentage}%)`, "blue");
    });
  }

  if (data.browsers) {
    console.log("\n🌐 NAVEGADORES:");
    Object.entries(data.browsers).forEach(([browser, count]) => {
      const percentage = ((count / data.total) * 100).toFixed(1);
      log(`  ${browser}: ${count} (${percentage}%)`, "blue");
    });
  }

  if (data.recent_visits && data.recent_visits.length > 0) {
    console.log("\n🕒 ÚLTIMAS 10 VISITAS:");
    data.recent_visits.slice(0, 10).forEach((visit) => {
      const time = new Date(visit.time).toLocaleString("es-ES");
      log(`  ${time} - ${visit.page} (${visit.device})`, "cyan");
    });
  }

  console.log("\n" + "=".repeat(60) + "\n");
}

function printDaily(data) {
  printHeader("📅 VISITAS DIARIAS (últimos 30 días)");

  if (!data || data.length === 0) {
    log("No hay datos disponibles", "yellow");
    return;
  }

  console.log("Fecha       | Visitas | Únicos");
  console.log("------------|---------|--------");

  data.forEach((day) => {
    const date = day.date.padEnd(11);
    const visits = String(day.visits).padEnd(8);
    const unique = String(day.unique_visitors);
    console.log(`${date}| ${visits}| ${unique}`);
  });

  const totalVisits = data.reduce((sum, day) => sum + day.visits, 0);
  const avgVisits = (totalVisits / data.length).toFixed(1);

  console.log("\n" + "-".repeat(60));
  log(`Total: ${totalVisits} visitas`, "green");
  log(`Promedio: ${avgVisits} visitas/día`, "green");
  console.log("=".repeat(60) + "\n");
}

function printMonthly(data) {
  printHeader("📆 VISITAS MENSUALES (último año)");

  if (!data || data.length === 0) {
    log("No hay datos disponibles", "yellow");
    return;
  }

  console.log("Mes     | Visitas | Únicos");
  console.log("--------|---------|--------");

  data.forEach((month) => {
    const monthStr = month.month.padEnd(8);
    const visits = String(month.visits).padEnd(8);
    const unique = String(month.unique_visitors);
    console.log(`${monthStr}| ${visits}| ${unique}`);
  });

  const totalVisits = data.reduce((sum, month) => sum + month.visits, 0);
  const avgVisits = (totalVisits / data.length).toFixed(1);

  console.log("\n" + "-".repeat(60));
  log(`Total: ${totalVisits} visitas`, "green");
  log(`Promedio: ${avgVisits} visitas/mes`, "green");
  console.log("=".repeat(60) + "\n");
}

async function fetchAnalytics(action, params = {}) {
  const url = `${API_URL}/api/analytics`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        secretKey: SECRET_KEY,
        ...params,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return await response.json();
  } catch (error) {
    log(`❌ Error: ${error.message}`, "red");
    console.error(error);
    process.exit(1);
  }
}

async function main() {
  const action = process.argv[2] || "summary";

  log(`🌐 Consultando: ${API_URL}`, "cyan");
  log(`🔍 Cargando analytics...\n`, "cyan");

  switch (action) {
    case "summary":
    case "s":
      const summary = await fetchAnalytics("summary");
      printSummary(summary);
      break;

    case "daily":
    case "d":
      const days = parseInt(process.argv[3]) || 30;
      const daily = await fetchAnalytics("daily", { daysBack: days });
      printDaily(daily);
      break;

    case "monthly":
    case "m":
      const months = parseInt(process.argv[3]) || 12;
      const monthly = await fetchAnalytics("monthly", { monthsBack: months });
      printMonthly(monthly);
      break;

    case "help":
    case "h":
      printHeader("📖 AYUDA - PORTFOLIO ANALYTICS");
      console.log("Comandos disponibles:\n");
      console.log("  summary, s           - Resumen general (por defecto)");
      console.log(
        "  daily, d [días]      - Visitas diarias (default: 30 días)",
      );
      console.log(
        "  monthly, m [meses]   - Visitas mensuales (default: 12 meses)",
      );
      console.log("  help, h              - Muestra esta ayuda\n");
      console.log("Ejemplos:");
      console.log("  node scripts/check-analytics.js");
      console.log("  node scripts/check-analytics.js daily");
      console.log("  node scripts/check-analytics.js daily 7");
      console.log("  node scripts/check-analytics.js monthly 6\n");
      console.log("Configuración:");
      console.log(`  URL: ${API_URL}`);
      console.log(
        `  Secret Key: ${SECRET_KEY ? "***configurada***" : "⚠️  NO CONFIGURADA"}\n`,
      );
      console.log("Variables de entorno en .env:");
      console.log("  PUBLIC_URL               - URL de tu portfolio");
      console.log("  ANALYTICS_SECRET_KEY     - Clave secreta para acceder\n");
      break;

    default:
      log(`❌ Comando desconocido: ${action}`, "red");
      log('Usa "help" para ver los comandos disponibles', "yellow");
      process.exit(1);
  }
}

// Run
main().catch(console.error);
