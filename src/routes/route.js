import Home from '../pages/Home';
import Result from '../pages/Result';
import Report from '../pages/Report';

const zUserRoute = [
    { link: '/', element: <Home />, title: "" },
    { link: '/result/:carNumber', element: <Result />, title: "" },
    { link: '/report', element: <Report />, title: "" },
];

export { zUserRoute }