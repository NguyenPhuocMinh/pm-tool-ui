import { isEmpty } from 'lodash';
import constants from '@constants';
import {
  getTimeLineUserSessionService,
  createUserSessionService,
  deleteSessionByIdService
} from '@services';
import { showNotification, hidePopup } from '@reduxStore/actions';
import {
  CALL_REQUEST_USER_SESSION,
  END_REQUEST_USER_SESSION,
  RESET_RECORDS_USER_SESSION,
  TIME_LINE_USER_SESSION,
  CREATE_USER_SESSION
} from '@reduxStore/types';

export const resetRecordsUserSession = () => ({
  type: RESET_RECORDS_USER_SESSION
});

/**
 * @description GET TIME LINE USER SESSION ACTION
 */
export const getTimeLineUserSessionAction = (userID) => async (dispatch) => {
  try {
    dispatch({
      type: CALL_REQUEST_USER_SESSION
    });

    const { result } = await getTimeLineUserSessionService(userID);

    if (!isEmpty(result)) {
      dispatch({
        type: TIME_LINE_USER_SESSION,
        payload: {
          data: result.data,
          total: result.total
        }
      });
      dispatch({
        type: END_REQUEST_USER_SESSION
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_USER_SESSION
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
      type: CALL_REQUEST_USER_SESSION
    });

    const { result } = await createUserSessionService(records);

    if (!isEmpty(result)) {
      dispatch({
        type: CREATE_USER_SESSION,
        payload: result.data
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_USER_SESSION
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
      type: CALL_REQUEST_USER_SESSION
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
    } else {
      dispatch({
        type: END_REQUEST_USER_SESSION
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_USER_SESSION
    });
  }
};
