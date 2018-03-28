import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    jwt: '',
    userId: ''
  },
  mutations: {
    loginCredMut (state, data) {
      state.jwt = data.token
      state.userId = data.userId
    },
    threadCurrentMut (state, data) {
      console.log(data)
      state.thread = data
    }
  },
  actions: {
    loginCredAct ({commit}, data) {
      commit('loginCredMut', data)
    },
    threadCurrentAct ({commit}, data) {
      commit('threadCurrentMut', data)
    }
  }
})

export default store
