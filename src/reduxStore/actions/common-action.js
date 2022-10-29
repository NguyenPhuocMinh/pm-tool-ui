import constants from '@constants';
import { localForage } from '@utils';

import {
  CHANGE_THEME,
  CHANGE_LANGUAGE,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SHOW_POPUP,
  HIDE_POPUP
} from '../types';

export const changeTheme = (theme) => (dispatch) => {
  dispatch({
    type: CHANGE_THEME,
    payload: theme
  });
};

export const changeLanguage = (lng) => ({
  type: CHANGE_LANGUAGE,
  payload: lng
});

export const showNotification =
  (level, message = '') =>
  (dispatch) => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        level,
        message
      }
    });
  };

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});

export const removeLogin = (_) => {
  localForage.removeItem(constants.LOCAL_FORAGE_KEYS.EMAIL);
  localForage.removeItem(constants.LOCAL_FORAGE_KEYS.AUTHENTICATED, false);
};

export const showPopup = ({ open, title, content, onSubmit, options }) => ({
  type: SHOW_POPUP,
  payload: {
    open,
    title,
    content,
    onSubmit,
    options
  }
});

export const hidePopup = () => ({
  type: HIDE_POPUP
});
