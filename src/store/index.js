import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router';
import _ from 'lodash';

export default createStore({
  state: {
    accessToken: '',
    dashboardOpen: false,
    projects: [],
    project: null,
    assignedProjects: [],
    newProject: {},
    routingProject: null,
    routingAssignedProject: null,
    newBoard: {},
    routingBoard: null,
    projectBoards: [],
    projectTasks: [],
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
    },
    sectionOderIndex: [],
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
    SET_PROJECT(state, project) {
      state.project = project
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
    SET_PROJECT_TASKS(state, tasks) {
      state.projectTasks = tasks
    },
    SET_ASSIGNED_PROJECT_BOARDS(state, boards) {
      state.assignedProjectBoards = boards
    },
    SET_SECTIONS(state, sections) {
      sections = _.orderBy(sections, "order_no")
      sections.forEach(section => {
        section.jobs = _.orderBy(section.jobs, "order_no")
      })
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
    SET_SECTION_ORDER_INDEX(state, payload){
      state.sectionOderIndex = payload
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
    },
    loadProject(store) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'Project/' + store.state.routingProject.id, {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        store.commit('SET_PROJECT', response.data)
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
    leaveProject(store) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.delete(process.env.VUE_APP_API_URL + 'Project/assigned/' + this.state.routingAssignedProject.id, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(response => {
        if(response.status == 204) {
          store.dispatch("loadAssignedProjects");
        }
      })
      router.push("projects")
    },
    createProjectBoard(store, newBoard) {
      let user = JSON.parse(localStorage.getItem('user'));
      
      axios.post(process.env.VUE_APP_API_URL + 'Board', {
          "project_id": store.state.routingProject.id,
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
          store.dispatch("loadProjectBoards");
          store.dispatch("loadProjectTasks");
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
    loadProjectTasks({commit}) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.get(process.env.VUE_APP_API_URL + 'Project/' + this.state.routingProject.id + '/jobs', {
        headers: {
          Authorization: 'Bearer '+ user.token
        }
      })
      .then(response => {
        commit('SET_PROJECT_TASKS', response.data)
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
    addUserToProject(store, user_email) {
      let user = JSON.parse(localStorage.getItem('user'));
      let project_id = store.state.routingProject.id
      axios.post(`${process.env.VUE_APP_API_URL}Project/assignproject?project_id=${project_id}&user_email=${user_email}`,
        {
          params: {
            project_id,
            user_email
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
      axios.post(`${process.env.VUE_APP_API_URL}User/notification/${id}/accept`, 
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
        if(response.status == 200){
          store.dispatch("loadNotifications");
          store.dispatch("loadAssignedProjects");
        }
      });
    },
    denyNotification(store, payload) {
      let id = payload
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(`${process.env.VUE_APP_API_URL}User/notification/${id}/deny`, 
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
        if(response.status == 200){
          store.dispatch("loadNotifications");
          store.dispatch("loadAssignedProjects");
        }
      });
    },
    createNewSection(store, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      let url = process.env.VUE_APP_API_URL + 'Section'
      axios.post(url, {
          "sectionName": payload,
          "board_id": store.state.routingBoard.id,
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(response => {
        if(response.status == 201){
          store.dispatch("loadSections");
        }
      });
    },
    deleteSection(store, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      let url = process.env.VUE_APP_API_URL + 'Section/' + payload.id
      let index = store.state.sections.indexOf(payload)
      store.state.sections.splice(index, 1)
      axios.delete(url, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(response => {
        console.log(response.status)
        store.dispatch("loadSections");
        console.log("Response come")
      });
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
      )
      .then(response => {
        console.log(response.status)
        store.dispatch("loadSections");
      })
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
      )
      .then(response => {
        if(response.status == 200)
          store.dispatch("loadRoutingTask")
      })
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
      )
      .then(() => {
        store.dispatch("loadRoutingTask");
      })
    },
    addNewCheckToTask(store, newCheck) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(process.env.VUE_APP_API_URL + 'JobUtil/checklist', {
          "job_id": this.state.routingTaskId,
          "text": newCheck,
          "isSelected": false
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(response => {
        if(response.status == 200)
          store.dispatch("loadRoutingTask")
        }
      )
    },
    updateSectionOrder(store, payload) {
      let order_no = (payload[1])
      let changedSection = (payload[0])
      let section_id = changedSection.id
      if(changedSection.order_no < order_no){
        store.state.sections.forEach(section => {
          if(section.order_no > changedSection.order_no && section.order_no <= order_no){
            section.order_no = section.order_no - 1
            console.log("asdasd")
          }
        })
      }
      else{
        store.state.sections.forEach(section => {
          if(section.order_no >= order_no && section.order_no < changedSection.order_no){
            section.order_no += 1
          }
        })
      }
      store.state.sections.forEach(section =>  {
        if(section.id == changedSection.id){
          section.order_no = order_no
        }
      })
      let user = JSON.parse(localStorage.getItem('user'));
      store.state.sections = _.orderBy(store.state.sections, "order_no")
      axios.post(`${process.env.VUE_APP_API_URL}Section/order?order_no=${order_no}&section_id=${section_id}`, {
          params: {
            order_no,
            section_id
          }
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(() => {
          store.dispatch("loadSections")
        }
      )
    },
    checkListToggle(store, id) {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(store.state.routingTask)
      axios.post(`${process.env.VUE_APP_API_URL}JobUtil/togglechecklist/${id}`,{
          params: {
            id
          }
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      ).then(response => {
        if(response.status == 200) {
          store.dispatch("loadRoutingTask");
        }
      })
    },
    deleteTaskTag(store, id) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(`${process.env.VUE_APP_API_URL}JobUtil/untag/${id}`,{
          params: {
            id
          }
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      ).then(response => {
        if(response.status == 200) {
          store.dispatch("loadRoutingTask");
        }
      })
    },
    addTeamToProject(store, payload) {
      console.log(payload)
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(`${process.env.VUE_APP_API_URL}Team`,
        {
          "teamName": payload[0],
          "project_id": this.state.routingProject.id,
          "user_ids": payload[1]
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      ).then(response => {
        if(response.status == 201) {
          store.dispatch("loadProject");
        }
      })
    },
    updateTaskOrder(store, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      if(Object.keys(payload[0])[0] == 'moved'){
        let order_no = (payload[0].moved.newIndex + 1)
        let job_id = (payload[0].moved.element.id)
        axios.post(`${process.env.VUE_APP_API_URL}JobUtil?order_no=${order_no}&job_id=${job_id}`, {
            params: {
              order_no,
              job_id
            }
          },
          {
            headers: {
              Authorization: 'Bearer ' + user.token
            }, 
          }
        )
      }
      else{
        if(Object.keys(payload[0])[0] == 'added'){
          let job_id = payload[0].added.element.id
          let new_section_id = payload[1].id
          let new_order_no = payload[0].added.newIndex + 1 
          axios.post(`${process.env.VUE_APP_API_URL}JobUtil/changesection?job_id=${job_id}&new_section_id=${new_section_id}&new_order_no=${new_order_no}`, {
              params: {
                job_id,
                new_section_id,
                new_order_no
              }
            },
            {
              headers: {
                Authorization: 'Bearer ' + user.token
              }, 
            }
          )
        }
        else if(payload[0] == 'empty section'){
          let job_id = payload[1].jobs[0].id
          let new_section_id = payload[1].id
          let new_order_no = 1
          axios.post(`${process.env.VUE_APP_API_URL}JobUtil/changesection?job_id=${job_id}&new_section_id=${new_section_id}&new_order_no=${new_order_no}`, {
              params: {
                job_id,
                new_section_id,
                new_order_no
              }
            },
            {
              headers: {
                Authorization: 'Bearer ' + user.token
              }, 
            }
          )
        }
      }
      
    },
    takeJobForUser(store, id) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(`${process.env.VUE_APP_API_URL}Job/${id}/takejob`, {
          params: {
            id,
          }
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      ).then(response => {
        if(response.status == 200) {
          store.dispatch("loadRoutingTask");
        }
      })
    },
    loadProjectTeams({commit}) {
      let user = JSON.parse(localStorage.getItem('user'));
      let teams = this.state.project.teams
      let storeTeams = []
      for(let i = 0; i < teams.length; i++) {
        axios.get(process.env.VUE_APP_API_URL + 'Team/' + teams[i].id, {
          headers: {
            Authorization: 'Bearer '+user.token
          }
        })
        .then(response => {
          storeTeams[i] = response.data
        })
      }
      console.log(typeof storeTeams)
      commit('SET_PROJECT_TEAMS', storeTeams)   
    },
    deleteTeamFromProject(store, id) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.delete(process.env.VUE_APP_API_URL + 'Team/' + id, {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        if(response.status == 204) {
          store.dispatch("loadProject");
        }
      })
    },
    deleteTask(store, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.delete(process.env.VUE_APP_API_URL + 'Job/' + payload, {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        if(response.status == 204) {
          store.dispatch("loadSections")
        }
      })
    },
    deleteBoard(store, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.delete(process.env.VUE_APP_API_URL + 'Board/' + payload, {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        if(response.status == 204) {
          router.push('project')
        }
      })
    },
    loadAssignedProjectTasks(store) {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(store.state.routingAssignedProject.id)
      axios.get(process.env.VUE_APP_API_URL + 'Project/' + store.state.routingAssignedProject.id + '/jobs', {
        headers: {
          Authorization: 'Bearer '+user.token
        }
      })
      .then(response => {
        store.commit('SET_PROJECT_TASKS', response.data)
      })
    },
    createProjectTask(store, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      axios.post(process.env.VUE_APP_API_URL + 'Job/addprojectjob', {
          "jobTitle": payload.jobTitle,
          "jobDescription": payload.jobDescription,
          "receiverUserId": payload.receiverUser,
          "project_id": store.state.routingProject.id,
          "tags": payload.tags
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }, 
        }
      )
      .then(() => {
        store.dispatch("loadProjectBoards");
        store.dispatch("loadProjectTasks");
      })
    },
    addUsersToBoard(store, payload) {
      let user = JSON.parse(localStorage.getItem('user'));
      let board_id = store.state.routingBoard.id
      console.log(payload[1])
      for(let i = 0; i < payload.length; i++) {
        let user_id = payload[i]
        axios.post(`${process.env.VUE_APP_API_URL}Board/adduser?user_id=${user_id}&board_id=${board_id}`,
          {
            params: {
              user_id,
              board_id
            }
          },
          {
            headers: {
              Authorization: 'Bearer ' + user.token
            }, 
          },
        )
        .then(response => console.log(response))
      }
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
