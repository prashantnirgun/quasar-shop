import Vue from 'vue';
import Vuex from 'vuex';

import cart from './modules/cart';
import user from './modules/user';

import createPersistedState from 'vuex-persistedstate';
import { LocalStorage } from 'quasar';

Vue.use(Vuex);

const dataState = new createPersistedState({
  paths: ['cart', 'user', 'isUserLoggedIn', 'rememberMe', 'token', 'sidebar'],
  storage: {
    //remember here key is 'vuex'
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
    version: '0.0.3',
    loginPrompt: false,
    addressValidation: false,
    addressUpdatedCounter: 0,
    guestLogin: false,
    sidebar: [
      {
        label: 'Home',
        icon: 'home',
        to: '/',
        level: 1
      }
    ]
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
    ADDRESS_VALIDATION(state, action) {
      state.addressValidation = action;
    },
    GUEST_LOGIN(state, action) {
      state.guestLogin = action;
    },
    ADDRESS_UPDATED_COUNTER(state, action) {
      state.addressUpdatedCounter = action;
    },
    IS_USER_LOGGED_IN(state, action) {
      state.isUserLoggedIn = action;
    },
    UPDATE_SIDEBAR(state, payload) {
      const found = state.sidebar.find(menu => menu.label === payload.label);
      const children = [];
      if (found == undefined) {
        const obj = {
          label: payload.label,
          icon: payload.icon,
          level: 0,
          children: payload.list
        };
        state.sidebar.push(obj);
      }
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
    setaddressUpdatedCounter({ commit }, action) {
      console.log('counter', action);
      commit('ADDRESS_UPDATED_COUNTER', action);
    },
    setAddressValidation({ commit }, action) {
      commit('ADDRESS_VALIDATION', action);
    },
    setisUserLoggedIn({ commit }) {
      commit('IS_USER_LOGGED_IN');
    },
    updateSidebar({ commit }, payload) {
      commit('UPDATE_SIDEBAR', payload);
    }
  },
  getters: {
    rememberMe: state => {
      return !!state.rememberMe ? state.rememberMe : false;
    },
    loginPrompt: state => state.loginPrompt,
    guestLogin: state => state.guestLogin,
    addressValidation: state => state.addressValidation,
    addressUpdatedCounter: state => state.addressUpdatedCounter,
    isUserLoggedIn: state => state.isUserLoggedIn,
    sidebar: state => state.sidebar
  },
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});

export default function(/* { ssrContext } */) {
  return Store;
}

export { Store };
