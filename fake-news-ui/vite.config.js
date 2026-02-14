import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",                 // ✅ custom domain root
  build: {
    outDir: "../docs",       // ✅ output for GitHub Pages
    emptyOutDir: true
  }
});
