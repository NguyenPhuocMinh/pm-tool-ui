import axios from 'axios';
import configs from '@configs';

console.info('🚀 ~ configs ~', configs);

const httpClientRestProvider = axios.create({
  baseURL: configs.basePathRestApi,
  headers: configs.headers,
  timeout: 10000,
  withCredentials: true
});

export { httpClientRestProvider };
