import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), paths()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "@app",
        replacement: path.resolve(__dirname, "./src/app"),
      },
    ],
  },
});
