import { h } from 'preact';
import DefaultLayout from '@layouts/default';

export const title = 'Home';

const HomePage = () => <DefaultLayout>
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

export default HomePage;


