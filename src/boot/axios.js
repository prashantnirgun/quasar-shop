import Vue from 'vue';
import { mapActions } from 'vuex';
import axios from 'axios';
//import store from 'src/store';
import { LocalStorage } from 'quasar'; // make sure you edit quasar.conf.js

const axiosInstance = axios.create({
  baseURL: process.env.API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  //timeout: 10000
});

// axiosInstance.interceptors.request.use(req => {
//   console.log(`Request ${req.method} ${req.url}`);
//   // Important: request interceptors **must** return the request.
//   return req;
// });

export default ({ store, commit, dispatch, app, router, Vue, Vuex }) => {
  //...mapActions('user', ['setUser']),
  if (store.state.user && store.state.user.token) {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + store.state.user.token;
  }

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 403) {
        //console.log('inside error response', error.response);
        //console.log('inside store', store.state.user);
        console.log('inside app', app);
        console.log('inside router', router);
        console.log('inside Vue', Vue);
        store.dispatch('user/setUser', null);

        //this.setUser(null);
        //router.push(’/login’)
        //store.state.user.set_user(null);
        //store.state.user.dispatch('SET_TOKEN', null);
        //store.state.user.commit('SET_TOKEN', null);
        // store.state.user.commit('SET_USER', null);
        // store.state.user.commit('LOGIN_REQUEST', true);
        //localStorage.clear();
      } else {
        return Promise.reject(error);
      }
    }
  );
};

Vue.prototype.$axios = axiosInstance;

// Here we define a named export
// that we can later use inside .js files:
export { axiosInstance };
