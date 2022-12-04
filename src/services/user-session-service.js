import { httpClientRestProvider } from './http-client';

const basePath = '/users/sessions';

/**
 * @description GET TIME LINE USER SESSION SERVICE
 * @param {Object} query
 */
export const getTimeLineUserSessionService = async (userID) => {
  try {
    const { data } = await httpClientRestProvider.get(`${basePath}/${userID}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description CREATE SESSION SERVICE
 * @param {Object} records
 */
export const createUserSessionService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(basePath, records);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description DELETE SESSION BY ID SERVICE
 * @param {*} sessionID
 */
export const deleteSessionByIdService = async (sessionID) => {
  try {
    const { data } = await httpClientRestProvider.delete(
      `${basePath}/${sessionID}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
