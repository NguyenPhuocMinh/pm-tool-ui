import { httpClientRestProvider } from './http-service';

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
    const { data } = await httpClientRestProvider.post(basePath, records);

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
export const getOrganizationService = async (organizationID) => {
  try {
    const { data } = await httpClientRestProvider.get(
      basePath + `/${organizationID}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE ORGANIZATION BY ID SERVICE
 * @param {*} records
 */
export const updateOrganizationService = async (organizationID, records) => {
  try {
    const { data } = await httpClientRestProvider.put(
      basePath + `/${organizationID}`,
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
      basePath + `/${organizationID}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL PROJECT IN ORGANIZATION SERVICE
 * @param {*} organizationID
 * @param {*} query
 */
export const getAllProjectInOrganizationService = async (
  organizationID,
  query
) => {
  try {
    const { data } = await httpClientRestProvider.get(
      basePath + `/${organizationID}/projects`,
      {
        params: query
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
