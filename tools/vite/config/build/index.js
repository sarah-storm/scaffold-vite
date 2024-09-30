import { globSync } from 'glob';
import { defineConfig } from 'vite';
import base from '../base';
import path from 'path';

export default defineConfig({
    ...base,
    build: {
        outDir: path.join(process.cwd(), "build"),
        emptyOutDir: true,
        rollupOptions: {
            input: Object.fromEntries(globSync("**/src/templates/pages/**/*.html").map((file) => {
                return [
                path.relative(
                    'src/templates/pages',
                    file.slice(0, file.length - path.extname(file).length)
                ),
                path.join(process.cwd(), file)
            ]})),
        },
    },
});
