import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Todolist from '../components/Todolist.vue';
import User from '../components/User.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: Todolist,
  },
  {
    path: '/user/:uid',
    name: 'user',
    component: User,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
