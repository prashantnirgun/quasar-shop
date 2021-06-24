import { axiosInstance } from 'src/boot/axios';


export default {
  register(credentials) {
    
    return axiosInstance.post('user/register', credentials);
  },
  login(credentials) {
    return axiosInstance.post('user/login', credentials);
  }
};
