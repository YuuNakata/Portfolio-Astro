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
    inlineStylesheets: "auto",
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
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "motion-vendor": ["framer-motion"],
            "icons-vendor": ["lucide-react", "react-icons"],
          },
        },
      },
    },
  },

  compressHTML: true,
  scopedStyleStrategy: "where",
});
