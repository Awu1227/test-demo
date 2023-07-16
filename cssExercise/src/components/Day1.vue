<template>
	<header class="flex justify-center bg-slate-200 m-4 font-bold text-3xl p-4 rounded-lg">Expanding Cards</header>
	<div class="container flex">
		<template v-for=" item of list" :key="item.id"  >
			<div  class="panel" :class="[item.isActive ? 'active': '']" :style="{'background-image': `url(${item.url})`}" @click="beActive(item.id)">
				<h3>{{ item.name }}</h3>
			</div>
		</template>

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
.panel {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 80vh;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  flex: 0.5;
  margin: 10px;
  position: relative;
  -webkit-transition: all 700ms ease-in;
}

.panel h3 {
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0;
}

.panel.active {
  flex: 5;
}

.panel.active h3 {
  opacity: 1;
  transition: opacity 0.3s ease-in 0.4s;
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