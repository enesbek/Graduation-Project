import { createRouter, createWebHistory } from 'vue-router'
import Home from '../modules/Home/views/Home.vue'
import DashBoard from '../modules/Dashboard/views/DashBoard.vue'
import Board from '../modules/Board/views/Boards.vue'
import Login from '../modules/Home/views/Login.vue'
import Register from '../modules/Home/views/Register.vue'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login 
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
