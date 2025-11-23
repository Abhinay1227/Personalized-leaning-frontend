// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // allows VITE_* in proxy target if desired
  const target = env.VITE_API_BASE_URL || "http://localhost:8000";

  return {
    plugins: [react(), svgr()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target,
          changeOrigin: true,
          secure: false,
          // If Django expects /api prefix, do NOT rewrite.
          // If Django is mounted at root without /api, uncomment:
          // rewrite: (p) => p.replace(/^\/api/, ""),
        },
      },
    },
  };
});
