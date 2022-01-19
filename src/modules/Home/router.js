import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../Dashboard/views/DashBoard.vue'

const routes = [
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router