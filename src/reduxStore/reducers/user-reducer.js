import {
  USER_REQUEST,
  USER_FAILURE,
  USER_RESET_RECORD,
  USER_GET_ALL_SUCCESS,
  USER_GET_ID_SUCCESS,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_RESET_PASSWORD_SUCCESS
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case USER_RESET_RECORD:
      return initialState;
    case USER_GET_ALL_SUCCESS:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case USER_GET_ID_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case USER_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default userReducer;
