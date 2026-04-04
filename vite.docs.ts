import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { resolve } from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "./",
  build: {
    outDir: resolve(__dirname, "docs-dist"),
    emptyOutDir: true,
  },
});
