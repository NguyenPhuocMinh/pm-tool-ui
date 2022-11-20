import { isEmpty, get } from 'lodash';
import {
  getAllOrganizationService,
  createOrganizationService,
  getByIdOrganizationService,
  updateByIdOrganizationService,
  deleteOrganizationByIdService
} from '@services';
import { showNotification } from '@reduxStore/actions';
import constants from '@constants';

import {
  CALL_REQUEST_ORGANIZATION,
  END_REQUEST_ORGANIZATION,
  GET_ALL_ORGANIZATION,
  CREATE_ORGANIZATION,
  GET_ID_ORGANIZATION,
  EDIT_ORGANIZATION
} from '@reduxStore/types';

/**
 * @description GET ALL ORGANIZATION ACTION
 * @param {*} query
 */
export const getAllOrganizationAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST_ORGANIZATION
      });

      const { result } = await getAllOrganizationService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_ORGANIZATION,
          payload: {
            data: result.data,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST_ORGANIZATION
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_ORGANIZATION
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
        type: CALL_REQUEST_ORGANIZATION
      });

      const { result } = await createOrganizationService(records);

      if (!isEmpty(result)) {
        const organizationID = get(result, 'response.id');
        dispatch({
          type: CREATE_ORGANIZATION,
          payload: result
        });
        dispatch(
          showNotification(constants.NOTIFY_LEVEL.SUCCESS, result.message)
        );
        dispatch({
          type: END_REQUEST_ORGANIZATION
        });
        navigate(`/organizations/edit/${organizationID}`);
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_ORGANIZATION
      });
    }
  };

/**
 * @description GET ORGANIZATION BY ID ACTION
 * @param {*} OrganizationID
 */
export const getOrganizationByIdAction =
  (OrganizationID) => async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST_ORGANIZATION
      });

      const data = getByIdOrganizationService(OrganizationID);

      if (!isEmpty(data)) {
        dispatch({
          type: GET_ID_ORGANIZATION,
          payload: {
            record: data
          }
        });
        dispatch({
          type: END_REQUEST_ORGANIZATION
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_ORGANIZATION
      });
    }
  };

/**
 * @description UPDATE ORGANIZATION BY ID ACTION
 * @param {*} organizationID
 * @param {*} records
 */
export const updateOrganizationByIdAction =
  (organizationID, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST_ORGANIZATION
      });
      const { result, message } = await updateByIdOrganizationService(
        organizationID,
        records
      );

      if (!isEmpty(result)) {
        dispatch({
          type: EDIT_ORGANIZATION,
          payload: result.response
        });
        dispatch({
          type: END_REQUEST_ORGANIZATION
        });
        dispatch(showNotification(constants.NOTIFY_LEVEL.SUCCESS, message));
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_ORGANIZATION
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
        type: CALL_REQUEST_ORGANIZATION
      });

      const { result } = await deleteOrganizationByIdService(organizationID);

      if (!isEmpty(result)) {
        dispatch(
          showNotification(constants.NOTIFY_LEVEL.SUCCESS, result.message)
        );
        dispatch(getAllOrganizationAction(query));
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_ORGANIZATION
      });
    }
  };
