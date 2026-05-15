import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  let outDir = "build";

  if (env.VITE_APP_TYPE === "BETZONE") {
    outDir = "build/build-betzone";
  } else if (env.VITE_APP_TYPE === "PAYMENT") {
    outDir = "build/build-payment";
  }

  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
    },
    build: {
      outDir,
    },
  };
});
