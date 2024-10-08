import { HTMLTemplate, JSTemplate } from '../templates';
import fs from 'fs';
import path from 'path';

const getTitle = (markup) => {
    const titleRegex = /(?:^|[\s\S]*?)(?!\/\/)\s*export\s+const\s+title\s*=\s*['"]([^'"]+)['"]\s*;/;
    let title = "";

    const titleMatch = titleRegex.exec(markup);
    if (titleMatch) {
        title = titleMatch[1]; 
    } 

    return title;
}

const getMeta = (markup) => {
    const metaRegex = /^(?!\/\/)\s*export\s+const\s+meta\s*=\s*\[\s*((?:{\s*name:\s*['"]([^'"]+)['"],\s*content:\s*['"]([^'"]*)['"]\s*}\s*(?:,\s*)?)+)\];/gm;

    const match = metaRegex.exec(markup);
    const metaArray = [];

    if (match) {
        const innerRegex = /{\s*name:\s*['"]([^'"]+)['"],\s*content:\s*['"]([^'"]*)['"]\s*}/g;
        let innerMatch;

        while ((innerMatch = innerRegex.exec(match[1])) !== null) {
            metaArray.push({
                name: innerMatch[1],
                content: innerMatch[2],
            });
        }
    } 

    return metaArray;
}

export const findfiles = (dir, ext, fileList=[]) => {
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

export const generateFiles = async (fullFilePath, relativeFilePath, originalFileName, outputPath) => {

    const markup = fs.readFileSync(fullFilePath, 'utf8');
    const title = getTitle(markup);
    const meta = getMeta(markup);
    
    const HTMLContent = HTMLTemplate(originalFileName, title, meta);
    const JSContent = JSTemplate(relativeFilePath);

    const directory = path.dirname(outputPath);
    if(!fs.existsSync(directory)) fs.mkdirSync(directory, {recursive: true});

    fs.writeFileSync(outputPath+".html", HTMLContent);
    fs.writeFileSync(outputPath+".js", JSContent);
}