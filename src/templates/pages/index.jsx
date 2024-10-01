import {render} from 'preact'
import { useEffect } from 'preact/hooks';

import DefaultLayout from '@layouts/default';
import InitJS from '@javascript/index.js';
import '@css/index.scss'

const HomePage = () => {

    useEffect(() => {
        InitJS();
    });

    return <DefaultLayout>
        <div class="wrap">
            <h1>Hello world.</h1>
            <p><a href="/subpage/">Go to subpage</a></p>
            <div class="parent">
                <button type="button" class="js-toggle__btn">Test the toggle</button>
                <div id="child" class="js-toggle__local child" data-toggle="js-toggle__btn">
                    testing
                </div>
                <img src="/img/sample-1.jpg" />
            </div>
        </div>
    </DefaultLayout>
};


render(<HomePage />, document.body);