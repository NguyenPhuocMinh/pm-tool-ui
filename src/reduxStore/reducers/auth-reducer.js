import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_END,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_END,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_END
} from '@reduxStore/types';

const initialState = {
  loading: false,
  data: {}
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: payload
      };
    case LOGIN_END:
      return {
        ...state,
        loading: false
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        data: payload
      };
    case LOGOUT_END:
      return {
        ...state,
        loading: false
      };
    case REFRESH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case REFRESH_SUCCESS:
      return {
        ...state,
        data: payload
      };
    case REFRESH_END:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
