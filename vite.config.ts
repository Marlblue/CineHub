/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
    },
    server: {
      proxy: {
        "/api/tmdb": {
          target: "https://api.themoviedb.org/3",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tmdb/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              const url = new URL(proxyReq.path, "https://api.themoviedb.org");
              url.searchParams.append("api_key", env.VITE_TMDB_API_KEY);
              proxyReq.path = url.pathname + url.search;
            });
          },
        },
      },
    },
  };
});
