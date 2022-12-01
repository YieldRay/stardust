import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: "src/stardust.ts",
            formats: ["es"],
        },
        minify: "esbuild",
        target: "esnext",
        rollupOptions: {
            // external: /^lit/,
        },
    },
});
