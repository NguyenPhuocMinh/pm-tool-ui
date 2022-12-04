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
  CALL_REQUEST_PERMISSION,
  END_REQUEST_PERMISSION,
  RESET_RECORDS_PERMISSION,
  GET_ALL_PERMISSION,
  CREATE_PERMISSION,
  GET_ID_PERMISSION,
  EDIT_PERMISSION
} from '@reduxStore/types';

/**
 * @description RESET RECORDS PERMISSION
 */
export const resetRecordsPermission = () => ({
  type: RESET_RECORDS_PERMISSION
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
        type: CALL_REQUEST_PERMISSION
      });

      const { result } = await getAllPermissionService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_PERMISSION,
          payload: {
            data: result.data,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST_PERMISSION
        });
      } else {
        dispatch({
          type: END_REQUEST_PERMISSION
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_PERMISSION
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
        type: CALL_REQUEST_PERMISSION
      });

      const { result, message } = await createPermissionService(records);

      if (!isEmpty(result)) {
        const permissionID = get(result, 'data.id');
        dispatch({
          type: CREATE_PERMISSION,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
        dispatch({
          type: END_REQUEST_PERMISSION
        });
        navigate(`/permissions/edit/${permissionID}`);
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_PERMISSION
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
      type: CALL_REQUEST_PERMISSION
    });

    const { result } = await getPermissionByIdService(permissionID);

    if (!isEmpty(result)) {
      dispatch({
        type: GET_ID_PERMISSION,
        payload: result.data
      });
    } else {
      dispatch({
        type: END_REQUEST_PERMISSION
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_PERMISSION
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
        type: CALL_REQUEST_PERMISSION
      });

      const { result, message } = await updatePermissionByIdService(
        permissionID,
        records
      );

      if (!isEmpty(result)) {
        dispatch({
          type: EDIT_PERMISSION,
          payload: result.data
        });
        dispatch({
          type: END_REQUEST_PERMISSION
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      } else {
        dispatch({
          type: END_REQUEST_PERMISSION
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_PERMISSION
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
        type: CALL_REQUEST_PERMISSION
      });

      const result = await deletePermissionByIdService(permissionID);
      if (!isEmpty(result)) {
        dispatch(
          showNotification(constants.NOTIFY_LEVEL.SUCCESS, result.message)
        );
        dispatch(getAllPermissionAction(query));
        dispatch(hidePopup());
      } else {
        dispatch({
          type: END_REQUEST_PERMISSION
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_PERMISSION
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
        type: CALL_REQUEST_PERMISSION
      });

      const { result, message } = await addRolesToPermissionService(
        permissionID,
        records
      );

      if (!isEmpty(result)) {
        dispatch({
          type: EDIT_PERMISSION,
          payload: result.data
        });
        dispatch({
          type: END_REQUEST_PERMISSION
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      } else {
        dispatch({
          type: END_REQUEST_PERMISSION
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_PERMISSION
      });
    }
  };
