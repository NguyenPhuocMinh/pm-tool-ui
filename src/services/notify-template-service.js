import { httpClientRestProvider } from './http-client';

const basePath = '/notify-templates';

/**
 * @description GET ALL NOTIFY TEMPLATE SERVICE
 * @param {Object} query
 */
export const getAllNotifyTemplateService = async (query = {}) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath, {
      params: query
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * CREATE NOTIFY TEMPLATE SERVICE
 * @param {*} records {data of user}
 */
export const createNotifyTemplateService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(basePath, records);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
