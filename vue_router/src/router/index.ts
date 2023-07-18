import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../components/Home.vue'
import Page1 from '../components/Page1.vue'
import User from '../components/User.vue'
import NotFound from '../components/NotFound.vue'
import UserGeneric from '../components/UserGeneric.vue'
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
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound
	},
	{
		path: '/user-:pathMatch(.*)',
		component: UserGeneric
	}
]
const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router