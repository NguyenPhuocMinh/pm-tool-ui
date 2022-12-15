import { get, isEmpty } from 'lodash';
import constants from '@constants';
import {
  getAllUserService,
  createUserService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  addRolesToUserService,
  setPassUserByIdService,
  resetPassUserByIdService
} from '@services';
import { showNotification, hidePopup } from '@reduxStore/actions';
import {
  USER_REQUEST,
  USER_FAILURE,
  USER_RESET_RECORD,
  USER_GET_ALL_SUCCESS,
  USER_GET_ID_SUCCESS,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS
} from '@reduxStore/types';

/**
 * @description RESET RECORDS USER
 */
export const resetRecordsUser = () => ({
  type: USER_RESET_RECORD
});

/**
 * @description GET ALL USER
 * @param {*} query
 */
export const getAllUserAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REQUEST
      });

      const { result } = await getAllUserService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: USER_GET_ALL_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: USER_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description GET USER BY ID ACTION
 * @param {*} userID
 */
export const getUserByIdAction = (userID) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REQUEST
    });

    const { result } = await getUserByIdService(userID);

    if (!isEmpty(result)) {
      dispatch({
        type: USER_GET_ID_SUCCESS,
        payload: result.data
      });
    }
  } catch (err) {
    dispatch({
      type: USER_FAILURE,
      payload: err
    });
  }
};

/**
 * @description CREATE USER ACTION
 * @param {*} opts
 * @param {*} records
 */
export const createUserAction =
  (opts = {}, records = {}) =>
  async (dispatch) => {
    const { navigate } = opts;

    try {
      dispatch({
        type: USER_REQUEST
      });

      const { result, message } = await createUserService(records);

      if (!isEmpty(result)) {
        const userID = get(result, 'data.id');
        dispatch({
          type: USER_CREATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
        navigate(`/users/edit/${userID}`);
      }
    } catch (err) {
      dispatch({
        type: USER_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description UPDATE USER BY ID ACTION
 * @param {*} userID
 * @param {*} records
 */
export const updateUserByIdAction =
  (userID, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REQUEST
      });

      const { result, message } = await updateUserByIdService(userID, records);

      if (!isEmpty(result)) {
        dispatch({
          type: USER_UPDATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      }
    } catch (err) {
      dispatch({
        type: USER_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description DELETE USER BY ID ACTION
 * @param {*} userID
 * @param {*} query
 */
export const deleteUserByIdAction = (userID, query) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REQUEST
    });

    const result = await deleteUserByIdService(userID);
    if (!isEmpty(result)) {
      dispatch(
        showNotification({
          level: constants.NOTIFY_LEVEL.SUCCESS,
          message: result.message
        })
      );
      dispatch(getAllUserAction(query));
      dispatch(hidePopup());
    }
  } catch (err) {
    dispatch({
      type: USER_FAILURE,
      payload: err
    });
  }
};

/**
 * @description ADD ROLES TO USER ACTION
 * @param {*} userID
 * @param {*} records
 */
export const addRolesToUserAction =
  (userID, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REQUEST
      });

      const { result, message } = await addRolesToUserService(userID, records);

      if (!isEmpty(result)) {
        dispatch({
          type: USER_UPDATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      }
    } catch (err) {
      dispatch({
        type: USER_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description SET PASS USER BY ID ACTION
 * @param {*} userID
 * @param {*} records
 */
export const setPasswordByUserIdAction =
  (userID, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REQUEST
      });

      const { result, message } = await setPassUserByIdService(userID, records);

      if (!isEmpty(result)) {
        dispatch({
          type: USER_UPDATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      }
    } catch (err) {
      dispatch({
        type: USER_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description RESET PASS USER BY ID ACTION
 * @param {*} userID
 * @param {*} records
 */
export const resetPasswordByUserIdAction =
  (userID, records = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REQUEST
      });

      const { result, message } = await resetPassUserByIdService(
        userID,
        records
      );

      if (!isEmpty(result)) {
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
      }
    } catch (err) {
      dispatch({
        type: USER_FAILURE,
        payload: err
      });
    }
  };
