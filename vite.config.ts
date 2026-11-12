import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  // Destino do proxy em desenvolvimento: a API publicada (padrão) ou uma local (ex.: http://localhost:8080).
  const alvoApi = env.VITE_API_URL || "https://hug-gs.onrender.com";

  return {
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true,
      // O navegador chama /hug/... no próprio front e o Vite repassa para a API.
      proxy: {
        "/hug": {
          target: alvoApi,
          changeOrigin: true,
        },
      },
    },
  };
});
