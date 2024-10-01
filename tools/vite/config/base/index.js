import preact from "@preact/preset-vite";
import path from 'path';

export default {
    resolve: {
        alias: {
            "@javascript":path.join(process.cwd(), "src/js/"),
            "@templates": path.join(process.cwd(), "src/templates/"),
            "@layouts": path.join(process.cwd(), "src/templates/layouts"),
            "@components": path.join(process.cwd(), "src/templates/components"),
            "@css": path.join(process.cwd(), "src/css"),
        },
    },
    appType: 'mpa',
    root: path.join(process.cwd(), "src/templates/pages"),
    publicDir: path.join(process.cwd(), "src/assets"),
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