import { createRouter, createWebHistory } from 'vue-router'
import Home from '../modules/Home/views/Home.vue'
import DashBoard from '../modules/Dashboard/DashBoard.vue'
import DashBoardPage from '../modules/Dashboard/components/DashboardPage.vue'
import Board from '../modules/Board/views/Boards.vue'
import Login from '../modules/Home/views/Login.vue'
import Register from '../modules/Home/views/Register.vue'
import Projects from '../modules/Projects/views/Projects.vue'

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
    path: '/dashboardpage',
    name: 'DashBoardPage',
    component: DashBoardPage
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
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
