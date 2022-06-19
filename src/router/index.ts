import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Todolist from '../components/Todolist/index.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: Todolist,
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
