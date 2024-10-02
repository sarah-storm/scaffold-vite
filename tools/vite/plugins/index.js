import fs from 'fs';
import path from 'path';
import paths from '../../../paths.config';
import { HTMLTemplate } from '../templates';

const findfiles = (dir, ext, fileList=[]) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if(stat.isDirectory()) {
            findfiles(filePath, ext, fileList)
        } else if(file.endsWith('.'+ext)) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

const generateHtmlFile = (originalFilePath, outputPath) => {
    const HTMLContent = HTMLTemplate(originalFilePath);

    const directory = path.dirname(outputPath);
    if(!fs.existsSync(directory)) fs.mkdirSync(directory, {recursive: true});

    fs.writeFileSync(outputPath, HTMLContent);
}

export const generateHtml = () => {
    return {
        name: 'vite-generate-html',
        config: (config, {command}) => {
            if(command === 'build') {
                const entryPoints = {};
                const jsxFiles = findfiles(path.join(process.cwd(), paths.src.pages), 'jsx');

                jsxFiles.forEach((file) => {
                    const fileName = path.basename(file, path.extname(file));
                    const htmlPath = path.join(path.dirname(file), `${fileName}.html`);
                    generateHtmlFile(file, htmlPath);
                    const entryPath = path.join(path.relative(path.join(process.cwd(), paths.src.pages), path.dirname(file)), path.basename(file, path.extname(file))).replace("\\", "/");
                    entryPoints[entryPath] = htmlPath;
                });       
                        
                return {
                    root: path.join(process.cwd(), paths.src.pages),
                    build: {
                        rollupOptions: {
                            input: entryPoints
                        }
                    }
                }
            }
        },
        buildEnd: () => {
            const htmlFiles = findfiles(path.join(process.cwd(), paths.src.pages), 'html');
            htmlFiles.forEach((file) => {
                fs.unlink(file, (err) => {
                    if (err) throw err;
                });
            });
        }
    }
}

export const ciCleanup = () => {
    return {
        name: "ci-cleanup",
        writeBundle() {
            fs.unlink(`${paths.integrationOutput}/index.html`, (err) => {
                if (err) throw err;
                else console.log("Entry index file cleanup complete")
            });  
        }
    }
}