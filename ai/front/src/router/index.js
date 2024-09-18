import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SummaryView from '../views/SummaryView.vue'
import Vision from '../views/Vision.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/summary',
    component: SummaryView
  },
  {
    path: '/vision',
    component: Vision
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
