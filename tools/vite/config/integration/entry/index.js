import { render } from 'preact'

import '@css/index.scss';
import '@javascript/index.js';
import '@javascript/appinsights/index.js';

const entry = () => <div></div>;

render(entry(), document.body)