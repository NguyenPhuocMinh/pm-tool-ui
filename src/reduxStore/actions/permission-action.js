import { get, isEmpty } from 'lodash';
import constants from '@constants';
import {
  getAllPermissionService,
  createPermissionService,
  getPermissionByIdService,
  updatePermissionByIdService,
  deletePermissionByIdService,
  addRolesToPermissionService
} from '@services';
import { showNotification, hidePopup } from '@reduxStore/actions';
import {
  PERMISSION_REQUEST,
  PERMISSION_FAILURE,
  PERMISSION_RESET_RECORD,
  PERMISSION_GET_ALL_SUCCESS,
  PERMISSION_GET_ID_SUCCESS,
  PERMISSION_CREATE_SUCCESS,
  PERMISSION_UPDATE_SUCCESS
} from '@reduxStore/types';

/**
 * @description RESET RECORDS PERMISSION
 */
export const resetRecordsPermission = () => ({
  type: PERMISSION_RESET_RECORD
});

/**
 * @description GET ALL PERMISSION
 * @param {*} query
 */
export const getAllPermissionAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PERMISSION_REQUEST
      });

      const { result } = await getAllPermissionService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: PERMISSION_GET_ALL_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: PERMISSION_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description GET PERMISSION BY ID ACTION
 * @param {*} permissionID
 * @param {*} values
 */
export const getPermissionByIdAction = (permissionID) => async (dispatch) => {
  try {
    dispatch({
      type: PERMISSION_REQUEST
    });

    const { result } = await getPermissionByIdService(permissionID);

    if (!isEmpty(result)) {
      dispatch({
        type: PERMISSION_GET_ID_SUCCESS,
        payload: result.data
      });
    }
  } catch (err) {
    dispatch({
      type: PERMISSION_FAILURE,
      payload: err
    });
  }
};

/**
 * @description CREATE PERMISSION ACTION
 * @param {*} opts
 * @param {*} records
 */
export const createPermissionAction =
  (opts = {}, records = {}) =>
  async (dispatch) => {
    const { navigate } = opts;

    try {
      dispatch({
        type: PERMISSION_REQUEST
      });

      const { result, message } = await createPermissionService(records);

      if (!isEmpty(result)) {
        const permissionID = get(result, 'data.id');
        dispatch({
          type: PERMISSION_CREATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
        navigate(`/permissions/edit/${permissionID}`);
      }
    } catch (err) {
      dispatch({
        type: PERMISSION_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description UPDATE PERMISSION BY ID ACTION
 * @param {*} permissionID
 * @param {*} records
 */
export const updatePermissionByIdAction =
  (permissionID, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PERMISSION_REQUEST
      });

      const { result, message } = await updatePermissionByIdService(
        permissionID,
        records
      );

      if (!isEmpty(result)) {
        dispatch({
          type: PERMISSION_UPDATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      }
    } catch (err) {
      dispatch({
        type: PERMISSION_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description DELETE PERMISSION BY ID ACTION
 * @param {*} permissionID
 * @param {*} query
 */
export const deletePermissionByIdAction =
  (permissionID, query) => async (dispatch) => {
    try {
      dispatch({
        type: PERMISSION_REQUEST
      });

      const result = await deletePermissionByIdService(permissionID);
      if (!isEmpty(result)) {
        dispatch(
          showNotification(constants.NOTIFY_LEVEL.SUCCESS, result.message)
        );
        dispatch(getAllPermissionAction(query));
        dispatch(hidePopup());
      }
    } catch (err) {
      dispatch({
        type: PERMISSION_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description ADD ROLES TO PERMISSION ACTION
 * @param {*} permissionID
 * @param {*} records
 */
export const addRolesToPermissionAction =
  (permissionID, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PERMISSION_REQUEST
      });

      const { result, message } = await addRolesToPermissionService(
        permissionID,
        records
      );

      if (!isEmpty(result)) {
        dispatch({
          type: PERMISSION_UPDATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      }
    } catch (err) {
      dispatch({
        type: PERMISSION_FAILURE,
        payload: err
      });
    }
  };
