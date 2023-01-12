import { isEmpty } from 'lodash';
import constants from '@constants';
import { localForage } from '@utils';
import {
  loginService,
  logoutService,
  whoamiService,
  refreshTokenService,
  revokeTokenService
} from '@services';
import {
  showNotification,
  removeLogin,
  createUserSessionAction,
  showToastchangePasswordTemporaryNotifyAction
} from '@reduxStore/actions';
import {
  AUTH_REQUEST,
  AUTH_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_WHOAMI_SUCCESS,
  AUTH_REFRESH_SUCCESS
} from '@reduxStore/types';

/**
 * LOGIN ACTION
 * @param {*} toolBox
 * @param {*} records {email, password}
 */
export const loginAction = (toolBox, records) => async (dispatch) => {
  try {
    const { navigate } = toolBox;
    dispatch({
      type: AUTH_REQUEST
    });
    const { result, message } = await loginService(records);

    if (!isEmpty(result)) {
      const { token } = result;
      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: token
      });
      localForage.setItem(constants.LOCAL_FORAGE_KEYS.TOKEN, token);
      // wait 1000ms for store token in localStorage
      setTimeout(() => {
        dispatch(whoamiAction({ email: records.email }));
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message
          })
        );
        navigate('/');
      }, 1000);
    }
  } catch (err) {
    dispatch({
      type: AUTH_FAILURE,
      payload: err
    });
  }
};

/**
 * LOGOUT ACTION
 * @param {*} toolBox
 * @param {*} records {email, sessionID}
 */
export const logoutAction = (toolBox, records) => async (dispatch) => {
  const { navigate } = toolBox;
  try {
    dispatch({
      type: AUTH_REQUEST
    });

    const { message } = await logoutService(records);

    if (message) {
      dispatch({
        type: AUTH_LOGOUT_SUCCESS,
        payload: null
      });
      localForage.removeItem(constants.LOCAL_FORAGE_KEYS.TOKEN);
      dispatch(
        showNotification({
          level: constants.NOTIFY_LEVEL.SUCCESS,
          message
        })
      );
      dispatch(removeLogin());
      navigate('/login');
    }
  } catch (err) {
    dispatch({
      type: AUTH_FAILURE,
      payload: err
    });
  }
};

/**
 * WHOAMI ACTION
 * @param {*} records {email}
 */
export const whoamiAction = (records) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_REQUEST
    });

    const { result } = await whoamiService(records);

    if (!isEmpty(result)) {
      const { data } = result;
      dispatch({
        type: AUTH_WHOAMI_SUCCESS,
        payload: data
      });
      if (data.isPasswordTemporary) {
        // notify for change password temporary user
        dispatch(showToastchangePasswordTemporaryNotifyAction(data));
      }
      dispatch(createUserSessionAction({ userID: data?.id }));
    }
  } catch (err) {
    dispatch({
      type: AUTH_FAILURE,
      payload: err
    });
  }
};

/**
 * REFRESH TOKEN ACTION
 * @param {*} toolBox {navigate, socket}
 * @param {*} records {email, sessionID}
 */
export const refreshTokenAction = (toolBox, records) => async (dispatch) => {
  const { navigate } = toolBox;

  try {
    const { result } = await refreshTokenService(records);

    if (!isEmpty(result)) {
      const newToken = result.token;
      dispatch({
        type: AUTH_REFRESH_SUCCESS,
        payload: newToken
      });
      localForage.setItem(constants.LOCAL_FORAGE_KEYS.TOKEN, newToken);
    }
  } catch (err) {
    if (err.response.status === constants.HTTP_STATUS.AUTHORIZATION) {
      // dispatch(socketUserLogoutAction(toolBox, records));
      localForage.removeItem(constants.LOCAL_FORAGE_KEYS.TOKEN);
      setTimeout(() => {
        dispatch(removeLogin());
      }, 2000);
      navigate('/login');
    }
    dispatch({
      type: AUTH_FAILURE,
      payload: err
    });
  }
};

/**
 * REVOKE TOKEN ACTION
 * @param {*} records {id, sessionID}
 */
export const revokeTokenAction = (records) => async (dispatch) => {
  try {
    const { message } = await revokeTokenService(records);

    if (message) {
      dispatch(
        showNotification({
          level: constants.NOTIFY_LEVEL.SUCCESS,
          message
        })
      );
    }
  } catch (err) {
    dispatch({
      type: AUTH_FAILURE,
      payload: err
    });
  }
};
