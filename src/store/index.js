import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as modules from './modules'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules,
  plugins: [createPersistedState({
    storage: window.localStorage
  })]
})
