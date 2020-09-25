import Vue from 'vue';
import Vuex from 'vuex';

import cart from './modules/cart';
import user from './modules/user';

import createPersistedState from 'vuex-persistedstate';
import { LocalStorage } from 'quasar';

Vue.use(Vuex);

const dataState = new createPersistedState({
  paths: ['cart', 'user', 'isUserLoggedIn', 'rememberMe', 'token'],
  storage: {
    getItem: key => LocalStorage.getItem(key),
    setItem: (key, value) => LocalStorage.set(key, value),
    removeItem: key => LocalStorage.remove(key)
  }
});

//export default function(/* { ssrContext } */) {
const Store = new Vuex.Store({
  plugins: [dataState],
  state: {
    rememberMe: false,
    isUserLoggedIn: false,
    version: '0.0.2',
    loginPrompt: false
  },
  modules: {
    cart,
    user
  },
  mutations: {
    SET_REMEMBER_ME(state, rememberMe) {
      state.rememberMe = rememberMe;
    }
  },
  actions: {
    setRememberMe({ commit }, rememberMe) {
      commit('SET_REMEMBER_ME', rememberMe);
    }
  },
  getters: {
    rememberMe: state => {
      return !!state.rememberMe ? state.rememberMe : false;
    },
    loginPrompt: state => state.loginPrompt
  },
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});

export default function(/* { ssrContext } */) {
  return Store;
}

export { Store };
