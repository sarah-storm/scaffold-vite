import { HTMLTemplate, JSTemplate } from '../templates';
import fs from 'fs';
import path from 'path';

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

export const generateFiles = (originalFilePath, originalFileName, outputPath) => {
    const HTMLContent = HTMLTemplate(originalFileName);
    const JSContent = JSTemplate(originalFilePath);

    const directory = path.dirname(outputPath);
    if(!fs.existsSync(directory)) fs.mkdirSync(directory, {recursive: true});

    fs.writeFileSync(outputPath+".html", HTMLContent);
    fs.writeFileSync(outputPath+".js", JSContent);
}