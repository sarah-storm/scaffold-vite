import { globSync } from 'glob';
import { defineConfig } from 'vite';
import base from '../base';
import path from 'path';
import paths from "../../../../paths.config.js";

export default defineConfig({
    ...base,
    build: {
        outDir: path.join(process.cwd(), paths.output),
        emptyOutDir: true,
        rollupOptions: {
            input: Object.fromEntries(globSync(`**/${paths.src.pages}/**/*.html`).map((file) => {
                return [
                path.relative(
                    paths.src.pages,
                    file.slice(0, file.length - path.extname(file).length)
                ),
                path.join(process.cwd(), file)
            ]})),
        },
    },
});
