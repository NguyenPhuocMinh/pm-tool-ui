import { isEmpty, get } from 'lodash';
import {
  getAllProjectService,
  createProjectService,
  getByIdProjectService,
  updateByIdProjectService,
  deleteProjectByIdService
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
  PROJECT_UPDATE_SUCCESS
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
        type: PROJECT_FAILURE
      });
    }
  };

/**
 * @description GET PROJECT BY ID ACTION
 * @param {*} ProjectID
 */
export const getProjectByIdAction = (ProjectID) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_REQUEST
    });

    const data = getByIdProjectService(ProjectID);

    if (!isEmpty(data)) {
      dispatch({
        type: PROJECT_GET_ID_SUCCESS,
        payload: {
          record: data
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
        const organizationID = get(result, 'response.id');
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
        navigate(`/organizations/edit/${organizationID}`);
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
 * @param {*} organizationID
 * @param {*} records
 */
export const updateProjectByIdAction =
  (organizationID, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PROJECT_REQUEST
      });
      const { result, message } = await updateByIdProjectService(
        organizationID,
        records
      );

      if (!isEmpty(result)) {
        dispatch({
          type: PROJECT_UPDATE_SUCCESS,
          payload: result.response
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
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
 * @param {*} organizationID
 * @param {*} query
 */
export const deleteProjectByIdAction =
  (organizationID, query) => async (dispatch) => {
    try {
      dispatch({
        type: PROJECT_REQUEST
      });

      const { result } = await deleteProjectByIdService(organizationID);

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
