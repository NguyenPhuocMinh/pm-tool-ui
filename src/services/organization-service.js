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
      `${basePath}/${organizationID}`
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
 * @param {*} organizationId
 * @param {*} query
 * @returns
 */
export const getAllProjectInOrganizationService = async (
  organizationId,
  query = {}
) => {
  try {
    const { data } = await httpClientRestProvider.get(
      `${basePath}/${organizationId}/projects-in-organizations`,
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
 * @description GET ALL PROJECT NOT ON ORGANIZATION SERVICE
 * @param {*} organizationId
 * @param {*} query
 * @returns
 */
export const getAllProjectNotOnOrganizationService = async (
  organizationId,
  query = {}
) => {
  try {
    const { data } = await httpClientRestProvider.get(
      `${basePath}/${organizationId}/projects-not-on-organizations`,
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
 * @description ADD PROJECT TO ORGANIZATION SERVICE
 * @param {*} organizationId
 * @param {*} records
 * @returns
 */
export const addProjectsToOrganizationService = async (
  organizationId,
  records = {}
) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${basePath}/${organizationId}/add-projects-to-organizations`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description REMOVE PROJECT FROM ORGANIZATION SERVICE
 * @param {*} organizationId
 * @param {*} records
 * @returns
 */
export const removeProjectsFromOrganizationService = async (
  organizationId,
  records = {}
) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${basePath}/${organizationId}/remove-projects-from-organizations`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
