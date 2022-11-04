import constants from '@constants';
import { localForage } from '@utils';
import {
  CHANGE_THEME,
  CHANGE_LANGUAGE,
  CHANGE_COLOR,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SHOW_POPUP,
  HIDE_POPUP
} from '../types';

const initialState = {
  theme:
    localForage.getItemLocalForage(constants.LOCAL_FORAGE_KEYS.THEME) || 'dark',
  language:
    localForage.getItemLocalForage(constants.LOCAL_FORAGE_KEYS.LANGUAGE) ||
    'vn',
  color:
    localForage.getItemLocalForage(constants.LOCAL_FORAGE_KEYS.COLOR) || {},
  notify: {},
  popup: {}
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
    default:
      return state;
  }
};

export default commonReducer;
