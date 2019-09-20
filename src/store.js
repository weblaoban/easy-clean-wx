import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    show_loading: false,
  },
  mutations: {
    SHOW_LOADING(state, flag) {
      state.show_loading = flag
    }
  },
  getters: {
    loading: (state) => state.show_loading,
  },
  actions: {
    showLoading({commit}, state) {
      commit('SHOW_LOADING', state)
    }
  }
})
