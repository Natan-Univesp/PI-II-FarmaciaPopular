import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   build: {
      // Otimizações para reduzir memória
      minify: "esbuild",
      target: "esnext",

      // Divide os chunks para evitar arquivos muito grandes
      rollupOptions: {
         output: {
            manualChunks: (id) => {
               if (id.includes("node_modules")) {
                  if (id.includes("react")) return "vendor-react";
                  if (id.includes("react-icons")) return "vendor-icons";
                  return "vendor";
               }
            },
         },
      },
   },
});
