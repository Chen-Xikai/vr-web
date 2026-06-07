<template>
  <div class="home">
    <img class="home__bg" src="/imgs/post.webp" alt="周鲁烈士故居" />
    <div class="home__overlay" />
    <div class="home__content">
      <h1 class="home__title">周鲁烈士故居</h1>
      <div class="home__divider">
        <span class="home__star">&#9733;</span>
      </div>
      <p class="home__subtitle">数字化全景展示</p>
      <v-btn
        class="home__btn"
        color="primary"
        size="x-large"
        rounded="xl"
        elevation="8"
        @click="router.push('/detail')"
      >
        <v-icon start>{{ mdiRotate3d }}</v-icon>
        点击进入
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { mdiRotate3d } from '@mdi/js'

const router = useRouter()
</script>

<style scoped>
.home {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.home__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.5) 100%);
  z-index: 1;
}

.home__content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  animation: fadeInUp 1s ease-out;
}

.home__title {
  font-family: 'Title', sans-serif;
  font-size: clamp(2.2rem, 9vw, 5.5rem);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.15em;
  margin: 0;
}

.home__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 1rem 0;
}

.home__divider::before,
.home__divider::after {
  content: '';
  width: 60px;
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
}

.home__star {
  color: #C62828;
  font-size: 1.2rem;
  text-shadow: 0 0 8px rgba(198, 40, 40, 0.6);
}

.home__subtitle {
  font-family: 'Content', sans-serif;
  font-size: clamp(1rem, 3vw, 1.6rem);
  opacity: 0.9;
  letter-spacing: 0.3em;
  margin-bottom: 2.5rem;
}

.home__btn {
  animation: btnPulse 2.5s ease-in-out infinite;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes btnPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(198, 40, 40, 0.4);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(198, 40, 40, 0);
  }
}
</style>
