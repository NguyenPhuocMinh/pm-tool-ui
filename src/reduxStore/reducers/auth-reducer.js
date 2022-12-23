import {
  AUTH_REQUEST,
  AUTH_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_WHOAMI_SUCCESS,
  AUTH_REFRESH_SUCCESS
} from '@reduxStore/types';

const initialState = {
  loading: false,
  token: null,
  whoami: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
        loading: false
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        token: payload,
        loading: false
      };
    case AUTH_WHOAMI_SUCCESS:
      return {
        ...state,
        whoami: payload,
        loading: false
      };
    case AUTH_REFRESH_SUCCESS:
      return {
        ...state,
        token: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
