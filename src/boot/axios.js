import Vue from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  //timeout: 10000
});

// export default ({ store }) => {
//   axios.defaults.headers.common['Authorization'] =
//     'Bearer ' + store.state.token;
// };

Vue.prototype.$axios = axiosInstance;

// Here we define a named export
// that we can later use inside .js files:
export { axiosInstance };
