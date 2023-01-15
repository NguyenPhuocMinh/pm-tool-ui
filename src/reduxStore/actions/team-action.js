import { isEmpty, get } from 'lodash';
import {
  getAllTeamService,
  createTeamService,
  getTeamByIdService,
  updateByIdTeamService,
  deleteTeamByIdService,
  getAllMemberInTeamService,
  getAllMemberNotOnTeamService,
  addMembersToTeamService,
  removeMembersToTeamService
} from '@services';
import { showNotification } from '@reduxStore/actions';
import constants from '@constants';
import {
  TEAM_REQUEST,
  TEAM_FAILURE,
  TEAM_RESET_RECORD,
  TEAM_GET_ALL_SUCCESS,
  TEAM_GET_ID_SUCCESS,
  TEAM_CREATE_SUCCESS,
  TEAM_UPDATE_SUCCESS,
  TEAM_GET_ALL_MEMBER_IN_TEAM_SUCCESS,
  TEAM_GET_ALL_MEMBER_NOT_ON_TEAM_SUCCESS
} from '@reduxStore/types';

export const resetRecordsTeam = () => ({
  type: TEAM_RESET_RECORD
});

/**
 * @description GET ALL TEAM ACTION
 * @param {*} query
 */
export const getAllTeamAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: TEAM_REQUEST
      });

      const { result } = await getAllTeamService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: TEAM_GET_ALL_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: TEAM_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description GET TEAM BY ID ACTION
 * @param {*} teamId
 */
export const getTeamByIdAction = (teamId) => async (dispatch) => {
  try {
    dispatch({
      type: TEAM_REQUEST
    });

    const { result } = await getTeamByIdService(teamId);

    if (!isEmpty(result)) {
      dispatch({
        type: TEAM_GET_ID_SUCCESS,
        payload: result.data
      });
    }
  } catch (err) {
    dispatch({
      type: TEAM_FAILURE,
      payload: err
    });
  }
};

/**
 * @description CREATE TEAM ACTION
 * @param {*} opts
 * @param {*} records
 */
export const createTeamAction =
  (opts = {}, records = {}) =>
  async (dispatch) => {
    const { navigate } = opts;
    try {
      dispatch({
        type: TEAM_REQUEST
      });

      const { result } = await createTeamService(records);

      if (!isEmpty(result)) {
        const teamId = get(result, 'data.id');
        dispatch({
          type: TEAM_CREATE_SUCCESS,
          payload: result
        });
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message: result.message
          })
        );
        navigate(`/teams/edit/${teamId}`);
      }
    } catch (err) {
      dispatch({
        type: TEAM_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description UPDATE TEAM BY ID ACTION
 * @param {*} teamId
 * @param {*} records
 */
export const updateTeamByIdAction =
  (teamId, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: TEAM_REQUEST
      });
      const { result, message } = await updateByIdTeamService(teamId, records);

      if (!isEmpty(result)) {
        dispatch({
          type: TEAM_UPDATE_SUCCESS,
          payload: result.response
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      }
    } catch (err) {
      dispatch({
        type: TEAM_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description DELETE TEAM BY ID ACTION
 * @param {*} teamId
 * @param {*} query
 */
export const deleteTeamByIdAction = (teamId, query) => async (dispatch) => {
  try {
    dispatch({
      type: TEAM_REQUEST
    });

    const { result } = await deleteTeamByIdService(teamId);

    if (!isEmpty(result)) {
      dispatch(
        showNotification({
          level: constants.NOTIFY_LEVEL.SUCCESS,
          message: result.message
        })
      );
      dispatch(getAllTeamAction(query));
    }
  } catch (err) {
    dispatch({
      type: TEAM_FAILURE,
      payload: err
    });
  }
};

/**
 * @description GET ALL MEMBER IN TEAM ACTION
 * @param {*} teamId
 * @param {*} query
 */
export const getAllMemberInTeamAction =
  (teamId, query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: TEAM_REQUEST
      });

      const { result } = await getAllMemberInTeamService(teamId, query);

      if (!isEmpty(result)) {
        dispatch({
          type: TEAM_GET_ALL_MEMBER_IN_TEAM_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: TEAM_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description GET ALL MEMBER NOT ON TEAM ACTION
 * @param {*} teamId
 * @param {*} query
 */
export const getAllMemberNotOnTeamAction =
  (teamId, query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: TEAM_REQUEST
      });

      const { result } = await getAllMemberNotOnTeamService(teamId, query);

      if (!isEmpty(result)) {
        dispatch({
          type: TEAM_GET_ALL_MEMBER_NOT_ON_TEAM_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: TEAM_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description ADD MEMBERS TO TEAM ACTION
 * @param {*} teamId
 * @param {*} records
 */
export const addMembersToTeamAction =
  (teamId, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: TEAM_REQUEST
      });

      const { result } = await addMembersToTeamService(teamId, records);

      if (!isEmpty(result)) {
        const query = {
          _start: 0,
          _end: 5
        };
        dispatch(getAllMemberInTeamAction(teamId, query));
        dispatch(getAllMemberNotOnTeamAction(teamId, query));
      }
    } catch (err) {
      dispatch({
        type: TEAM_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description REMOVE MEMBERS TO TEAM ACTION
 * @param {*} teamId
 * @param {*} records
 */
export const removeMembersToTeamAction =
  (teamId, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: TEAM_REQUEST
      });

      const { result } = await removeMembersToTeamService(teamId, records);

      if (!isEmpty(result)) {
        const query = {
          _start: 0,
          _end: 5
        };
        dispatch(getAllMemberInTeamAction(teamId, query));
        dispatch(getAllMemberNotOnTeamAction(teamId, query));
      }
    } catch (err) {
      dispatch({
        type: TEAM_FAILURE,
        payload: err
      });
    }
  };
