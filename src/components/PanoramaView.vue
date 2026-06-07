<template>
  <div class="panorama-wrapper">
    <!-- Loading -->
    <transition name="fade">
      <div v-if="loading" class="panorama-loading">
        <div class="panorama-loading__spinner" />
        <span class="panorama-loading__text">加载全景中...</span>
      </div>
    </transition>

    <!-- 顶部返回栏 -->
    <div class="panorama-topbar">
      <v-btn
        icon
        size="small"
        variant="flat"
        color="rgba(0,0,0,0.45)"
        @click="goBack"
      >
        <v-icon color="white" size="20">{{ mdiArrowLeft }}</v-icon>
      </v-btn>
      <span class="panorama-topbar__label">周鲁烈士故居</span>
    </div>

    <!-- 全景 -->
    <v-pannellum
      ref="panoramaRef"
      :src="panoramaConfig"
      :hfov="scene.hfov"
      :yaw="scene.yaw ?? 0"
      :pitch="scene.pitch ?? 0"
      :showZoom="true"
      style="height: 100vh"
    />

    <BoardDialog v-if="scene.hasBoards" v-model="dialogVisible" :board="currentBoard" />
    <FlowerOffering v-if="scene.hasFlower" ref="flowerRef" />
    <v-snackbar
      v-if="scene.hasNoneSpots"
      v-model="snackbar"
      rounded="pill"
      location="top"
      color="primary"
      :timeout="1500"
    >
      该区域暂未开放
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed, createApp, h, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mdiArrowLeft } from '@mdi/js'
import { scenes } from '@/config/scenes'
import { boards } from '@/config/boards'
import JumpSpot from './JumpSpot.vue'
import GeneralSpot from './GeneralSpot.vue'
import NoneSpot from './NoneSpot.vue'
import { VBtn } from 'vuetify/components'
import { createVuetify } from 'vuetify'
import BoardDialog from './BoardDialog.vue'
import FlowerOffering from './FlowerOffering.vue'

const route = useRoute()
const router = useRouter()

const sceneId = computed(() => route.params.sceneId)
const scene = computed(() => scenes[sceneId.value] ?? {})

const panoramaRef = ref(null)
const flowerRef = ref(null)
const dialogVisible = ref(false)
const snackbar = ref(false)
const currentBoard = ref(null)
const loading = ref(true)
let loadTimer = null

function startLoading() {
  loading.value = true
  if (loadTimer) clearInterval(loadTimer)
  loadTimer = setInterval(() => {
    const viewer = panoramaRef.value?.viewer
    if (viewer) {
      clearInterval(loadTimer)
      loadTimer = null
      setTimeout(() => {
        loading.value = false
      }, 300)
    }
  }, 200)
}

onMounted(startLoading)

onUnmounted(() => {
  if (loadTimer) clearInterval(loadTimer)
})

watch(sceneId, () => {
  startLoading()
})

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/detail')
  }
}

function jump(target) {
  router.push({ name: 'vr', params: { sceneId: target } })
}

function showBoard(boardId) {
  currentBoard.value = boards[boardId] ?? null
  dialogVisible.value = true
}

function hotspotMount(hotSpotDiv, spot) {
  if (spot.type === 'jump') {
    const app = createApp({
      render() {
        return h(JumpSpot, {
          class: spot.spotClass || '',
          spotColor: spot.spotColor || 'white',
          onClick: () => jump(spot.target),
        })
      },
    })
    app.mount(hotSpotDiv)
    return
  }

  if (spot.type === 'board') {
    const app = createApp({
      render() {
        return h(GeneralSpot, {
          onClick: () => showBoard(spot.boardId),
        })
      },
    })
    app.mount(hotSpotDiv)
    return
  }

  if (spot.type === 'none') {
    const app = createApp({
      render() {
        return h(NoneSpot, {
          onClick: () => {
            snackbar.value = true
          },
        })
      },
    })
    app.mount(hotSpotDiv)
    return
  }

  if (spot.type === 'flower') {
    const btnApp = createApp({
      data() {
        return { disabled: false }
      },
      render() {
        return h(
          VBtn,
          {
            class: 'center-button',
            color: 'red',
            disabled: this.disabled,
            onClick: () => {
              this.disabled = true
              const viewer = panoramaRef.value?.viewer
              if (viewer) {
                viewer.lookAt(-2, -3, 50, false)
                viewer.setYawBounds([-2, -2])
                viewer.setPitchBounds([-3, -3])
                viewer.setHfovBounds([50, 50])
              }
              const flower = flowerRef.value?.flowerRef
              if (flower) {
                flower.classList.add('active')
              }
              setTimeout(() => {
                if (flower) {
                  flower.classList.remove('active')
                }
                if (viewer) {
                  viewer.setYawBounds([-360, 360])
                  viewer.setPitchBounds([-90, 90])
                  viewer.setHfovBounds([20, 100])
                }
                this.disabled = false
              }, 6000)
            },
          },
          ['在线献花'],
        )
      },
    })
    btnApp.use(createVuetify({ components: { VBtn } }))
    btnApp.mount(hotSpotDiv)
    return
  }
}

const panoramaConfig = computed(() => {
  const s = scene.value
  if (!s.image) return {}
  return {
    default: { firstScene: 'cube' },
    scenes: {
      cube: {
        hfov: s.sceneHfov,
        type: 'equirectangular',
        panorama: s.image,
        hotSpots: (s.hotSpots || []).map((spot) => ({
          pitch: spot.pitch,
          yaw: spot.yaw,
          cssClass: spot.cssClass || 'custom-hotspot',
          createTooltipFunc: (div) => hotspotMount(div, spot),
        })),
      },
    },
  }
})
</script>

<style scoped>
.panorama-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.panorama-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  z-index: 50;
  gap: 12px;
}

.panorama-loading__spinner {
  width: 44px;
  height: 44px;
  border: 3px solid rgba(255, 255, 255, 0.15);
  border-top-color: #C62828;
  border-bottom-color: #C62828;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.panorama-loading__text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.panorama-topbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  pointer-events: none;
}

.panorama-topbar > * {
  pointer-events: auto;
}

.panorama-topbar__label {
  color: white;
  font-size: 14px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
