import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vite config: React and Tailwind
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
