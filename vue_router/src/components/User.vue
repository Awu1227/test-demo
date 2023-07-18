<template>

	<div class="flex justify-center">
		<el-result
        icon="success"
        title="User组件"
				:subTitle=subTitle
      >
			<template #extra>
				上一个用户是：{{ lastUserId }}
			</template>
      </el-result>
		</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRoute, onBeforeRouteUpdate, onBeforeRouteLeave} from 'vue-router'
const route = useRoute()
const subTitle = ref('')
const lastUserId = ref('')
subTitle.value = `当前用户id为${route.params.id}`
onBeforeRouteUpdate((to, from) => {
	subTitle.value = `当前用户id为${to.params.id}`
	lastUserId.value = from.params.id as string
	console.log('from',from);
})
</script>

<style scoped>

</style>