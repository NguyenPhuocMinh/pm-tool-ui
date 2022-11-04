import { isEmpty, get } from 'lodash';
import { httpClientRestProvider } from './http-client';

const basePath = '/roles';

/**
 * @description GET ALL ROLE SERVICE
 * @param {Object} query { _start: 0, _end: 100 }
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

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE ROLE BY ID SERVICE
 * @param {*} roleID
 * @param {*} values
 */
export const updateRoleByIdService = async (roleID, values) => {
  try {
    const { data } = await httpClientRestProvider.put(
      `${basePath}/${roleID}`,
      values
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
 * @param {*} roleName
 * @param {*} query
 */
export const getUsersInRoleByRoleNameService = async (roleName, query) => {
  try {
    const { data } = await httpClientRestProvider.get(
      `${basePath}/${roleName}/users`,
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
 * @param {*} roleName
 * @param {*} query
 */
export const getPermissionsInRoleByRoleNameService = async (
  roleName,
  query
) => {
  try {
    const { data } = await httpClientRestProvider.get(
      `${basePath}/${roleName}/permissions`,
      {
        params: query
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
