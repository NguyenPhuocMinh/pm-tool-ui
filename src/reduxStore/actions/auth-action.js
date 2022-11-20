import { isEmpty } from 'lodash';
import constants from '@constants';
import { localForage } from '@utils';
import { loginService, logoutService, refreshTokenService } from '@services';
import { showNotification, removeLogin } from '@reduxStore/actions';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_END,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_END,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_END
} from '@reduxStore/types';

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
    const { result, message } = await loginService(email, password);

    if (!isEmpty(result)) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: result.data
      });
      dispatch({
        type: LOGIN_END
      });
      localForage.setItem(
        constants.LOCAL_FORAGE_KEYS.TOKEN,
        result?.data?.token
      );
      dispatch(showNotification(constants.NOTIFY_LEVEL.SUCCESS, message));
      navigate('/');
    }
  } catch (err) {
    dispatch({
      type: LOGIN_END
    });
  }
};

/**
 * LOGOUT ACTION
 * @param {*} navigate
 * @param {*} params
 */
export const logoutAction = (navigate, params) => async (dispatch) => {
  try {
    const { email } = params;
    dispatch({
      type: LOGOUT_REQUEST
    });
    dispatch(removeLogin());

    const { result, message } = await logoutService(email);

    if (!isEmpty(result)) {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: {
          token: null,
          payload: null
        }
      });
      dispatch({
        type: LOGOUT_END
      });
      localForage.removeItem(constants.LOCAL_FORAGE_KEYS.TOKEN);
      dispatch(showNotification(constants.NOTIFY_LEVEL.SUCCESS, message));
      navigate('/login');
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_END
    });
  }
};

/**
 * REFRESH TOKEN ACTION
 * @param {*} navigate
 * @param {*} params
 */
export const refreshTokenAction = (navigate, params) => async (dispatch) => {
  try {
    const { email } = params;

    dispatch({
      type: REFRESH_REQUEST
    });

    const { result } = await refreshTokenService(email);

    if (!isEmpty(result)) {
      dispatch({
        type: REFRESH_SUCCESS,
        payload: result.data
      });
    }
  } catch (err) {
    if (err.response.status === constants.HTTP_STATUS.AUTHORIZATION) {
      navigate('/login');
    }
    dispatch({
      type: REFRESH_END
    });
  }
};
