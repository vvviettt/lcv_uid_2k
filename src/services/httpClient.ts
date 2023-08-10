import axios from 'axios';
import {httpConfig} from '../constants/http';

const httpClient = axios.create({
  baseURL: httpConfig.BASE_URL,
});

export default httpClient;
