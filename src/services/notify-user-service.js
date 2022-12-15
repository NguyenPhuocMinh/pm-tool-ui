import { httpClientRestProvider } from './http-client';

const basePath = '/notify/users';

/**
 * @description GET ALL NOTIFY OF USER SERVICE
 * @param {*} id
 * @param {*} query
 */
export const getAllNotifyUserService = async (id, query) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath, {
      params: {
        id,
        ...query
      }
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET NOTIFY USER BY ID SERVICE
 * @param {*} id
 */
export const getNotifyUserByIdService = async (id) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath + `/${id}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL DATA NOTIFY OF USER SERVICE
 * @param {*} id
 * @param {*} query
 */
export const getAllDataNotifyUserService = async (id, query) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath + '-data', {
      params: {
        id,
        ...query
      }
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL NOTIFY OF USER SERVICE
 * @param {*} id
 * @param {*} query
 */
export const getAllDataUnreadNotifyUserService = async (id, query) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath + '-unread', {
      params: {
        id,
        ...query
      }
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
