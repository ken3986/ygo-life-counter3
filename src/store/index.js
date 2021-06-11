import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logs: []
  },
  getters: {
    getLogs (state) {
      return state.logs
    }
  },
  mutations: {
    addLog (state, payload) {
      state.logs.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
