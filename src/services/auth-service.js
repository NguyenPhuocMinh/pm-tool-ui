import { httpClientRestProvider } from './http-service';

const basePath = '/auth';

/**
 * LOGIN SERVICE
 * @param {*} records {email, password}
 */
export const loginService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(
      `${basePath}/logins`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * LOGOUT SERVICE
 * @param {*} records {email, sessionID}
 */
export const logoutService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(
      `${basePath}/logouts`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * WHOAMI SERVICE
 * @param {*} records {email}
 */
export const whoamiService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(
      `${basePath}/whoami`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * REFRESH TOKEN SERVICE
 * @param {*} records {email, sessionID}
 */
export const refreshTokenService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(
      `${basePath}/refreshTokens`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * REVOKE TOKEN SERVICE
 * @param {*} records {id, sessionID}
 */
export const revokeTokenService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(
      `${basePath}/revokeTokens`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
