import { axiosInstance } from '../boot/axios';

export default {
  get(route) {
    return axiosInstance.get(route);
  },
  post(route, data) {
    //console.log('route', route);
    return axiosInstance.post(route, data);
  },
  put(route, data) {
    return axiosInstance.put(route, data);
  },
  delete(route) {
    return axiosInstance.delete(route);
  }
};
