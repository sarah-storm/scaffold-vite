import Toggle from './modules/toggle';

const initStack = [
    Toggle
];

const init = () => {
    initStack.map(fn => fn());
}

init();

export default init;