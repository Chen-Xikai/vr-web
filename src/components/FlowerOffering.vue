<template>
  <div class="animated-image" ref="flowerRef">
    <img src="/imgs/flower.webp" width="25%" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const flowerRef = ref(null)

defineExpose({ flowerRef })
</script>

<style scoped>
.animated-image {
  transform-origin: center center;
  transition: opacity 0.2s ease;
  opacity: 0;
  position: absolute;
  bottom: 25vh;
  left: 40vw;
}
.animated-image.active {
  opacity: 1;
  animation: scaleAndMove 6s ease-in-out forwards;
}
@keyframes scaleAndMove {
  0% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  40% {
    transform: scale(2) translateY(0);
    opacity: 1;
  }
  70% {
    transform: scale(0.8) translateY(30vh) translateX(-5vw);
    opacity: 1;
  }
  100% {
    transform: scale(0.8) translateY(30vh) translateX(-5vw);
    opacity: 0;
  }
}
</style>
