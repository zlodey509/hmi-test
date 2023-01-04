import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/Main.vue'
import MapPage from '../views/Map.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/map',
      name: 'map',
      // route level code-splitting
      component: MapPage
    }
  ]
})

export default router
