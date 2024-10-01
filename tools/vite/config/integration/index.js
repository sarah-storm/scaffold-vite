import { globSync } from "glob";
import { defineConfig } from "vite";
import base from "../base";
import path from 'path';
import paths from "../../../../paths.config.js";
import fs from "fs";

export default defineConfig(({ command }) => {
	return {
		...base,
		root: path.join(process.cwd(), "./tools/vite/config/integration/entry"),
		build: {
			outDir: path.join(process.cwd(), paths.integrationOutput),
			emptyOutDir: true,
			rollupOptions: {
				output: {
				  manualChunks: (id) => {
					if (id.includes('appinsights') || id.includes('applicationinsights')) {
						return 'appinsights';
					}
				  },
				  assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split('.').at(1);
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
					  extType = 'img';
					}
					return `${extType}/[name][extname]`;
				  },
				  chunkFileNames: 'js/[name].js',		  
				  entryFileNames: 'js/[name].js',
				}
			  },
		},
		plugins: [
			{
				name: "ci-cleanup",
				writeBundle() {
					if (command === "build") {
						fs.unlink(`${paths.integrationOutput}/index.html`, (err) => {
							if (err) throw err;
							else console.log("Entry index file cleanup complete")
						});
					}
				},
			},
		],
	};
});
