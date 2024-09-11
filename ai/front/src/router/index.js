import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SummaryView from '../views/SummaryView.vue'

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
