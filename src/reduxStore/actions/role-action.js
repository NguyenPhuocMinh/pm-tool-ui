import { get, isEmpty } from 'lodash';
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
  ROLE_REQUEST,
  ROLE_FAILURE,
  ROLE_RESET_RECORD,
  ROLE_GET_ALL_SUCCESS,
  ROLE_GET_ID_SUCCESS,
  ROLE_CREATE_SUCCESS,
  ROLE_UPDATE_SUCCESS,
  ROLE_GET_ALL_USER_SUCCESS,
  ROLE_GET_ALL_PERMISSION_SUCCESS
} from '@reduxStore/types';

export const resetRecordsRole = () => ({
  type: ROLE_RESET_RECORD
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
        type: ROLE_REQUEST
      });

      const { result } = await getAllRoleService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: ROLE_GET_ALL_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: ROLE_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description GET ROLE BY ID ACTION
 * @param {*} roleID
 */
export const getRoleByIdAction = (roleID) => async (dispatch) => {
  try {
    dispatch({
      type: ROLE_REQUEST
    });

    const { result } = await getRoleByIdService(roleID);

    if (!isEmpty(result)) {
      dispatch({
        type: ROLE_GET_ID_SUCCESS,
        payload: result.data
      });
    }
  } catch (err) {
    dispatch({
      type: ROLE_FAILURE,
      payload: err
    });
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
        type: ROLE_REQUEST
      });

      const { result, message } = await createRoleService(values);

      if (!isEmpty(result)) {
        const roleID = get(result, 'data.id');
        dispatch({
          type: ROLE_CREATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
        navigate(`/roles/edit/${roleID}`);
      }
    } catch (err) {
      dispatch({
        type: ROLE_FAILURE
      });
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
        type: ROLE_REQUEST
      });

      const { result, message } = await updateRoleByIdService(roleID, values);

      if (!isEmpty(result)) {
        dispatch({
          type: ROLE_UPDATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      }
    } catch (err) {
      dispatch({
        type: ROLE_FAILURE,
        payload: err
      });
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
      type: ROLE_REQUEST
    });

    const result = await deleteRoleByIdService(roleID);
    if (!isEmpty(result)) {
      dispatch(
        showNotification({
          level: constants.NOTIFY_LEVEL.SUCCESS,
          message: result.message
        })
      );
      dispatch(getAllRoleAction(query));
      dispatch(hidePopup());
    }
  } catch (err) {
    dispatch({
      type: ROLE_FAILURE,
      payload: err
    });
  }
};

/**
 * @description GET ALL USER BY ROLE ID ACTION
 * @param {*} roleID
 * @param {*} query
 */
export const getUsersByRoleIDAction = (roleID, query) => async (dispatch) => {
  try {
    dispatch({
      type: ROLE_REQUEST
    });

    const { result } = await getUsersInRoleByRoleNameService(roleID, query);

    if (!isEmpty(result)) {
      dispatch({
        type: ROLE_GET_ALL_USER_SUCCESS,
        payload: {
          data: result.data,
          total: result.total
        }
      });
    }
  } catch (err) {
    dispatch({
      type: ROLE_FAILURE,
      payload: err
    });
  }
};

/**
 * @description GET ALL PERMISSION BY ROLE NAME ACTION
 * @param {*} roleID
 * @param {*} query
 */
export const getPermissionsByRoleIDAction =
  (roleID, query) => async (dispatch) => {
    try {
      dispatch({
        type: ROLE_REQUEST
      });

      const { result } = await getPermissionsInRoleByRoleIDService(
        roleID,
        query
      );

      if (!isEmpty(result)) {
        dispatch({
          type: ROLE_GET_ALL_PERMISSION_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: ROLE_FAILURE,
        payload: err
      });
    }
  };
