import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router';

export default createStore({
  state: {
    accessToken: '',
    dashboardOpen: false,
    projects: [],
    newProject: {}
  },  
  mutations: {
    changeSidebarState: (state) => {
      return state.dashboardOpen = true
    },
    SET_Projects(state, projects) {
      state.projects = projects
    },
    CREATE_Project(state, newProject) {
      state.newProject = newProject
    }
  },
  actions: {
    changeSidebarState({ commit }) {
      commit('changeSidebarState')
    },
    loadProjects({commit}) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'Project', {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => response.data)
      .then(projects => {
        commit('SET_Projects', projects)
        
      })
    },
    createProject(store, newProject) {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(user.token)
      axios.post(process.env.VUE_APP_API_URL + 'Project', {
          "projectName": newProject.projectName,
          "projectDescription": newProject.projectDescription,
          "startDate": newProject.startDate,
          "endDate": newProject.endDate,
          "isFinished": false
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(response => {
        if(response.status == 200){
          router.push('project');
        }
      });
    }
  },
  modules: {
  },
  getters: {
    isAuthenticated: state => state.accessToken != '',
    isDashboardOpen: state => state.dashboardOpen,
    projects: state => state.projects,
    newProject: state => state.newProject,
  }
})
