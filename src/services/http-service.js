import axios from 'axios';
import configs from '@configs';
import constants from '@constants';
import { formatErrorCommonMsg, localForage } from '@utils';
import reduxStore from '@reduxStore/index';
import { showNotification, removeLogin } from '@reduxStore/actions';

const { dispatch } = reduxStore;

const httpClientRestProvider = axios.create({
  baseURL: configs.basePathRestApi,
  headers: configs.headers,
  timeout: 10000,
  withCredentials: true
});

httpClientRestProvider.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localForage.getItemLocalForage(
      constants.LOCAL_FORAGE_KEYS.TOKEN
    );
    return config;
  },
  (error) => {
    const errMsg = formatErrorCommonMsg(error);
    dispatch(
      showNotification({ level: constants.NOTIFY_LEVEL.ERROR, message: errMsg })
    );
    return Promise.reject(error);
  }
);

httpClientRestProvider.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === constants.HTTP_STATUS.AUTHORIZATION) {
      dispatch(removeLogin());
    }
    const errMsg = formatErrorCommonMsg(error);
    dispatch(
      showNotification({ level: constants.NOTIFY_LEVEL.ERROR, message: errMsg })
    );
    return Promise.reject(error);
  }
);

export { httpClientRestProvider };
