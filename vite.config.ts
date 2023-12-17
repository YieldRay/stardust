import { defineConfig } from "vite";
import { minifyTemplateLiterals } from "rollup-plugin-minify-template-literals";

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
            // external: /^lit/
            plugins: [minifyTemplateLiterals()],
        },
    },
});
