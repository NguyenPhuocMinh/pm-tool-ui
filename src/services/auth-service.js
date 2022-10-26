import { httpClientRestProvider } from './http-client';

/**
 * LOGIN SERVICE
 * @param {*} email
 * @param {*} password
 */
export const loginService = async (email, password) => {
  try {
    const { data } = await httpClientRestProvider.post('/login', {
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
export const logoutService = async () => {
  try {
    const { data } = await httpClientRestProvider.post('/logout');

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
