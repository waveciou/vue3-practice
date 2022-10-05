import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@/Components/Home.vue';
import Todolist from '@/Components/Todolist/index.vue';
import WeatherApp from '@/Components/WeatherApp/index.vue';
import Popup from '@/Components/Popup/index.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Vue 3.0 Practice',
    },
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: Todolist,
    meta: {
      title: 'Todolist',
    },
  },
  {
    path: '/weather-app',
    name: 'WeatherApp',
    component: WeatherApp,
    meta: {
      title: 'Weather App',
    },
  },
  {
    path: '/popup',
    name: 'Popup',
    component: Popup,
    meta: {
      title: 'Popup Component',
    },
  },
  // {
  //   path: '/user/:uid',
  //   name: 'user',
  //   component: User,
  // },
  {
    path: '/*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
