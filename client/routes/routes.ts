// ./routes/index.js
import MainPage from './../pages/MainPage';
import AnotherPage from './../pages/AnotherPage';

const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: MainPage,
  },
  {
    path: '/another',
    name: 'another',
    component: AnotherPage,
  },
];

export default routes;
