import Vue from 'vue';
import axios from 'axios';
import store from 'src/store';
//import { LocalStorage } from 'quasar'; // make sure you edit quasar.conf.js

//let newToken = '';
/*
const interceptor = axios.interceptors.response.use(
  response => response,
  error => {
    console.log('inside interceptors');
    // Reject promise if usual error
    if (errorResponse.status !== 403) {
      return Promise.reject(error);
    }


    axios.interceptors.response.eject(interceptor);

    return axios
      .post('/api/refresh_token', {
        refresh_token: this._getToken('refresh_token')
      })
      .then(response => {
        saveToken();
        error.response.config.headers['Authorization'] =
          'Bearer ' + response.data.access_token;
        return axios(error.response.config);
      })
      .catch(error => {
        destroyToken();
        this.router.push('/login');
        return Promise.reject(error);
      })
      .finally(createAxiosResponseInterceptor);
  }
);
*/
const axiosInstance = axios.create({
  baseURL: process.env.API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  //timeout: 10000
});

export default ({ store }) => {
  if (store.state.user && store.state.user.token) {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + store.state.user.token;
  }

  const interceptor = axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const status = error.response ? error.response.status : null;
      // Reject promise if usual error
      console.log('inside interceptors', error.response.config);
      if (status !== 403) {
        return Promise.reject(error);
      }

      axiosInstance.interceptors.response.eject(interceptor);

      return (
        axiosInstance
          .get('/refresh-token')
          .then(response => {
            store.dispatch('user/setToken', response.data.token);

            //store.state.user.token = response.data.token;
            //console.log('refresh-token-response old', store.state.user.token);
            console.log('refresh-token-response new', error.response.config);

            //saveToken();
            error.response.config.headers['Authorization'] =
              'Bearer ' + response.data.token;
            //          window.location.reload();
            return axiosInstance(error.response.config);
          })
          .catch(error => {
            console.log('error in axios Interceptors', error);
            //destroyToken();
            //this.router.push('/login');
            return Promise.reject(error);
          })
          //.finally(createAxiosResponseInterceptor);
          .finally(interceptor)
      );
    }
  );
};

Vue.prototype.$axios = axiosInstance;

// Here we define a named export
// that we can later use inside .js files:
export { axiosInstance };
