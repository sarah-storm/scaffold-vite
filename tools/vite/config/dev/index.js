import { defineConfig } from "vite";
import { generateHtml, devCleanup } from "../../plugins";
import path from 'path';
import paths from "../../../../paths.config.js";
import preact from "@preact/preset-vite";
import base from "../base"
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
    ...base,
    plugins: [
        preact(),
        generateHtml(),
        devCleanup()
    ],
    build: {
        outDir: path.join(process.cwd(), paths.output),
        emptyOutDir: true,    
    },
    server: {
        host: 'localhost',
        port: '8081',
        open: true,
    }
});
