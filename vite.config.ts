import { defineConfig } from "vite";
import _minifyHTML from "rollup-plugin-minify-html-literals";
//@ts-ignore
const minifyHTML = _minifyHTML.default;

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
            plugins: [minifyHTML()],
        },
    },
});
