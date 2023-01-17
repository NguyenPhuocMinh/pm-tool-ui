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
      `${basePath}/${projectId}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE PROJECT BY ID SERVICE
 * @param {*} records
 * @returns
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

/**
 * @description GET ALL TEAM IN PROJECT SERVICE
 * @param {*} projectId
 * @param {*} query
 * @returns
 */
export const getAllTeamInProjectService = async (projectId, query = {}) => {
  try {
    const { data } = await httpClientRestProvider.get(
      `${basePath}/${projectId}/teams-in-projects`,
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
 * @description GET ALL TEAM NOT ON PROJECT SERVICE
 * @param {*} projectId
 * @param {*} query
 * @returns
 */
export const getAllTeamNotOnProjectService = async (projectId, query = {}) => {
  try {
    const { data } = await httpClientRestProvider.get(
      `${basePath}/${projectId}/teams-not-on-projects`,
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
 * @description ADD TEAMS TO PROJECT SERVICE
 * @param {*} projectId
 * @param {*} records
 * @returns
 */
export const addTeamsToProjectService = async (projectId, records = {}) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${basePath}/${projectId}/add-teams-to-projects`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description REMOVE TEAM FROM PROJECT SERVICE
 * @param {*} projectId
 * @param {*} records
 * @returns
 */
export const removeTeamsFromProjectService = async (
  projectId,
  records = {}
) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      `${basePath}/${projectId}/remove-teams-from-projects`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
