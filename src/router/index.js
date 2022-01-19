import { createRouter, createWebHistory } from 'vue-router'
import Home from '../modules/Home/views/Home.vue'
import DashBoard from '../modules/Dashboard/views/DashBoard.vue'
import Board from '../modules/Board/views/Boards.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/board',
    name: 'Board',
    component: Board
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
