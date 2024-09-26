import { globSync } from 'glob';
import { defineConfig } from 'vite';
import base from '../base';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    ...base,
    root: path.join(process.cwd(), ""),
    build: {
        rollupOptions: {
            input: Object.fromEntries(globSync("**/src/templates/pages/**/*.html").map((file) => {
                console.log(file)
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
