<template>
	<header class="relative w-full py-4 border border-gray-400  bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center text-2xl text-white font-bold">
		每日CSS 练习
		<a href="https://github.com/Awu1227/test-demo/tree/master/cssExercise">
			<img src="/github.svg" class="absolute right-4" alt="github logo" >
		</a>
	</header>
	<main class=" w-full h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 overflow-hidden">
		<div class="card-container m-4 flex flex-wrap justify-center">
			<div class="card bg-pink-100  m-4 border rounded-xl bg-cover shadow-md" @click="linkToView(i)" v-for="i in 8" :style="{'background-image': `url('/test-demo/css_day${i}.png')`}">
				<div class="card-header hidden justify-center mt-1" >Day {{ i }}</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()
const linkToView = dayNum => {
	router.push(`/Day${dayNum}`)
}

</script>

<style scoped>
.card:hover .card-header{
	display: flex;
}
.card:hover {
	animation: cardScale;
	animation-duration: 0.68s;
	animation-fill-mode: forwards;

}

@keyframes cardScale {
	from {
	transform:  scale(1);
	font-size: 12px;
	}
	to {
	transform: scale(1.1);
	font-size: 6vw;
	}
}

</style>
