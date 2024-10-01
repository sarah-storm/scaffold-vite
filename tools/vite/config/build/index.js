import { defineConfig } from 'vite';
import { generateHtml } from "../../utils";
import preact from "@preact/preset-vite";
import base from '../base';
import path from 'path';
import paths from "../../../../paths.config.js";

export default defineConfig({
    ...base,
    root: path.join(process.cwd(), "./tools/vite/config/build/entry"),
    build: {
        outDir: path.join(process.cwd(), paths.output),
        emptyOutDir: true,
        plugins: [
            preact(),
            generateHtml()
        ]
    },
});
