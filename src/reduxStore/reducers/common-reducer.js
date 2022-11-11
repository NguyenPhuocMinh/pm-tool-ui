import constants from '@constants';
import { localForage } from '@utils';
import {
  CHANGE_THEME,
  CHANGE_LANGUAGE,
  CHANGE_COLOR,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SHOW_POPUP,
  HIDE_POPUP,
  REFRESH
} from '../types';

const initialState = {
  theme:
    localForage.getItemLocalForage(constants.LOCAL_FORAGE_KEYS.THEME) ||
    'light',
  language:
    localForage.getItemLocalForage(constants.LOCAL_FORAGE_KEYS.LANGUAGE) ||
    'vn',
  color:
    localForage.getItemLocalForage(constants.LOCAL_FORAGE_KEYS.COLOR) || {},
  notify: {},
  popup: {},
  refresh: 0
};

const commonReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: payload
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: payload
      };
    case CHANGE_COLOR:
      return {
        ...state,
        color: payload
      };
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notify: payload
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notify: {}
      };
    case SHOW_POPUP:
      return {
        ...state,
        popup: payload
      };
    case HIDE_POPUP:
      return {
        ...state,
        popup: {}
      };
    case REFRESH:
      return {
        ...state,
        refresh: payload
      };
    default:
      return state;
  }
};

export default commonReducer;
