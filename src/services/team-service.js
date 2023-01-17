import { httpClientRestProvider } from './http-service';

const basePath = '/teams';

/**
 * @description GET ALL TEAM SERVICE
 * @param {*} query
 * @returns
 */
export const getAllTeamService = async (query = {}) => {
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
 * @description CREATE TEAM SERVICE
 * @param {*} records
 * @returns
 */
export const createTeamService = async (records) => {
  try {
    const { data } = await httpClientRestProvider.post(basePath, records);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET TEAM BY ID SERVICE
 * @param {*} teamId
 * @returns
 */
export const getTeamByIdService = async (teamId) => {
  try {
    const { data } = await httpClientRestProvider.get(basePath + `/${teamId}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description UPDATE TEAM BY ID SERVICE
 * @param {*} records
 */
export const updateByIdTeamService = async (teamId, records) => {
  try {
    const { data } = await httpClientRestProvider.put(
      basePath + `/${teamId}`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description DELETE TEAM BY ID SERVICE
 * @param {*} teamId
 */
export const deleteTeamByIdService = async (teamId) => {
  try {
    const { data } = await httpClientRestProvider.delete(
      basePath + `/${teamId}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description GET ALL MEMBER IN TEAM SERVICE
 * @param {*} teamId
 * @param {*} query
 * @returns
 */
export const getAllMemberInTeamService = async (teamId, query = {}) => {
  try {
    const { data } = await httpClientRestProvider.get(
      basePath + `/${teamId}/membersInTeam`,
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
 * @description GET ALL MEMBER NOT ON TEAM SERVICE
 * @param {*} teamId
 * @param {*} query
 * @returns
 */
export const getAllMemberNotOnTeamService = async (teamId, query = {}) => {
  try {
    const { data } = await httpClientRestProvider.get(
      basePath + `/${teamId}/membersNotOnTeam`,
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
 * @description ADD MEMBERS TO TEAM SERVICE
 * @param {*} teamId
 * @param {*} records
 * @returns
 */
export const addMembersToTeamService = async (teamId, records = {}) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      basePath + `/${teamId}/addMembersToTeam`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description REMOVE MEMBERS FROM TEAM SERVICE
 * @param {*} teamId
 * @param {*} records
 * @returns
 */
export const removeMembersFromTeamService = async (teamId, records = {}) => {
  try {
    const { data } = await httpClientRestProvider.patch(
      basePath + `/${teamId}/removeMembersFromTeam`,
      records
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
