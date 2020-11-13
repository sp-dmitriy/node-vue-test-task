import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: []
  },
  // --- MUTATIONS ---
  mutations: {
    SET_LISTS_TO_STORE(state, lists) {
      state.lists = lists
    },
    DEL_LIST_FROM_STORE(state,id){
      state.lists = state.lists.filter(c => c.id !== id)
    },
    EDT_LIST_TO_STORE(state,list) {
     console.log(list) 
    }
  },
  // --- ACTIONS ---
  actions: {
    async GET_LISTS_FROM_API({commit}) {
      await axios('http://localhost:3000/api/list',{method: 'GET'})
      .then((response) => {
        commit('SET_LISTS_TO_STORE', response.data)
      })
    },
    async ADD_LIST_TO_API({commit},list) {
      await axios.post('http://localhost:3000/api/list',list)
      .then((response) => {
        commit('ADD_LIST_TO_STORE', list)
      })
    },
    async DEL_LIST_TO_API({commit},id) {
      await axios(`http://localhost:3000/api/list/${id}`,{method: 'DELETE'})
      .then((response) => {
        commit('DEL_LIST_FROM_STORE', id)
      })
    },
    async EDT_LIST_TO_API({commit},form) {
      const id = form.id
      const list = {
        imei : form.imei,
        imsi:  form.imsi,
        msisdn: form.msisdn
      }
      await axios.patch(`http://localhost:3000/api/list/${id}`,list)
      .then((response) => {
        commit('EDT_LIST_TO_STORE',response.data)
      })
    }

  },
  // --- GETTERS ---
  getters: {
    LISTS(state) {
      return state.lists
    }
  }
})
