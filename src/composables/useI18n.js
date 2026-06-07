import { computed } from 'vue'
import { useLanguageStore } from '@/stores/language'

const LANG_INDEX = { chs: 0, eng: 1, tcw: 2 }

export function useI18n() {
  const store = useLanguageStore()

  const lang = computed(() => store.lang)

  function setLanguage(newLang) {
    store.setLang(newLang)
  }

  function getAudioSrc(boardData) {
    if (!boardData?.audio) return null
    if (typeof boardData.audio === 'string') return boardData.audio
    const idx = LANG_INDEX[store.lang] ?? 0
    return boardData.audio[idx] ?? boardData.audio[0]
  }

  return { lang, setLanguage, getAudioSrc }
}
