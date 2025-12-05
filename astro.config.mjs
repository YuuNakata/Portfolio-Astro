// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://portfolio-ray.is-a.dev", // Corrected to match deployment
  compressHTML: true,
  prefetch: true,
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap(), icon()],
});
