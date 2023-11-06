<template>
  <header class="flex justify-center bg-slate-200 m-4 font-bold text-3xl p-4 rounded-lg absolute top">CSS3D Experience</header>
  <div class="my_container" ref="container">
    <div class="title" :style="rotate3DObject">Feed your eyes, feed your soul.</div>
    <div class="sub_title" :style="rotate3DObject">开眼，看更好的世界。</div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { useMouse } from '@vueuse/core'

const { x, y, sourceType } = useMouse()
const deltaRotateX = ref(0)
const deltaRotateY = ref(0)
const rotate3DObject = ref({})
const container = ref(null)

const width = window.innerWidth
const height = window.innerHeight

watch(x, () => {
  deltaRotateY.value = (width / 2 - x.value) * 0.1
  rotate3DObject.value = {
    transform: `rotateX(${deltaRotateX.value}deg) rotateY(${deltaRotateY.value}deg)`
  }
})

watch(y, () => {
  deltaRotateX.value = (y.value - height / 2) * 0.1
  rotate3DObject.value = {
    transform: `rotateX(${deltaRotateX.value}deg) rotateY(${deltaRotateY.value}deg)`
  }
})
</script>

<style scoped>
.my_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 70px;
  font-weight: large;
}
.title,
.sub_title {
  text-align: center;
  cursor: default;
}
</style>
