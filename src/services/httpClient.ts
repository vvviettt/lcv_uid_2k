import axios from 'axios';
import {httpConfig} from '../constants/http';
import {getState} from '../redux/store';

const httpClient = axios.create({
  baseURL: httpConfig.BASE_URL,
});

httpClient.interceptors.request.use(async config => {
  const token = getState().user.user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(token);

  return config;
});

export default httpClient;
