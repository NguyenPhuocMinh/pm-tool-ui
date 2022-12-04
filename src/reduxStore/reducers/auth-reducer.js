import {
  BEGIN_REQUEST_AUTH,
  END_REQUEST_AUTH,
  LOGIN_SUCCESS_AUTH,
  LOGOUT_SUCCESS_AUTH,
  WHOAMI_SUCCESS_AUTH,
  REFRESH_SUCCESS_AUTH
} from '@reduxStore/types';

const initialState = {
  loading: false,
  token: null,
  whoami: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case BEGIN_REQUEST_AUTH:
      return {
        ...state,
        loading: true
      };
    case END_REQUEST_AUTH:
      return {
        ...state,
        loading: false
      };
    case LOGIN_SUCCESS_AUTH:
      return {
        ...state,
        token: payload
      };
    case LOGOUT_SUCCESS_AUTH:
      return {
        ...state,
        token: payload
      };
    case WHOAMI_SUCCESS_AUTH:
      return {
        ...state,
        whoami: payload
      };
    case REFRESH_SUCCESS_AUTH:
      return {
        ...state,
        token: payload
      };
    default:
      return state;
  }
};

export default authReducer;
