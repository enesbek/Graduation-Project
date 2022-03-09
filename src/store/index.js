import { createStore } from 'vuex'

export default createStore({
  state: {
    accessToken: '',
    dashboardOpen: false,
    projects: [],
  },  
  mutations: {
    changeSidebarState: (state) => {
      return state.dashboardOpen = true
    },
    /*setToken: (state, token) => {
      state.accessToken = token
    },*/
  },
  actions: {
    changeSidebarState({ commit }) {
      commit('changeSidebarState')
    },
    /*login({commit}) {
      axios.get('http://localhost:5050/api/Authenticate/login', {})
    }*/
  },
  modules: {
  },
  getters: {
    isAuthenticated: state => state.accessToken != '',
    isDashboardOpen: state => state.dashboardOpen,
    //getToken: state => state.accessToken,
  }
})
