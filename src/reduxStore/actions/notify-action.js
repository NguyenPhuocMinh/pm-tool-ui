import {
  NOTIFY_REQUEST,
  NOTIFY_FAILURE,
  SHOW_TOAST_CHANGE_PASSWORD_TEMPORARY_NOTIFY,
  HIDE_TOAST_CHANGE_PASSWORD_TEMPORARY_NOTIFY
} from '@reduxStore/types';
import { changePasswordTemporaryNotifyService } from '@services';
import { isEmpty } from 'lodash';

/**
 * NOTIFY FOR USER REMIND CHANGE PASSWORD NOTIFY
 * @param {*} records {data of user}
 */
export const showToastchangePasswordTemporaryNotifyAction =
  (records) => async (dispatch) => {
    try {
      dispatch({
        type: NOTIFY_REQUEST
      });
      const { result } = await changePasswordTemporaryNotifyService(records);

      if (!isEmpty(result)) {
        dispatch({
          type: SHOW_TOAST_CHANGE_PASSWORD_TEMPORARY_NOTIFY,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: NOTIFY_FAILURE,
        payload: err
      });
    }
  };

/**
 * HIDE NOTIFY FOR USER REMIND CHANGE PASSWORD NOTIFY
 */
export const hideToastChangePasswordTemporary = () => ({
  type: HIDE_TOAST_CHANGE_PASSWORD_TEMPORARY_NOTIFY
});
