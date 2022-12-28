import { httpClientRestProvider } from './http-service';

const basePath = '/users-online';

/**
 * @description GET ALL USER ONLINE SERVICE
 * @param {Object} query
 */
export const getAllUserOnlineService = async (query) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath, {
      params: query
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
