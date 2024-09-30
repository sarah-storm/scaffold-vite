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
				  assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split('.').at(1);
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
					  extType = 'img';
					}
					if (/woff|woff2|ttf|otf/i.test(extType)) {
						extType = 'fonts';
					  }
					return `${extType}/[name][extname]`;
				  },				  
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
