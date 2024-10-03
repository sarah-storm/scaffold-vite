const source = 'src';
const output = 'build';
const integrationOutput = '../integration-output/static';
const baseJS = '@javascript/index.js';
const baseSCSS = '@css/index.scss';

const src = {
    img: `${source}/img`,
    layouts: `${source}/templates/layouts`,
    pages: `${source}/templates/pages`,
    components: `${source}/templates/components`,
    js: `${source}/js`,
    css: `${source}/css`,
    assets: `${source}/assets`
};

export default {
    output,
    src,
    integrationOutput,
    baseJS,
    baseSCSS
};
