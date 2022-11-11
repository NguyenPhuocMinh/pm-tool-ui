import { get, isEmpty } from 'lodash';
import { formatErrorCommonMsg } from '@utils';
import constants from '@constants';
import {
  getAllUserService,
  createUserService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  addRolesToUserService,
  setPassUserByIdService
} from '@services';
import { showNotification, hidePopup } from '@reduxStore/actions';
import {
  CALL_REQUEST_USER,
  END_REQUEST_USER,
  RESET_RECORDS_USER,
  GET_ALL_USER,
  CREATE_USER,
  GET_ID_USER,
  EDIT_USER
} from '@reduxStore/types';

/**
 * @description RESET RECORDS USER
 */
export const resetRecordsUser = () => ({
  type: RESET_RECORDS_USER
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
        type: CALL_REQUEST_USER
      });

      const { result } = await getAllUserService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: GET_ALL_USER,
          payload: {
            data: result.data,
            total: result.total
          }
        });
        dispatch({
          type: END_REQUEST_USER
        });
      } else {
        dispatch({
          type: END_REQUEST_USER
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_USER
      });
      const errorMsg = formatErrorCommonMsg(err);
      dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
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
        type: CALL_REQUEST_USER
      });

      const { result, message } = await createUserService(records);

      if (!isEmpty(result)) {
        const userID = get(result, 'data.id');
        dispatch({
          type: CREATE_USER,
          payload: result.data
        });
        dispatch(showNotification(constants.NOTIFY_LEVEL.SUCCESS, message));
        dispatch({
          type: END_REQUEST_USER
        });
        navigate(`/users/edit/${userID}`);
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_USER
      });
      const errorMsg = formatErrorCommonMsg(err);
      dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
    }
  };

/**
 * @description GET USER BY ID ACTION
 * @param {*} userID
 */
export const getUserByIdAction = (userID) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST_USER
    });

    const { result } = await getUserByIdService(userID);

    if (!isEmpty(result)) {
      dispatch({
        type: GET_ID_USER,
        payload: result.data
      });
    } else {
      dispatch({
        type: END_REQUEST_USER
      });
    }
  } catch (err) {
    const errorMsg = formatErrorCommonMsg(err);
    dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
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
        type: CALL_REQUEST_USER
      });

      const { result, message } = await updateUserByIdService(userID, records);

      if (!isEmpty(result)) {
        dispatch({
          type: EDIT_USER,
          payload: result.data
        });
        dispatch({
          type: END_REQUEST_USER
        });
        dispatch(showNotification(constants.NOTIFY_LEVEL.SUCCESS, message));
      } else {
        dispatch({
          type: END_REQUEST_USER
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_USER
      });
      const errorMsg = formatErrorCommonMsg(err);
      dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
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
      type: CALL_REQUEST_USER
    });

    const result = await deleteUserByIdService(userID);
    if (!isEmpty(result)) {
      dispatch(
        showNotification(constants.NOTIFY_LEVEL.SUCCESS, result.message)
      );
      dispatch(getAllUserAction(query));
      dispatch(hidePopup());
    } else {
      dispatch({
        type: END_REQUEST_USER
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_USER
    });
    const errorMsg = formatErrorCommonMsg(err);
    dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
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
        type: CALL_REQUEST_USER
      });

      const { result, message } = await addRolesToUserService(userID, records);

      if (!isEmpty(result)) {
        dispatch({
          type: EDIT_USER,
          payload: result.data
        });
        dispatch({
          type: END_REQUEST_USER
        });
        dispatch(showNotification(constants.NOTIFY_LEVEL.SUCCESS, message));
      } else {
        dispatch({
          type: END_REQUEST_USER
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_USER
      });
      const errorMsg = formatErrorCommonMsg(err);
      dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
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
        type: CALL_REQUEST_USER
      });

      const { result, message } = await setPassUserByIdService(userID, records);

      if (!isEmpty(result)) {
        dispatch({
          type: EDIT_USER,
          payload: result.data
        });
        dispatch({
          type: END_REQUEST_USER
        });
        dispatch(showNotification(constants.NOTIFY_LEVEL.SUCCESS, message));
      } else {
        dispatch({
          type: END_REQUEST_USER
        });
      }
    } catch (err) {
      dispatch({
        type: END_REQUEST_USER
      });
      const errorMsg = formatErrorCommonMsg(err);
      dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errorMsg));
    }
  };
