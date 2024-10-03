import fs from 'fs';
import path from 'path';
import paths from '../../../paths.config';
import { findfiles, generateFiles } from '../utilities';

const tempFolder = "/.temp";

export const generateHtml = () => {
    return {
        name: 'vite-generate-html',
        config: (config, {command}) => {
            const entryPoints = {};
            const jsFiles = findfiles(path.join(process.cwd(), paths.src.pages), 'js');

            jsFiles.forEach((file) => {
                const fileName = path.basename(file, path.extname(file));

                const entryPath = path.join(path.relative(path.join(process.cwd(), paths.src.pages), path.dirname(file)), path.basename(file, path.extname(file))).replace("\\", "/");

                const htmlPath = path.join(process.cwd(), tempFolder, path.join(path.relative(path.join(process.cwd(), paths.src.pages), path.dirname(file))), `${fileName}`);

                generateFiles(file, entryPath+path.extname(file), fileName, htmlPath);
                entryPoints[entryPath] = htmlPath+".html";
            });    
                                            
            return {
                root: path.join(process.cwd(), tempFolder),
                build: {
                    rollupOptions: {
                        input: entryPoints
                    }
                }
            }
        },
        
    }
}

export const devCleanup = () => {
    return {
        name: 'vite-dev-cleanup',
        config: (config, {command}) => {
            process.stdin.resume(); 
        
            function exitHandler(options, exitCode) {
                fs.rmSync(path.join(process.cwd(), tempFolder), { recursive: true, force: true });
                process.exit();
            }
            process.on('exit', exitHandler);
            process.on('SIGINT', exitHandler);
            process.on('SIGUSR1', exitHandler);
            process.on('SIGUSR2', exitHandler);
            process.on('uncaughtException', exitHandler);
        }
    }
}

export const buildCleanup = () => {
    return {
        name: 'vite-build-cleanup',
        buildEnd: () => {
            fs.rmSync(path.join(process.cwd(), tempFolder), { recursive: true, force: true });
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