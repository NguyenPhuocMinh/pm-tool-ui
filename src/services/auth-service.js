import { httpClientRestProvider } from './http-client';

const basePath = '/auth';

/**
 * LOGIN SERVICE
 * @param {*} email
 * @param {*} password
 */
export const loginService = async (email, password) => {
  try {
    const { data } = await httpClientRestProvider.post(`${basePath}/logins`, {
      email,
      password
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * LOGOUT SERVICE
 */
export const logoutService = async (email) => {
  try {
    const { data } = await httpClientRestProvider.post(`${basePath}/logouts`, {
      email
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * REFRESH TOKEN SERVICE
 * @param {*} email
 */
export const refreshTokenService = async (email) => {
  try {
    const { data } = await httpClientRestProvider.post(
      `${basePath}/refresh-tokens`,
      {
        email
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
