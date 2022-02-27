import { createStore } from 'vuex'

export default createStore({
  state: {
    accessToken: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isAuthenticated(state) {
      return state.accessToken !== ''
    }
  }
})
