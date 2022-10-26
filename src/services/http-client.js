import axios from 'axios';
import configs from '@configs';

const httpClientRestProvider = axios.create({
  baseURL: configs.basePath,
  headers: configs.headers
});

export { httpClientRestProvider };
