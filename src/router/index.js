import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DashBoard from '../views/DashBoard.vue'
import DashBoardPage from '../modules/Dashboard/components/DashboardPage.vue'
import Board from '../views/Boards.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Projects from '../views/Projects.vue'

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
