import {render} from 'preact'
import { useEffect } from 'preact/hooks';

import DefaultLayout from '@layouts/default';
import InitJS from '@javascript/index.js';
import '@css/index.scss'

const Subpage = () => {

    useEffect(() => {
        InitJS();
    });

    return <DefaultLayout>
        <div class="wrap">
            <h1>Hello world subpage</h1>
            <p><a href="/">Go to HOMEPAGE</a></p>
        </div>
    </DefaultLayout>
};


render(<Subpage />, document.body);