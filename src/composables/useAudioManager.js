import { ref } from 'vue'

const currentAudio = ref(null)

export function useAudioManager() {
  function play(src) {
    stop()
    if (!src) return
    const audio = new Audio(src)
    audio.play().catch(() => {})
    currentAudio.value = audio
  }

  function stop() {
    if (currentAudio.value) {
      currentAudio.value.pause()
      currentAudio.value.currentTime = 0
      currentAudio.value = null
    }
  }

  return { play, stop }
}
