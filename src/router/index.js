import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { scenes } from '@/config/scenes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/DetailView.vue'),
    },
    {
      path: '/vr/:sceneId',
      name: 'vr',
      component: () => import('../components/PanoramaView.vue'),
      beforeEnter: (to) => {
        if (!scenes[to.params.sceneId]) {
          return { name: 'home' }
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
