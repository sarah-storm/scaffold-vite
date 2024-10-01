import preact from "@preact/preset-vite";
import path from 'path';
import paths from "../../../../paths.config.js";

export default {
    resolve: {
        alias: {
            "@javascript":path.join(process.cwd(), paths.src.js),
            "@layouts": path.join(process.cwd(), paths.src.layouts),
            "@components": path.join(process.cwd(), paths.src.components),
            "@css": path.join(process.cwd(), paths.src.css),
        },
    },
    appType: 'mpa',
    root: path.join(process.cwd(), paths.src.pages),
    publicDir: path.join(process.cwd(), paths.src.assets),
    esbuild: {
      loader: 'jsx',
      include: /.*\.jsx?$/,
      exclude: []
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    plugins: [preact()]
  }