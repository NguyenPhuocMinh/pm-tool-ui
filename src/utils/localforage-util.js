import localforage from 'localforage';

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'PM-TOOL'
});

export const localForage = localforage;

localForage.getItemLocalForage = (key) => {
  try {
    const value = localStorage.getItem(`PM-TOOL/${key}`);

    return JSON.parse(value);
  } catch (err) {
    return Promise.reject(err);
  }
};
