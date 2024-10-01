import fs from 'fs';
import path from 'path';
import paths from '../../../paths.config'

const findJsx = (dir, fileList=[]) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if(stat.isDirectory()) {
            findJsx(filePath, fileList)
        } else if(file.endsWith('.jsx')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

const generateHtmlFile = (originalFilePath, outputPath) => {
    const HTMLContent = `<!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/img/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${path.basename(originalFilePath)}</title>
        </head>
        <body>
            <script type="module" src="${originalFilePath.replace(paths.src.pages), '/'}"></script>
        </body>
        </html>
    `;

    const directory = path.dirname(outputPath);
    if(!fs.expistsSync(directory)) fs.mkdirSync(directory, {recursive: true});

    fs.writeFileSync(outputPath, HTMLContent);
}

export const generateHtml = () => {
    console.log('generating');
    return {
        name: 'vite-generate-html',
        config: (config, {command}) => {
            console.log(command)
            if(command === 'build') {
                const entryPoints = {};
                const jsxFiles = findJsx(path.join(process.cwd(), paths.src.pages));

                jsxFiles.forEach((file) => {
                    const fileName = path.basename(file, path.extname(file));
                    const htmlPath = path.join(paths.output, `${fileName}.html`);
                    generateHtmlFile(file, htmlPath);
                    entryPoints[htmlPath] = path.resolve(file)
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
        }
    }
}