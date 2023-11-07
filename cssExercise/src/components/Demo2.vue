<template>
  <div class="my_container" ref="container">
    <div class="title" :style="rotate3DObject">Feed your eyes, feed your soul.</div>
    <div class="sub_title" :style="rotate3DObject">开眼，看更好的世界。</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMouse } from '@vueuse/core'

const { x, y, sourceType } = useMouse()
const deltaRotateX = ref(0)
const deltaRotateY = ref(0)
const rotate3DObject = ref({})
const container = ref(null)

const width = window.innerWidth
const height = window.innerHeight

watch(x, () => {
  deltaRotateY.value = (x.value - width / 2 ) * 0.08
  rotate3DObject.value = {
    transform: `rotateX(${deltaRotateX.value}deg) rotateY(${deltaRotateY.value}deg)`
  }
})

watch(y, () => {
  deltaRotateX.value = (height / 2 - y.value ) * 0.08
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
  perspective: 800px;
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
