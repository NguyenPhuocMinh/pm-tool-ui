import axios from 'axios';
import configs from '@configs';
import constants from '@constants';
import { formatErrorCommonMsg } from '@utils';
import reduxStore from '@reduxStore/index';
import { showNotification } from '@reduxStore/actions';

const { dispatch } = reduxStore;

const httpClientRestProvider = axios.create({
  baseURL: configs.basePathRestApi,
  headers: configs.headers,
  timeout: 10000,
  withCredentials: true
});

httpClientRestProvider.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    const errMsg = formatErrorCommonMsg(error);
    dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errMsg));
    return Promise.reject(error);
  }
);

httpClientRestProvider.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errMsg = formatErrorCommonMsg(error);
    dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errMsg));
    return Promise.reject(error);
  }
);

export { httpClientRestProvider };
