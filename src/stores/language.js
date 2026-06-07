import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const lang = ref(localStorage.getItem('vr-lang') || 'chs')

  function setLang(newLang) {
    lang.value = newLang
    localStorage.setItem('vr-lang', newLang)
  }

  return { lang, setLang }
})
