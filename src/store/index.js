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
    routingTaskId: null,
    routingTask: null,
    newTask:{
      "section_id": null,
      "jobTitle": null,
      "jobDescription": "",
      "project_id": null,
      "tags": [
        ""
      ]
    }
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
    },
    SET_ROUTING_TASK_ID(state, taskId){
      state.routingTaskId = taskId
    },
    SET_ROUTING_TASK(state, task){
      state.routingTask = task
    },
    SET_NEW_TASK_SECTION(state, id) {
      state.newTask.section_id = id
    },
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
    },
    loadNotifications({commit}){
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'User/notification', {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
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
    updateProject({state}, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(payload[0], payload[1])
      axios.patch(process.env.VUE_APP_API_URL + 'Project/' + state.routingProject.id, 
          [
            {
              "path": payload[0],
              "op": "replace",
              "value": payload[1]
            },
          ],
          {
            headers: {
              Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(() => {
        router.push('projects')
      });
    },
    addUserToProject(store, user_id) {
      let user = JSON.parse(localStorage.getItem('user'));
      let project_id = store.state.routingProject.id
      axios.post(`http://localhost:5050/api/Project/assignproject?project_id=${project_id}&user_id=${user_id}`,
        {
          params: {
            project_id,
            user_id
          }
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        },
      )
    },
    acceptNotification(store, payload){
      let id = payload
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(`http://localhost:5050/api/User/notification/${id}/accept`, 
        {
          params: {
            id,
          }
        },
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
    denyNotification(store, payload) {
      let id = payload
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(`http://localhost:5050/api/User/notification/${id}/deny`, 
        {
          params: {
            id,
          }
        },
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
    createNewSection({state}, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      let url = process.env.VUE_APP_API_URL + 'Section'
      axios.post(url, {
          "sectionName": payload,
          "board_id": state.routingBoard.id,
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
    },
    deleteSection(store, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      let url = process.env.VUE_APP_API_URL + 'Section/' + payload
      axios.delete(url, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
    },
    routingTask({commit}, taskId) {
      commit('SET_ROUTING_TASK_ID', taskId)
    },
    loadRoutingTask({commit}){
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'Job/' + this.state.routingTaskId, {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        commit('SET_ROUTING_TASK', response.data)
      })
    },
    createNewTask(store, newTask){
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(process.env.VUE_APP_API_URL + 'Job', {
          "section_id": this.state.newTask.section_id,
          "jobTitle": newTask.jobTitle,
          "jobDescription": newTask.jobDescription,
          "project_id": this.state.routingProject.id,
          "tags": newTask.tags
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      );
    },
    addNewTagToTask(store, newTag) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(process.env.VUE_APP_API_URL + 'JobUtil/tag', {
          "job_id": this.state.routingTaskId,
          "tagName": newTag
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      );
    },
    updateTask(store, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.patch(process.env.VUE_APP_API_URL + 'Job/' + this.state.routingTaskId, 
        [
          {
            "path": payload[0],
            "op": "replace",
            "value": payload[1]
          },
        ], 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      );
    },
    updateSections(value){
      //let user = JSON.parse(localStorage.getItem('user'));
      console.log(value[0] + "order" + value[1])
        
      /*axios.patch(process.env.VUE_APP_API_URL + 'Section/order?' + "order_no" , 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      );*/
    },
    addNewCheckToTask(store, newCheck) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(process.env.VUE_APP_API_URL + 'JobUtil/checklist ', {
          "job_id": this.state.routingTaskId,
          "text": newCheck,
          "isSelected": false
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      );
    }
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
