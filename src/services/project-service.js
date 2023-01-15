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
 * @param {*} projectId
 */
export const getProjectByIdService = async (projectId) => {
  try {
    const { data } = await httpClientRestProvider.get(
      basePath + `/${projectId}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE PROJECT BY ID SERVICE
 * @param {*} records
 */
export const updateByIdProjectService = async (projectId, records) => {
  try {
    const { data } = await httpClientRestProvider.put(
      `${basePath}/${projectId}`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description DELETE PROJECT BY ID SERVICE
 * @param {*} projectId
 * @returns
 */
export const deleteProjectByIdService = async (projectId) => {
  try {
    const { data } = await httpClientRestProvider.delete(
      `${basePath}/${projectId}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
