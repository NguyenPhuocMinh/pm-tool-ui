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
  CALL_REQUEST_PROJECT,
  END_REQUEST_PROJECT,
  GET_ALL_PROJECT,
  CREATE_PROJECT,
  GET_ID_PROJECT,
  EDIT_PROJECT
} from '@reduxStore/types';

/**
 * @description GET ALL PROJECT ACTION
 * @param {*} query
 */
export const getAllProjectAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST_PROJECT
      });

      const { result } = await getAllProjectService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_PROJECT,
          payload: {
            data: result.data,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST_PROJECT
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_PROJECT
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
        type: CALL_REQUEST_PROJECT
      });

      const { result } = await createProjectService(records);

      if (!isEmpty(result)) {
        const organizationID = get(result, 'response.id');
        dispatch({
          type: CREATE_PROJECT,
          payload: result
        });
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message: result.message
          })
        );
        dispatch({
          type: END_REQUEST_PROJECT
        });
        navigate(`/organizations/edit/${organizationID}`);
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_PROJECT
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
      type: CALL_REQUEST_PROJECT
    });

    const data = getByIdProjectService(ProjectID);

    if (!isEmpty(data)) {
      dispatch({
        type: GET_ID_PROJECT,
        payload: {
          record: data
        }
      });
      dispatch({
        type: END_REQUEST_PROJECT
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_PROJECT
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
        type: CALL_REQUEST_PROJECT
      });
      const { result, message } = await updateByIdProjectService(
        organizationID,
        records
      );

      if (!isEmpty(result)) {
        dispatch({
          type: EDIT_PROJECT,
          payload: result.response
        });
        dispatch({
          type: END_REQUEST_PROJECT
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_PROJECT
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
        type: CALL_REQUEST_PROJECT
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
        type: END_REQUEST_PROJECT
      });
    }
  };
