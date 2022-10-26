import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_END,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_END
} from '../types';

const initialState = {
  loading: false,
  auth: {}
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
        auth: payload
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
        auth: payload
      };
    case LOGOUT_END:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
