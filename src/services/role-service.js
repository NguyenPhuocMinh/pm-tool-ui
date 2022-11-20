import { httpClientRestProvider } from './http-client';

const basePath = '/roles';

/**
 * @description GET ALL ROLE SERVICE
 * @param {Object} query
 */
export const getAllRoleService = async (query = {}) => {
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
 * @description CREATE ROLE SERVICE
 * @param {Object} records
 */
export const createRoleService = async (records = {}) => {
  try {
    const { data } = await httpClientRestProvider.post(basePath, records);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ROLE BY ID SERVICE
 * @param {Object} roleID
 */
export const getRoleByIdService = async (roleID) => {
  try {
    const { data } = await httpClientRestProvider.get(`${basePath}/${roleID}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE ROLE BY ID SERVICE
 * @param {*} roleID
 * @param {*} records
 */
export const updateRoleByIdService = async (roleID, records) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${basePath}/${roleID}`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description DELETE ROLE BY ID SERVICE
 * @param {*} roleID
 */
export const deleteRoleByIdService = async (roleID) => {
  try {
    const { data } = await httpClientRestProvider.delete(
      `${basePath}/${roleID}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET USERS IN ROLE BY ROLE NAME
 * @param {*} roleID
 * @param {*} query
 */
export const getUsersInRoleByRoleNameService = async (roleID, query) => {
  try {
    const { data } = await httpClientRestProvider.get(
      `${basePath}/${roleID}/users`,
      {
        params: query
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL PERMISSION IN ROLE BY ROLE NAME SERVICE
 * @param {*} roleID
 * @param {*} query
 */
export const getPermissionsInRoleByRoleIDService = async (roleID, query) => {
  try {
    const { data } = await httpClientRestProvider.get(
      `${basePath}/${roleID}/permissions`,
      {
        params: query
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
