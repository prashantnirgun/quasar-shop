import { axiosInstance } from '../boot/axios';

export default {
  get(route) {
    return axiosInstance.get(route);
  },
  post(route, data) {
    return axiosInstance.post(route, data);
  },
  put(route, data) {
    return axiosInstance.put(route, data);
  },
  delete(route) {
    return axiosInstance.delete(route);
  }
};
