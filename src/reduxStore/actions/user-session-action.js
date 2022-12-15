import { isEmpty } from 'lodash';
import constants from '@constants';
import {
  getTimeLineUserSessionService,
  createUserSessionService,
  deleteSessionByIdService
} from '@services';
import { showNotification, hidePopup } from '@reduxStore/actions';
import {
  USER_SESSION_REQUEST,
  USER_SESSION_FAILURE,
  USER_SESSION_RESET_RECORD,
  USER_SESSION_TIME_LINE_SUCCESS,
  USER_SESSION_CREATE_USER_SUCCESS
} from '@reduxStore/types';

export const resetRecordsUserSession = () => ({
  type: USER_SESSION_RESET_RECORD
});

/**
 * @description GET TIME LINE USER SESSION ACTION
 */
export const getTimeLineUserSessionAction = (userID) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SESSION_REQUEST
    });

    const { result } = await getTimeLineUserSessionService(userID);

    if (!isEmpty(result)) {
      dispatch({
        type: USER_SESSION_TIME_LINE_SUCCESS,
        payload: {
          data: result.data,
          total: result.total
        }
      });
    }
  } catch (err) {
    dispatch({
      type: USER_SESSION_FAILURE
    });
  }
};

/**
 * @description CREATE SESSION ACTION
 * @param {*} records {userID}
 */
export const createUserSessionAction = (records) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SESSION_REQUEST
    });

    const { result } = await createUserSessionService(records);

    if (!isEmpty(result)) {
      dispatch({
        type: USER_SESSION_CREATE_USER_SUCCESS,
        payload: result.data
      });
    }
  } catch (err) {
    dispatch({
      type: USER_SESSION_FAILURE,
      payload: err
    });
  }
};

/**
 * @description DELETE SESSION BY ID ACTION
 * @param {*} sessionID
 * @param {*} query
 */
export const deleteSessionByIdAction = (sessionID) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SESSION_REQUEST
    });

    const result = await deleteSessionByIdService(sessionID);
    if (!isEmpty(result)) {
      dispatch(
        showNotification({
          level: constants.NOTIFY_LEVEL.SUCCESS,
          message: result.message
        })
      );
      dispatch(hidePopup());
    }
  } catch (err) {
    dispatch({
      type: USER_SESSION_FAILURE,
      payload: err
    });
  }
};
