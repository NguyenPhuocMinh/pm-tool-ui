import { isEmpty, get } from 'lodash';
import {
  getAllOrganizationService,
  createOrganizationService,
  getOrganizationService,
  updateOrganizationService,
  deleteOrganizationByIdService,
  getAllProjectInOrganizationService
} from '@services';
import { showNotification } from '@reduxStore/actions';
import constants from '@constants';
import {
  ORGANIZATION_REQUEST,
  ORGANIZATION_FAILURE,
  ORGANIZATION_RESET_RECORD,
  ORGANIZATION_GET_ALL_SUCCESS,
  ORGANIZATION_GET_ID_SUCCESS,
  ORGANIZATION_CREATE_SUCCESS,
  ORGANIZATION_UPDATE_SUCCESS,
  ORGANIZATION_GET_ALL_PROJECT_SUCCESS
} from '@reduxStore/types';

export const resetRecordsOrganization = () => ({
  type: ORGANIZATION_RESET_RECORD
});

/**
 * @description GET ALL ORGANIZATION ACTION
 * @param {*} query
 */
export const getAllOrganizationAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ORGANIZATION_REQUEST
      });

      const { result } = await getAllOrganizationService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: ORGANIZATION_GET_ALL_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: ORGANIZATION_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description GET ORGANIZATION BY ID ACTION
 * @param {*} organizationId
 */
export const getOrganizationAction = (organizationId) => async (dispatch) => {
  try {
    dispatch({
      type: ORGANIZATION_REQUEST
    });

    const { result } = await getOrganizationService(organizationId);

    if (!isEmpty(result)) {
      dispatch({
        type: ORGANIZATION_GET_ID_SUCCESS,
        payload: result.data
      });
    }
  } catch (err) {
    dispatch({
      type: ORGANIZATION_FAILURE,
      payload: err
    });
  }
};

/**
 * @description CREATE ORGANIZATION ACTION
 * @param {*} opts
 * @param {*} records
 */
export const createOrganizationAction =
  (opts = {}, records = {}) =>
  async (dispatch) => {
    const { navigate } = opts;
    try {
      dispatch({
        type: ORGANIZATION_REQUEST
      });

      const { result } = await createOrganizationService(records);

      if (!isEmpty(result)) {
        const organizationID = get(result, 'response.id');
        dispatch({
          type: ORGANIZATION_CREATE_SUCCESS,
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
        type: ORGANIZATION_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description UPDATE ORGANIZATION BY ID ACTION
 * @param {*} organizationID
 * @param {*} records
 */
export const updateOrganizationAction =
  (organizationID, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ORGANIZATION_REQUEST
      });
      const { result, message } = await updateOrganizationService(
        organizationID,
        records
      );

      if (!isEmpty(result)) {
        dispatch({
          type: ORGANIZATION_UPDATE_SUCCESS,
          payload: result.response
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      }
    } catch (err) {
      dispatch({
        type: ORGANIZATION_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description DELETE ORGANIZATION BY ID ACTION
 * @param {*} organizationID
 * @param {*} query
 */
export const deleteOrganizationByIdAction =
  (organizationID, query) => async (dispatch) => {
    try {
      dispatch({
        type: ORGANIZATION_REQUEST
      });

      const { result } = await deleteOrganizationByIdService(organizationID);

      if (!isEmpty(result)) {
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message: result.message
          })
        );
        dispatch(getAllOrganizationAction(query));
      }
    } catch (err) {
      dispatch({
        type: ORGANIZATION_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description GET ALL PROJECT ORGANIZATION ACTION
 * @param {*} organizationID
 * @param {*} query
 */
export const getAllProjectInOrganizationAction =
  (organizationID, query) => async (dispatch) => {
    try {
      dispatch({
        type: ORGANIZATION_REQUEST
      });

      const { result } = await getAllProjectInOrganizationService(
        organizationID,
        query
      );

      if (!isEmpty(result)) {
        dispatch({
          type: ORGANIZATION_GET_ALL_PROJECT_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: ORGANIZATION_FAILURE,
        payload: err
      });
    }
  };
