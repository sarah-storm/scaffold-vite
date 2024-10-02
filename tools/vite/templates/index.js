import path from 'path';
import paths from '../../../paths.config';

export const HTMLTemplate = (filePath) => {
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/img/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${path.basename(filePath)}</title>
</head>
<body>
    <script type="module" src="${filePath}"></script>
</body>
</html>
    `
}