import path from 'path';

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
    <script type="module" src="./${path.basename(filePath)}"></script>
</body>
</html>
    `
}