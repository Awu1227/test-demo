import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../components/Home.vue'
import Page1 from '../components/Page1.vue'
import User from '../components/User.vue'
const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/page1',
		component: Page1
	},
	{
		path: '/user/:id',
		component: User
	}
]
const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router