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
    loginPrompt: false,
    guestValidation: true,
    guestLogin: false,
    guestValidationCounter: 0
  },
  modules: {
    cart,
    user
  },
  mutations: {
    SET_REMEMBER_ME(state, rememberMe) {
      state.rememberMe = rememberMe;
    },
    LOGIN_REQUEST(state, action) {
      state.loginPrompt = action;
    },
    GUEST_VALIDATION(state, action) {
      state.guestValidation = action;
    },
    GUEST_LOGIN(state, action) {
      state.guestLogin = action;
    },
    GUEST_VALIDATION_COUNTER(state, action) {
      state.guestValidationCounter++;
    }
  },
  actions: {
    setRememberMe({ commit }, rememberMe) {
      commit('SET_REMEMBER_ME', rememberMe);
    },
    setLoginRequest({ commit }, action) {
      commit('LOGIN_REQUEST', action);
    },
    setGuestLogin({ commit }, action) {
      commit('GUEST_LOGIN', action);
    },
    setGuestValidation({ commit }, action) {
      commit('GUEST_VALIDATION', action);
    },
    setGuestValidationCounter({ commit }) {
      commit('GUEST_VALIDATION_COUNTER');
    }
  },
  getters: {
    rememberMe: state => {
      return !!state.rememberMe ? state.rememberMe : false;
    },
    loginPrompt: state => state.loginPrompt,
    guestLogin: state => state.guestLogin,
    guestValidation: state => state.guestValidation,
    guestValidationCounter: state => state.guestValidationCounter
  },
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});

export default function(/* { ssrContext } */) {
  return Store;
}

export { Store };
