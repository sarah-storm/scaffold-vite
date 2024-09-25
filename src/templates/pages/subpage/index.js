import { render } from 'preact'

import DefaultLayout from '@layouts/default';
import '@css/index.scss'

export const title = 'Subpage';

// export const meta = [{
//     name: 'description',
//     content: ''
// }];

const HomePage = () => <DefaultLayout>
    <div class="wrap">
        <h1>Hello world subpage.</h1>
    </div>
</DefaultLayout>;

render(HomePage(), document.getElementById('app'))