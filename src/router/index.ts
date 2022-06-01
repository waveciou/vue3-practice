import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import User from '../components/User.vue'

const routes = [
  {
		path: "/home",
		name: "home",
		component: Home
	},
	{
		path: "/about",
		name: "about",
		component: About
	},
	{
		path: "/user/:uid",
		name: "user",
		component: User
	}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;