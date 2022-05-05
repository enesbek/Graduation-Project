import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router';

export default createStore({
  state: {
    accessToken: '',
    dashboardOpen: false,
    projects: [],
    assignedProjects: [],
    newProject: {},
    routingProject: null,
    routingAssignedProject: null,
    newBoard: {},
    routingBoard: null,
    projectBoards: [],
    assignedProjectBoards: [],
    sections: [],
    user: null,
    notifications: null,
  },  
  mutations: {
    changeSidebarState: (state) => {
      return state.dashboardOpen = true
    },
    changeSidebarStateLogout(state) {
      state.dashboardOpen = false
      router.push('/');
    },
    SET_Projects(state, projects) {
      state.projects = projects
    },
    SET_ASSIGNED_PROJECTS(state, assignedProjects) {
      state.assignedProjects = assignedProjects
    },
    CREATE_Project(state, newProject) {
      state.newProject = newProject
    },
    SET_RoutingProject(state, project) {
      state.routingProject = project
    },
    SET_RoutingAssignedProject(state, project) {
      state.assignedProjects = project
    },
    SET_RoutingBoard(state, board) {
      state.routingBoard = board
    },
    CREATE_Board(state, newBoard){
      state.newBoard = newBoard
    },
    SET_PROJECT_BOARDS(state, boards) {
      state.projectBoards = boards
    },
    SET_ASSIGNED_PROJECT_BOARDS(state, boards) {
      state.assignedProjectBoards = boards
    },
    SET_SECTIONS(state, sections) {
      state.sections = sections
    },
    SET_USER(state, user){
      state.user = user
    },
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications
    }
  },
  actions: {
    changeSidebarState({ commit }) {
      commit('changeSidebarState')
    },
    changeSidebarStateLogout({commit}) {
      commit('changeSidebarStateLogout')
    },
    loadUser({commit}){
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'User', {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        commit('SET_USER', response.data)
      })
      axios.get(process.env.VUE_APP_API_URL + 'User/notification', {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        console.log(response.data)
        commit('SET_NOTIFICATIONS', response.data)
      })
    },
    loadProjects({commit}) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'Project', {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        commit('SET_Projects', response.data)
      })
    },
    loadAssignedProjects({commit}) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'Project/assigned', {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => response.data)
      .then(assignedProjects => {
        commit('SET_ASSIGNED_PROJECTS', assignedProjects)
      })
    },
    createProject(store, newProject) {
      let user = JSON.parse(localStorage.getItem('user'));
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
        this.state.routingProject = response.data
        router.push('project');
      });
    },
    createBoard(newBoard) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(process.env.VUE_APP_API_URL + 'Board', {
          "project_id": 1,
          "board_name": newBoard.boardName,
          "description": newBoard.boardDiscription,
          "startDate": newBoard.startDate,
          "endDate": newBoard.endDate,
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(response => {
        if(response.status == 201){
          router.push('board');
        }
      });
    },
    deleteProject({state}) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.delete(process.env.VUE_APP_API_URL + 'Project/' + state.routingProject.id, {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
          if(response.status == 204){
            this.loadProjects
            setTimeout(function(){
              router.push('projects')
            }, 1000);
          }
        }
      )
    },
    createProjectBoard({state}, newBoard) {
      let user = JSON.parse(localStorage.getItem('user'));
      
      axios.post(process.env.VUE_APP_API_URL + 'Board', {
          "project_id": state.routingProject.id,
          "board_name": newBoard.boardName,
          "description": newBoard.boardDescription,
          "startDate": newBoard.startDate,
          "endDate": newBoard.endDate,
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(response => {
        if(response.status == 201){
          router.push('projects')
        }
      });
    },
    loadProjectBoards({commit}) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'Project/' + this.state.routingProject.id + '/boards', {
        headers: {
          Authorization: 'Bearer '+ user.token
        }
      })
      .then(response => {
        commit('SET_PROJECT_BOARDS', response.data)
      })
    },
    loadAssignedProjectBoards({commit}) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'Project/' + this.state.routingAssignedProject.id + '/boards', {
        headers: {
          Authorization: 'Bearer '+ user.token
        }
      })
      .then(response => {
        commit('SET_ASSIGNED_PROJECT_BOARDS', response.data)
      })
    },
    loadSections({commit}) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'Board/' + this.state.routingBoard.id, {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        commit('SET_SECTIONS', response.data.sections)
      })
    },
    updateProject({state}, path, value) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.patch(process.env.VUE_APP_API_URL + 'Project/' + state.routingProject.id, 
          [
            {
              "path": path,
              "op": "replace",
              "value": value
            },
          ],
          {
            headers: {
              Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(response => {
        console.log(response)
        router.push('projects')
      });
    },
    addUserToProject({state}, userId) {
      let user = JSON.parse(localStorage.getItem('user'));
      let params = new URLSearchParams({
        project_id: state.routingProject.id,
        user_id: userId
      }).toString();
      let url = process.env.VUE_APP_API_URL + 'Project/assignproject?' + params
      console.log(user.token)
      axios.post(url, 
          {
            headers: {
              Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(response => {
        console.log(response)
      });
    },
    acceptNotification(notification){
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(process.env.VUE_APP_API_URL + 'User/notification/' + notification.id + "/accept", 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(response => {
        if(response.status == 200){
          router.push('projects')
        }
      });
    },
  },
  modules: {
  },
  getters: {
    isAuthenticated: state => state.accessToken != '',
    isDashboardOpen: state => state.dashboardOpen,
    projects: state => state.projects,
    getRoutingProject: state => state.routingProject,
  }
})
