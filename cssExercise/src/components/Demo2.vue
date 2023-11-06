<template>
	<header class="flex justify-center bg-slate-200 m-4 font-bold text-3xl p-4 rounded-lg">CSS3D Experience</header>
	<div class="container">
    <div class="title">Feed your eyes, feed your soul.</div>
    <div class="sub_title">开眼，看更好的世界。</div>
	</div>
</template>

<script setup>
import {reactive} from 'vue'
import { panelList } from './data'
const list = reactive(panelList)


const beActive = (id) => {
	list.forEach(item => item.isActive = false)
	const currentPanel = list.find(item => item.id === id)
	currentPanel.isActive = true
}
</script>

<style scoped>

.title {
  font-size: 70px;
  font-weight: large;
}
@media (max-width: 480px) {
  .container {
    width: 100vw;
  }

  .panel:nth-of-type(4),
  .panel:nth-of-type(5) {
    display: none;
  }
}
</style>