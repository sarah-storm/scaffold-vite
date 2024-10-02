import fs from 'fs';
import path from 'path';
import paths from '../../../paths.config';
import { HTMLTemplate, JSTemplate } from '../templates';

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

const generateFiles = (originalFilePath, originalFileName, outputPath) => {
    const HTMLContent = HTMLTemplate(originalFileName);
    const JSContent = JSTemplate(originalFilePath);

    const directory = path.dirname(outputPath);
    if(!fs.existsSync(directory)) fs.mkdirSync(directory, {recursive: true});

    fs.writeFileSync(outputPath+".html", HTMLContent);
    fs.writeFileSync(outputPath+".js", JSContent);


}

export const generateHtml = () => {
    return {
        name: 'vite-generate-html',
        config: (config, {command}) => {
            const entryPoints = {};
            const jsFiles = findfiles(path.join(process.cwd(), paths.src.pages), 'js');

            jsFiles.forEach((file) => {
                const fileName = path.basename(file, path.extname(file));
                const entryPath = path.join(path.relative(path.join(process.cwd(), paths.src.pages), path.dirname(file)), path.basename(file, path.extname(file))).replace("\\", "/");

                const htmlPath = path.join(process.cwd(), "/.temp", path.join(path.relative(path.join(process.cwd(), paths.src.pages), path.dirname(file))), `${fileName}`);

                generateFiles(entryPath+path.extname(file), fileName, htmlPath);
                entryPoints[entryPath] = htmlPath+".html";
            });    
                                            
            return {
                root: path.join(process.cwd(), "/.temp"),
                build: {
                    rollupOptions: {
                        input: entryPoints
                    }
                }
            }
        },
        buildEnd: () => {
            //fs.rmSync(path.join(process.cwd(), "/.temp"), { recursive: true, force: true });
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