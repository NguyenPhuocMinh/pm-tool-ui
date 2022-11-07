import { get, isEmpty } from 'lodash';
import { formatErrorCommonMsg } from '@utils';
import constants from '@constants';
import {
  getAllRoleService,
  createRoleService,
  getRoleByIdService,
  updateRoleByIdService,
  deleteRoleByIdService,
  getUsersInRoleByRoleNameService,
  getPermissionsInRoleByRoleIDService
} from '@services';
import { showNotification, hidePopup } from '@reduxStore/actions';
import {
  CALL_REQUEST_ROLE,
  END_REQUEST_ROLE,
  RESET_RECORDS_ROLE,
  GET_ALL_ROLE,
  CREATE_ROLE,
  GET_ID_ROLE,
  EDIT_ROLE,
  GET_ALL_USER_IN_ROLE,
  GET_ALL_PERMISSION_IN_ROLE
} from '@reduxStore/types';

export const resetRecordsRole = () => ({
  type: RESET_RECORDS_ROLE
});

/**
 * @description GET ALL ROLE ACTION
 * @param {*} query
 */
export const getAllRoleAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST_ROLE
      });

      const { result } = await getAllRoleService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_ROLE,
          payload: {
            data: result.data,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST_ROLE
        });
      } else {
        dispatch({
          type: END_REQUEST_ROLE
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_ROLE
      });
      const errorMsg = formatErrorCommonMsg(err);
      dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
    }
  };

/**
 * @description CREATE ROLE ACTION
 * @param {*} opts
 * @param {*} values
 */
export const createRoleAction =
  (opts = {}, values = {}) =>
  async (dispatch) => {
    const { navigate } = opts;
    try {
      dispatch({
        type: CALL_REQUEST_ROLE
      });

      const { result, message } = await createRoleService(values);

      if (!isEmpty(result)) {
        const roleID = get(result, 'data.id');
        dispatch({
          type: CREATE_ROLE,
          payload: result.data
        });
        dispatch(showNotification(constants.NOTIFY_LEVEL.SUCCESS, message));
        dispatch({
          type: END_REQUEST_ROLE
        });
        navigate(`/roles/edit/${roleID}`);
      } else {
        dispatch({
          type: END_REQUEST_ROLE
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_ROLE
      });
      const errorMsg = formatErrorCommonMsg(err);
      dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
    }
  };

/**
 * @description GET ROLE BY ID ACTION
 * @param {*} roleID
 */
export const getRoleByIdAction = (roleID) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST_ROLE
    });

    const { result } = await getRoleByIdService(roleID);

    if (!isEmpty(result)) {
      dispatch({
        type: GET_ID_ROLE,
        payload: result.data
      });
      dispatch({
        type: END_REQUEST_ROLE
      });
    } else {
      dispatch({
        type: END_REQUEST_ROLE
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_ROLE
    });
    const errorMsg = formatErrorCommonMsg(err);
    dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
  }
};

/**
 * @description UPDATE ROLE BY ID ACTION
 * @param {*} roleID
 * @param {*} values
 */
export const updateRoleByIdAction =
  (roleID, values = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST_ROLE
      });

      const { result, message } = await updateRoleByIdService(roleID, values);

      if (!isEmpty(result)) {
        dispatch({
          type: EDIT_ROLE,
          payload: result.data
        });
        dispatch({
          type: END_REQUEST_ROLE
        });
        dispatch(showNotification(constants.NOTIFY_LEVEL.SUCCESS, message));
      } else {
        dispatch({
          type: END_REQUEST_ROLE
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_ROLE
      });
      const errorMsg = formatErrorCommonMsg(err);
      dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
    }
  };

/**
 * @description DELETE ROLE BY ID ACTION
 * @param {*} roleID
 * @param {*} query
 */
export const deleteRoleByIdAction = (roleID, query) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST_ROLE
    });

    const result = await deleteRoleByIdService(roleID);
    if (!isEmpty(result)) {
      dispatch(
        showNotification(constants.NOTIFY_LEVEL.SUCCESS, result.message)
      );
      dispatch(getAllRoleAction(query));
      dispatch(hidePopup());
    } else {
      dispatch({
        type: END_REQUEST_ROLE
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_ROLE
    });
    const errorMsg = formatErrorCommonMsg(err);
    dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
  }
};

/**
 * @description GET ALL USER BY ROLE NAME ACTION
 * @param {*} roleName
 * @param {*} query
 */
export const getUsersByRoleNameAction =
  (roleName, query) => async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST_ROLE
      });

      const { result } = await getUsersInRoleByRoleNameService(roleName, query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_USER_IN_ROLE,
          payload: {
            data: result.data,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST_ROLE
        });
      } else {
        dispatch({
          type: END_REQUEST_ROLE
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_ROLE
      });
      const errorMsg = formatErrorCommonMsg(err);
      dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
    }
  };

/**
 * @description GET ALL PERMISSION BY ROLE NAME ACTION
 * @param {*} roleID
 * @param {*} query
 */
export const getPermissionsByRoleNameAction =
  (roleID, query) => async (dispatch) => {
    try {
      dispatch({
        type: CALL_REQUEST_ROLE
      });

      const { result } = await getPermissionsInRoleByRoleIDService(
        roleID,
        query
      );

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_PERMISSION_IN_ROLE,
          payload: {
            data: result.data,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST_ROLE
        });
      } else {
        dispatch({
          type: END_REQUEST_ROLE
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_ROLE
      });
      const errorMsg = formatErrorCommonMsg(err);
      dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
    }
  };
