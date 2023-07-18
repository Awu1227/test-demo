<template>
	<div class="flex justify-center">
		<el-result
				icon="success"
				title="Page1组件">
		</el-result>
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