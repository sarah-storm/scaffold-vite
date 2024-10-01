import { defineConfig } from 'vite';
import { generateHtml } from "../../plugins";
import preact from "@preact/preset-vite";
import base from '../base';
import path from 'path';
import paths from "../../../../paths.config.js";

export default defineConfig({
    ...base,
    plugins: [
        preact(),
        generateHtml()
    ],
    build: {
        outDir: path.join(process.cwd(), paths.output),
        emptyOutDir: true,    
    }
});
