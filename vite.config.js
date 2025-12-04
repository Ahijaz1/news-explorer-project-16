import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/news-explorer-project-16/",
  plugins: [react()],
  server: {
    open: true,
  },
});
