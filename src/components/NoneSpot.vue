<template>
  <div class="spot">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" />
      <line x1="8" y1="8" x2="16" y2="16" stroke="rgba(255,255,255,0.5)" stroke-width="2" />
    </svg>
  </div>
</template>
<style scoped>
.spot {
  width: clamp(26px, 5vw, 40px);
  cursor: not-allowed;
  opacity: 0.6;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
}
</style>
