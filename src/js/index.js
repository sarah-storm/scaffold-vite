import Toggle from './modules/toggle';

const initStack = [
    Toggle
];

const init = () => {
    initStack.map(fn => fn());
}

export default init;