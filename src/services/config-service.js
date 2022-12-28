import { httpClientRestProvider } from './http-service';

const basePath = '/configs';

/**
 * GET DATA CONFIG JSON SERVICE
 * @param {*} name
 */
export const getDataConfigJsonService = async (name) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath, {
      params: {
        name
      }
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
