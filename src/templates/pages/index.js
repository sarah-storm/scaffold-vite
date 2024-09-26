import { render } from 'preact'

import DefaultLayout from '@layouts/default';
import '@css/index.scss'

export const title = 'Home';

// export const meta = [{
//     name: 'description',
//     content: ''
// }];

const HomePage = () => <DefaultLayout>
    <div class="wrap">
        <h1>Hello world.</h1>
        <p><a href="/subpage/">Go to subpage</a></p>
    </div>
</DefaultLayout>;

render(HomePage(), document.body)