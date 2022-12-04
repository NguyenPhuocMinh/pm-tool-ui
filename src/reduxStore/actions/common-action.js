import {
  CHANGE_THEME,
  CHANGE_LANGUAGE,
  CHANGE_COLOR,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SHOW_POPUP,
  HIDE_POPUP,
  RESET,
  REFRESH
} from '@reduxStore/types';
import { toast } from 'react-toastify';

export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: theme
});

export const changeLanguage = (lng) => ({
  type: CHANGE_LANGUAGE,
  payload: lng
});

export const changeColor = (color) => ({
  type: CHANGE_COLOR,
  payload: color
});

export const showNotification =
  ({ level = 'info', message = '', vertical, horizontal, options = {} }) =>
  (dispatch) => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        level,
        message,
        options,
        vertical,
        horizontal
      }
    });
  };

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});

export const removeLogin = () => ({
  type: RESET
});

export const showPopup = ({
  open,
  title,
  content,
  verifyName,
  validator,
  onSubmit,
  isLoading,
  options
}) => ({
  type: SHOW_POPUP,
  payload: {
    open,
    title,
    content,
    verifyName,
    validator,
    onSubmit,
    isLoading,
    options
  }
});

export const hidePopup = () => ({
  type: HIDE_POPUP
});

export const refreshPage = (version) => ({
  type: REFRESH,
  payload: version + 1
});

export const showToast =
  ({
    level = 'default',
    message = '',
    options = { position: 'bottom-right' }
  }) =>
  (_) => {
    toast(message, {
      type: level,
      ...options
    });
  };
