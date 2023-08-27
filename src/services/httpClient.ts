import axios from 'axios';
import {httpConfig} from '../constants/http';
import {getState} from '../redux/store';
import jwtDecode from 'jwt-decode';

const httpClient = axios.create({
  baseURL: httpConfig.BASE_URL,
});

httpClient.interceptors.request.use(async config => {
  const token = getState().user.user?.token;
  console.log(token);

  if (token) {
    const {exp} = jwtDecode(token);
    if (exp > (new Date().getTime() + 1) / 1000) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default httpClient;
