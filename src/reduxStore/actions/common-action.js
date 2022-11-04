import {
  CHANGE_THEME,
  CHANGE_LANGUAGE,
  CHANGE_COLOR,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SHOW_POPUP,
  HIDE_POPUP,
  RESET
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

export const changeColor = (color) => ({
  type: CHANGE_COLOR,
  payload: color
});

export const showNotification =
  (level = 'info', message = '') =>
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

export const removeLogin = (dispatch) => {
  dispatch({
    type: RESET
  });
};

export const showPopup = ({
  open,
  title,
  content,
  verifyName,
  validator,
  onSubmit,
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
    options
  }
});

export const hidePopup = () => ({
  type: HIDE_POPUP
});
