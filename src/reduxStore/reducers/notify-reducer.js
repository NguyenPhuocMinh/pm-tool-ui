import {
  NOTIFY_REQUEST,
  NOTIFY_FAILURE,
  SHOW_TOAST_CHANGE_PASSWORD_TEMPORARY_NOTIFY,
  HIDE_TOAST_CHANGE_PASSWORD_TEMPORARY_NOTIFY
} from '@reduxStore/types';

const initialState = {
  toast: {},
  loading: false,
  error: null
};

const notifyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NOTIFY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case NOTIFY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case SHOW_TOAST_CHANGE_PASSWORD_TEMPORARY_NOTIFY:
      return {
        ...state,
        toast: payload,
        loading: false
      };
    case HIDE_TOAST_CHANGE_PASSWORD_TEMPORARY_NOTIFY:
      return {
        ...state,
        toast: {},
        loading: false
      };
    default:
      return state;
  }
};

export default notifyReducer;
