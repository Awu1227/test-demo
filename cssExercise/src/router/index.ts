import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../components/Home.vue'
import Day1 from '../components/Day1.vue'



const routes = [
	{path: '/', component: Home},
	{path: '/day1', component: Day1}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router