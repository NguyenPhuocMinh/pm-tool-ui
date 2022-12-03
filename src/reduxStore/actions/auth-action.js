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
  socketUserLogoutAction,
  showToast
} from '@reduxStore/actions';
import {
  BEGIN_REQUEST_AUTH,
  END_REQUEST_AUTH,
  LOGIN_SUCCESS_AUTH,
  LOGOUT_SUCCESS_AUTH,
  WHOAMI_SUCCESS_AUTH,
  REFRESH_SUCCESS_AUTH
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
      type: BEGIN_REQUEST_AUTH
    });
    const { result, message } = await loginService(records);

    if (!isEmpty(result)) {
      const { token } = result;
      dispatch({
        type: LOGIN_SUCCESS_AUTH,
        payload: token
      });
      localForage.setItem(constants.LOCAL_FORAGE_KEYS.TOKEN, token);
      // wait 3000ms for store token in localStorage
      setTimeout(() => {
        dispatch(whoamiAction({ email: records.email }));
        dispatch({
          type: END_REQUEST_AUTH
        });
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message
          })
        );
        navigate('/');
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_AUTH
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
      type: BEGIN_REQUEST_AUTH
    });

    const { message } = await logoutService(records);

    if (message) {
      dispatch({
        type: LOGOUT_SUCCESS_AUTH,
        payload: null
      });
      localForage.removeItem(constants.LOCAL_FORAGE_KEYS.TOKEN);
      dispatch(
        showNotification({
          level: constants.NOTIFY_LEVEL.SUCCESS,
          message
        })
      );
      setTimeout(() => {
        dispatch({
          type: END_REQUEST_AUTH
        });
        dispatch(removeLogin());
      }, 3000);
      navigate('/login');
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_AUTH
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
      type: BEGIN_REQUEST_AUTH
    });

    const { result } = await whoamiService(records);

    if (!isEmpty(result)) {
      const { data } = result;
      dispatch({
        type: WHOAMI_SUCCESS_AUTH,
        payload: data
      });
      if (!isEmpty(data.isPasswordTemporary)) {
        dispatch(showToast({ message: 'auth.toast.temporaryPassword' }));
      }
      dispatch(createUserSessionAction({ userID: data?.id }));
      dispatch({
        type: END_REQUEST_AUTH
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_AUTH
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
    dispatch({
      type: BEGIN_REQUEST_AUTH
    });

    const { result } = await refreshTokenService(records);

    if (!isEmpty(result)) {
      const newToken = result.token;
      dispatch({
        type: REFRESH_SUCCESS_AUTH,
        payload: newToken
      });
      dispatch({
        type: END_REQUEST_AUTH
      });
      localForage.setItem(constants.LOCAL_FORAGE_KEYS.TOKEN, newToken);
    }
  } catch (err) {
    if (err.response.status === constants.HTTP_STATUS.AUTHORIZATION) {
      dispatch(socketUserLogoutAction(toolBox, records));
      localForage.removeItem(constants.LOCAL_FORAGE_KEYS.TOKEN);
      setTimeout(() => {
        dispatch(removeLogin());
      }, 3000);
      navigate('/login');
    }
    dispatch({
      type: END_REQUEST_AUTH
    });
  }
};

/**
 * REVOKE TOKEN ACTION
 * @param {*} records {id, sessionID}}
 */
export const revokeTokenAction = (records) => async (dispatch) => {
  try {
    dispatch({
      type: BEGIN_REQUEST_AUTH
    });

    const { message } = await revokeTokenService(records);

    if (message) {
      dispatch(
        showNotification({
          level: constants.NOTIFY_LEVEL.SUCCESS,
          message
        })
      );
      dispatch({
        type: END_REQUEST_AUTH
      });
    }
  } catch (err) {
    dispatch({
      type: END_REQUEST_AUTH
    });
  }
};
