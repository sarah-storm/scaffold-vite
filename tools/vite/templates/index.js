import paths from '../../../paths.config';

export const HTMLTemplate = (fileName, title, meta) => {
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/img/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${meta && meta.map(item => {
        if (item.name) return `<meta name="${item.name}" content="${item.content}" />`;
        if (item.property) return `<meta property="${item.property}" content="${item.content}" />`;
    })}
    <title>${title}</title>
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
    import '${paths.baseSCSS}';

    const pageScript = await import("@pages/${filePath}");
    const Component = pageScript.default;
    const title = pageScript.title ;

    const TempComponent = () => { 
        useEffect(() => {
            InitJS();
        });
        if(Component) return <Component />;
    }

    render(<TempComponent />, document.body);
 
`;
}