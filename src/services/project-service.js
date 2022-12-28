import { isEmpty, get } from 'lodash';
import { httpClientRestProvider } from './http-service';

const basePath = '/projects';

/**
 * @description GET ALL PROJECT SERVICE
 * @param {*} query
 * @returns
 */
export const getAllProjectService = async (query = {}) => {
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
 * @description CREATE PROJECT SERVICE
 * @param {*} records
 * @returns
 */
export const createProjectService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(basePath, records);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET PROJECT BY ID SERVICE
 * @param {*} organizationID
 * @returns
 */
export const getByIdProjectService = async (organizationID) => {
  try {
    const { data } = await httpClientRestProvider.get(
      `${basePath}/${organizationID}`
    );

    return !isEmpty(data) ? get(data, 'result.response') : {};
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE PROJECT BY ID SERVICE
 * @param {*} records
 */
export const updateByIdProjectService = async (organizationID, records) => {
  try {
    const { data } = await httpClientRestProvider.put(
      `${basePath}/${organizationID}`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description DELETE PROJECT BY ID SERVICE
 * @param {*} organizationID
 * @returns
 */
export const deleteProjectByIdService = async (organizationID) => {
  try {
    const { data } = await httpClientRestProvider.delete(
      `${basePath}/${organizationID}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
