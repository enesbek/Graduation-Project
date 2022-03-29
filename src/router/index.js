import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DashBoard from '../views/DashBoard.vue'
import Boards from '../views/Boards.vue'
import Board from '../components/Boards/BoardContent.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Projects from '../views/Projects.vue'
import Project from '../views/Project.vue'

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
    path: '/boards',
    name: 'Boards',
    component: Boards
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
  },
  {
    path: '/project',
    name: 'Project',
    component: Project
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
