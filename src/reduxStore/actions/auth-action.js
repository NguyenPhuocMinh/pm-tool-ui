import { isEmpty } from 'lodash';
import constants from '@constants';
import { formatErrorCommonMsg } from '@utils';
import { loginService, logoutService } from '@services';
import { showNotification, removeLogin } from '@reduxStore/actions';
import decodeJWT from 'jwt-decode';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_END,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_END
} from '../types';

/**
 * LOGIN ACTION
 * @param {*} navigate
 * @param {*} params
 */
export const loginAction = (navigate, params) => async (dispatch) => {
  try {
    const { email, password } = params;
    dispatch({
      type: LOGIN_REQUEST
    });
    const result = await loginService(email, password);
    const { token } = result;
    const decodeToken = decodeJWT(token);

    if (!isEmpty(decodeToken.name)) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: result.token,
          name: decodeToken.name,
          email: decodeToken.email
        }
      });
      dispatch({
        type: LOGIN_END
      });
      dispatch(
        showNotification(constants.NOTIFY_LEVEL.SUCCESS, result.message)
      );
      navigate('/dashboard');
    }
  } catch (err) {
    dispatch({
      type: LOGIN_END
    });
    const errMsg = formatErrorCommonMsg(err);
    dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errMsg));
  }
};

/**
 * LOGOUT ACTION
 * @param {*} navigate
 * @param {*} params
 */
export const logoutAction = (navigate) => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_REQUEST
    });
    removeLogin(dispatch);
    const result = await logoutService();
    if (!isEmpty(result)) {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: {
          isAuthenticated: false,
          token: null
        }
      });
      dispatch({
        type: LOGOUT_END
      });
      dispatch(
        showNotification(constants.NOTIFY_LEVEL.SUCCESS, result.message)
      );
      navigate('/login');
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_END
    });
    const errMsg = formatErrorCommonMsg(err);
    dispatch(showNotification(constants.NOTIFY_LEVEL.ERROR, errMsg));
  }
};
