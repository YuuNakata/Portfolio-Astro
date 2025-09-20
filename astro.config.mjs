// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://raydel-portfolio.vercel.app",

  integrations: [react(), tailwind()],

  output: "static",

  server: {
    port: 4321,
    host: true,
  },

  build: {
    assets: "_astro",
  },

  vite: {
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "framer-motion",
        "lucide-react",
        "@supabase/supabase-js",
      ],
    },
  },
});
