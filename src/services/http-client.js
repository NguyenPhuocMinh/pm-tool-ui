import axios from 'axios';
import configs from '@configs';

console.info('🚀 ~ file: http-client.js ~ line 3 ~ configs', configs);

const httpClientRestProvider = axios.create({
  baseURL: configs.basePathRestApi,
  headers: configs.headers
});

export { httpClientRestProvider };
