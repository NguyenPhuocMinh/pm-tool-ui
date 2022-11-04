import { httpClientRestProvider } from './http-client';

const bastPath = '/permissions';

/**
 * @description GET ALL PERMISSION SERVICE
 * @param {*} perID
 * @param {*} values
 */
export const getAllPermissionService = async (query = {}) => {
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
 * @description CREATE PERMISSION SERVICE
 * @param {*} perID
 * @param {*} records
 */
export const createPermissionService = async (records = {}) => {
  try {
    const { data } = await httpClientRestProvider.post(bastPath, records);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET PERMISSION BY ID SERVICE
 * @param {*} perID
 */
export const getPermissionByIdService = async (perID) => {
  try {
    const { data } = await httpClientRestProvider.get(`${bastPath}/${perID}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE PERMISSION BY ID SERVICE
 * @param {*} perID
 * @param {*} records
 */
export const updatePermissionByIdService = async (perID, records) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${bastPath}/${perID}`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description DELETE PERMISSION BY ID SERVICE
 * @param {*} perID
 */
export const deletePermissionByIdService = async (perID) => {
  try {
    const { data } = await httpClientRestProvider.delete(
      `${bastPath}/${perID}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description ADD ROLES TO PERMISSION SERVICES
 * @param {*} perID
 * @param {*} records
 */
export const addRolesToPermissionService = async (perID, records) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${bastPath}/${perID}/assign-roles`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
