import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageLoadStartTime: 0
  },
  mutations: {
    setPLST (state, time) {
      state.pageLoadStartTime = time
    }
  },
  actions: {
  },
  modules: {
  }
})
