<template>
	<header class="relative w-full py-4 border border-gray-400  bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center text-2xl text-white font-bold">
		每日CSS 练习
		<a href="https://github.com/Awu1227/test-demo/tree/master/cssExercise">
			<img src="../../public/github.svg" class="absolute right-4" alt="github logo" >
		</a>
	</header>
	<main class=" w-full h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 overflow-hidden">

		<div class="card-container m-4 flex flex-wrap justify-center">
			<div class="card bg-pink-100  m-4 border rounded-xl" v-for="i in 8">
				<div class="card-header flex justify-center mt-1">Day {{ i }}</div>
			</div>
		</div>

	</main>
</template>

<script setup>
</script>

<style lang="scss" scoped>

</style>