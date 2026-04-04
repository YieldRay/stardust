import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/stardust.ts",
            formats: ["es"],
        },
        minify: "oxc",
        target: "esnext",
    },
});
