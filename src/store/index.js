import { createStore } from 'vuex'

export default createStore({
  state: {
    accessToken: '',
    dashboardOpen: false,
  },  
  mutations: {
    changeSidebarState: (state) => {
      return state.dashboardOpen = true
    }
  },
  actions: {
    changeSidebarState({ commit }) {
      commit('changeSidebarState')
    }
  },
  modules: {
  },
  getters: {
    isAuthenticated: state => state.accessToken != '',
    isDashboardOpen: state => state.dashboardOpen,
  }
})
