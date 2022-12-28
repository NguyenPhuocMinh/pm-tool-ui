import { httpClientRestProvider } from './http-service';

/**
 * HOME SERVICE
 */
export const homeService = async () => {
  try {
    const { data } = await httpClientRestProvider.get('/');

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * HEALTH CHECK SERVICE
 */
export const healthCheckService = async () => {
  try {
    const { data } = await httpClientRestProvider.get('/healths');

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
