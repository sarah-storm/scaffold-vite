import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from 'path';
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
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
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
	resolve: {
		alias: {
			"@templates": path.join(process.cwd(), "src/templates/"),
			"@layouts": path.join(process.cwd(), "src/templates/layouts"),
			"@components": path.join(process.cwd(), "src/templates/components"),
      "@css": path.join(process.cwd(), "src/css"),
		},
	},
  plugins: [preact()],
});
