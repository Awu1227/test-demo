<template>
	<div>
		Page1页面
		<p>当前路由：{{route}}</p>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {useRouter,useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()


onMounted(() => {
	console.log(router.currentRoute.value);
	console.log(route);

	
})
</script>

<style scoped>

</style>