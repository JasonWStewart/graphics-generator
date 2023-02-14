import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: path.join(__dirname, "..", "build"),
    emptyOutDir: true,
  },
  plugins: [react()],
});
