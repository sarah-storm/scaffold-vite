import { globSync } from "glob";
import { defineConfig } from "vite";
import base from "../base";
import path from 'path';
import fs from "fs";

export default defineConfig(({ command }) => {
	return {
		...base,
		root: path.join(process.cwd(), "./tools/vite/config/integration/entry"),
		build: {
			outDir: path.join(process.cwd(), "../integration-output"),
			emptyOutDir: true,
			rollupOptions: {
				output: {
				  manualChunks: (id) => {
					if (id.includes('appinsights') || id.includes('applicationinsights')) {
						return 'appinsights';
					}
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
						fs.unlink("../integration-output/index.html", (err) => {
							if (err) throw err;
							else console.log("Entry index file cleanup complete")
						});
					}
				},
			},
		],
	};
});
