import { defineConfig } from "vite";
import { generateHtml } from "../../utils";
import preact from "@preact/preset-vite";
import base from "../base"
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
    ...base,
    plugins: [
        preact(),
        generateHtml()
    ],
    server: {
        host: 'localhost',
        port: '8081',
        open: true,
    }
});
