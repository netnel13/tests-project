import { defineConfig } from "vitest/config";
import WindiCSS from "vite-plugin-windicss";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS()],
  test: {
    globals: true,
    setupFiles: "./src/test/setup.ts",
    environment: "jsdom",
  },
});
