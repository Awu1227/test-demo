import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../components/Home.vue'
import Demo1 from '../components/Demo1.vue'
import Demo2 from '../components/Demo2.vue'



const routes = [
	{path: '/', component: Home},
	{path: '/demo1', component: Demo1},
	{path: '/demo2', component: Demo2},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router