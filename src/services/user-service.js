import { httpClientRestProvider } from './http-client';

const bastPath = '/users';

/**
 * @description GET ALL USER SERVICE
 * @param {*} query
 */
export const getAllUserService = async (query = {}) => {
  try {
    const { data } = await httpClientRestProvider.get(bastPath, {
      params: query
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description CREATE USER SERVICE
 * @param {*} records
 */
export const createUserService = async (records = {}) => {
  try {
    const { data } = await httpClientRestProvider.post(bastPath, records);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET USER BY ID SERVICE
 * @param {*} userID
 */
export const getUserByIdService = async (userID) => {
  try {
    const { data } = await httpClientRestProvider.get(`${bastPath}/${userID}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE USER BY ID SERVICE
 * @param {*} userID
 * @param {*} records
 */
export const updateUserByIdService = async (userID, records) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${bastPath}/${userID}`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description DELETE USER BY ID SERVICE
 * @param {*} userID
 */
export const deleteUserByIdService = async (userID) => {
  try {
    const { data } = await httpClientRestProvider.delete(
      `${bastPath}/${userID}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description ADD ROLES TO USER SERVICES
 * @param {*} userID
 * @param {*} records
 */
export const addRolesToUserService = async (userID, records) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${bastPath}/${userID}/add-roles`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description SET PASS USER BY ID SERVICES
 * @param {*} userID
 * @param {*} records
 */
export const setPassUserByIdService = async (userID, records) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${bastPath}/${userID}/set-password`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description RESET PASSWORD USER BY ID SERVICES
 * @param {*} userID
 * @param {*} records
 */
export const resetPassUserByIdService = async (userID, records) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${bastPath}/${userID}/reset-password`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
