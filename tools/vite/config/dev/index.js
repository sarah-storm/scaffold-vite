import { defineConfig } from "vite";
import base from "../base"
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
    ...base,
    server: {
        host: 'localhost',
        port: '8081',
        open: true,
    }
});
