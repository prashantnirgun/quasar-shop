import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { LocalStorage } from 'quasar';
import cart from './modules/cart';

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const dataState = new createPersistedState({
  paths: ['cart'],
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
    token: null,
    user: null,
    rememberMe: false,
    version: '0.0.1'
  },
  modules: {
    cart
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});

export default function(/* { ssrContext } */) {
  return Store;
}

export { Store };
