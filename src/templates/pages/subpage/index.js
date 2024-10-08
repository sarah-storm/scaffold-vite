import { h } from 'preact';
import DefaultLayout from '@layouts/default';

export const title = 'Subpage';

const Subpage = () => <DefaultLayout>
    <div class="wrap">
        <h1>Hello world subpage.</h1>
    </div>
</DefaultLayout>;

export default Subpage;