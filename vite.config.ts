import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Local dev server: only reachable from this computer (not your Wi-Fi network)
  server: {
    host: "localhost",
    port: 4001,
    strictPort: true,
  },
  preview: {
    host: "localhost",
    port: 4001,
    strictPort: true,
  },

  build: {
    target: "es2020",
    sourcemap: false, // don't publish source code maps
    chunkSizeWarningLimit: 900, // the 3D engine is a lazy-loaded chunk
  },
});
