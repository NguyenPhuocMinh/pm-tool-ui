import constants from '@constants';
import localforage from 'localforage';

const { APP_NAME } = constants;

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: APP_NAME
});

export const localForage = localforage;

localForage.getItemLocalForage = (key) => {
  try {
    const value = localStorage.getItem(`${APP_NAME}/${key}`);

    return JSON.parse(value);
  } catch (err) {
    return Promise.reject(err);
  }
};
