import paths from '../../../paths.config';

export const HTMLTemplate = (fileName) => {
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/img/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>fileName</title>
</head>
<body>
    <script type="module" src="./${fileName}.js"></script>
</body>
</html>
    `
}

export const JSTemplate = (filePath) => {
    return `
    import {render} from 'preact'
    import { useEffect } from 'preact/hooks';
    import InitJS from '${paths.baseJS}';
    import '${paths.baseSCSS}'
    import Component from "@pages/${filePath}";

    const TempComponent = () => {
        
        useEffect(() => {
            InitJS();
        });
    
        return <Component />;
    }
    render(<TempComponent />, document.body);
`;
}