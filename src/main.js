import './assets/main.css'
import '@egjs/view360/css/view360.min.css'
import 'vuetify/styles'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import { createVuetify } from 'vuetify'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import App from './App.vue'
import router from './router'
import VuePannellum from 'vue-pannellum'
import 'video.js/dist/video-js.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueViewer)
app.use(
  createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#C62828',
            secondary: '#8D6E63',
            background: '#FAF3ED',
            surface: '#FFFFFF',
          },
        },
      },
    },
  }),
)
app.component('VPannellum', VuePannellum)
app.mount('#app')
