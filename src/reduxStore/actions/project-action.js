import { isEmpty, get } from 'lodash';
import {
  getAllProjectService,
  createProjectService,
  getProjectByIdService,
  updateByIdProjectService,
  deleteProjectByIdService,
  getAllTeamInProjectService,
  getAllTeamNotOnProjectService,
  addTeamsToProjectService,
  removeTeamsFromProjectService
} from '@services';
import { showNotification } from '@reduxStore/actions';
import constants from '@constants';
import {
  PROJECT_REQUEST,
  PROJECT_FAILURE,
  PROJECT_RESET_RECORD,
  PROJECT_GET_ALL_SUCCESS,
  PROJECT_GET_ID_SUCCESS,
  PROJECT_CREATE_SUCCESS,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_GET_ALL_TEAM_IN_PROJECT_SUCCESS,
  PROJECT_GET_ALL_TEAM_NOT_ON_PROJECT_SUCCESS
} from '@reduxStore/types';

export const resetRecordsProject = () => ({
  type: PROJECT_RESET_RECORD
});

/**
 * @description GET ALL PROJECT ACTION
 * @param {*} query
 */
export const getAllProjectAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PROJECT_REQUEST
      });

      const { result } = await getAllProjectService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: PROJECT_GET_ALL_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
        dispatch({
          type: PROJECT_FAILURE
        });
      }
    } catch (err) {
      dispatch({
        type: PROJECT_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description GET PROJECT BY ID ACTION
 * @param {*} projectId
 */
export const getProjectByIdAction = (projectId) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_REQUEST
    });

    const { result } = await getProjectByIdService(projectId);

    if (!isEmpty(result)) {
      dispatch({
        type: PROJECT_GET_ID_SUCCESS,
        payload: result.data
      });
    }
  } catch (err) {
    dispatch({
      type: PROJECT_FAILURE,
      payload: err
    });
  }
};

/**
 * @description CREATE PROJECT ACTION
 * @param {*} opts
 * @param {*} records
 */
export const createProjectAction =
  (opts = {}, records = {}) =>
  async (dispatch) => {
    const { navigate } = opts;
    try {
      dispatch({
        type: PROJECT_REQUEST
      });

      const { result } = await createProjectService(records);

      if (!isEmpty(result)) {
        const projectId = get(result, 'response.id');
        dispatch({
          type: PROJECT_CREATE_SUCCESS,
          payload: result
        });
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message: result.message
          })
        );
        navigate(`/projects/edit/${projectId}`);
      }
    } catch (err) {
      dispatch({
        type: PROJECT_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description UPDATE PROJECT BY ID ACTION
 * @param {*} projectId
 * @param {*} records
 */
export const updateProjectByIdAction =
  (projectId, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PROJECT_REQUEST
      });

      const { result, message } = await updateByIdProjectService(
        projectId,
        records
      );

      if (!isEmpty(result)) {
        dispatch({
          type: PROJECT_UPDATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message
          })
        );
      }
    } catch (err) {
      dispatch({
        type: PROJECT_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description DELETE PROJECT BY ID ACTION
 * @param {*} projectId
 * @param {*} query
 */
export const deleteProjectByIdAction =
  (projectId, query) => async (dispatch) => {
    try {
      dispatch({
        type: PROJECT_REQUEST
      });

      const { result } = await deleteProjectByIdService(projectId);

      if (!isEmpty(result)) {
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message: result.message
          })
        );
        dispatch(getAllProjectAction(query));
      }
    } catch (err) {
      dispatch({
        type: PROJECT_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description GET ALL TEAM IN PROJECT ACTION
 * @param {*} projectId
 * @param {*} query
 */
export const getAllTeamInProjectAction =
  (projectId, query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PROJECT_REQUEST
      });

      const { result } = await getAllTeamInProjectService(projectId, query);

      if (!isEmpty(result)) {
        dispatch({
          type: PROJECT_GET_ALL_TEAM_IN_PROJECT_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: PROJECT_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description GET ALL MEMBER NOT ON TEAM ACTION
 * @param {*} projectId
 * @param {*} query
 */
export const getAllTeamNotOnProjectAction =
  (projectId, query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PROJECT_REQUEST
      });

      const { result } = await getAllTeamNotOnProjectService(projectId, query);

      if (!isEmpty(result)) {
        dispatch({
          type: PROJECT_GET_ALL_TEAM_NOT_ON_PROJECT_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: PROJECT_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description ADD TEAMS TO PROJECT ACTION
 * @param {*} projectId
 * @param {*} records
 */
export const addTeamsToProjectAction =
  (projectId, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PROJECT_REQUEST
      });

      const { result, message } = await addTeamsToProjectService(
        projectId,
        records
      );

      if (!isEmpty(result)) {
        const query = {
          _start: 0,
          _end: 5
        };
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message
          })
        );
        dispatch(getAllTeamInProjectAction(projectId, query));
        dispatch(getAllTeamNotOnProjectAction(projectId, query));
      }
    } catch (err) {
      dispatch({
        type: PROJECT_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description REMOVE TEAMS FROM PROJECT ACTION
 * @param {*} projectId
 * @param {*} records
 */
export const removeTeamsFromProjectAction =
  (projectId, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PROJECT_REQUEST
      });

      const { result, message } = await removeTeamsFromProjectService(
        projectId,
        records
      );

      if (!isEmpty(result)) {
        const query = {
          _start: 0,
          _end: 5
        };
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message
          })
        );
        dispatch(getAllTeamInProjectAction(projectId, query));
        dispatch(getAllTeamNotOnProjectAction(projectId, query));
      }
    } catch (err) {
      dispatch({
        type: PROJECT_FAILURE,
        payload: err
      });
    }
  };
