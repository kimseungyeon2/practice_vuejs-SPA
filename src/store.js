import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings:{
      startTime: undefined,
      lang:undefined,
    }
  },
  getters:{
    savedSettings:(state)=>{
      return state.settings;//state -> settings
    }
  },
  /*
  use compoents getters -> use
  update actions -> commit() -> mutations
  */
  mutations: {
    saveSettings:(state,payLoad) =>{
      state.settings = payLoad;
    }
  },
  actions: {
    //actions is response mutations for commit
    saveSettings: ({commit}, payLoad) =>{
      commit('saveSettings',payLoad);
    }
  }
})
