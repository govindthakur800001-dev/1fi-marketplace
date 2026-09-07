import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard Vite + React setup. No extra build tooling — kept close to
// what a small/medium product team would already have wired up.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
