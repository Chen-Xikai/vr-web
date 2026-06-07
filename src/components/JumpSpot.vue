<template>
  <div class="spot" v-bind="$attrs">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19M17,12L12,7V10H8V14H12V17L17,12Z"
        :fill="spotColor"
      />
    </svg>
  </div>
</template>
<script setup>
defineProps({
  spotColor: {
    type: String,
    default: 'white',
  },
})
</script>
<style scoped>
.spot {
  width: clamp(32px, 6vw, 52px);
  cursor: pointer;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.6));
  transition: transform 0.15s;
  animation: spotBreathe 2s ease-in-out infinite;
}

.spot:hover {
  transform: scale(1.15);
  animation: none;
}

@keyframes spotBreathe {
  0%,
  100% {
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.6));
  }
  50% {
    filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.5));
  }
}
</style>
