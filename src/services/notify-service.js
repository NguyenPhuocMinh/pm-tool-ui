import { httpClientRestProvider } from './http-service';

const basePath = '/notifies';

/**
 * CHANGE PASSWORD TEMPORARY NOTIFY SERVICE
 * @param {*} records {data of user}
 */
export const changePasswordTemporaryNotifyService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(
      `${basePath}/change-password-temporary`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
