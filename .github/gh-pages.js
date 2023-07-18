import { readFileSync, writeFileSync, cpSync } from "node:fs";

cpSync("./dist", "./out/dist/", { recursive: true });

writeFileSync(
    "./out/index.html",
    readFileSync("./index.html", "utf8").replace(
        `<script type="module" src="/src/stardust.ts"></script>`,
        `<script type="module" src="./dist/stardust.js"></script><link rel="stylesheet" href="./dist/style.css" />`
    )
);
