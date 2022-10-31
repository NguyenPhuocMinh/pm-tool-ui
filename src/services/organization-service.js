import { isEmpty, get } from 'lodash';
import { httpClientRestProvider } from './http-client';

const basePath = '/organizations';

/**
 * @description GET ALL ORGANIZATION SERVICE
 * @param {*} query
 * @returns
 */
export const getAllOrganizationService = async (query = {}) => {
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
 * @description CREATE ORGANIZATION SERVICE
 * @param {*} records
 * @returns
 */
export const createOrganizationService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(basePath, {
      records
    });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ORGANIZATION BY ID SERVICE
 * @param {*} organizationID
 * @returns
 */
export const getByIdOrganizationService = async (organizationID) => {
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
 * @description UPDATE ORGANIZATION BY ID SERVICE
 * @param {*} records
 */
export const updateByIdOrganizationService = async (
  organizationID,
  records
) => {
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
 * @description DELETE ORGANIZATION BY ID SERVICE
 * @param {*} organizationID
 * @returns
 */
export const deleteOrganizationByIdService = async (organizationID) => {
  try {
    const { data } = await httpClientRestProvider.delete(
      `${basePath}/${organizationID}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
