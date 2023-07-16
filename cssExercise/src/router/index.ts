import {createRouter, createWebHashHistory} from 'vue-router'
import Main from '../components/Main.vue'
import Day1 from '../components/Day1.vue'


const routes = [
	{path: '/', component: Main},
	{path: '/day1', component: Day1}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router