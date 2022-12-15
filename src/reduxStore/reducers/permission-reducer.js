import {
  PERMISSION_REQUEST,
  PERMISSION_FAILURE,
  PERMISSION_RESET_RECORD,
  PERMISSION_GET_ALL_SUCCESS,
  PERMISSION_GET_ID_SUCCESS,
  PERMISSION_CREATE_SUCCESS,
  PERMISSION_UPDATE_SUCCESS
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: false,
  error: null
};

const permissionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PERMISSION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PERMISSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case PERMISSION_RESET_RECORD:
      return initialState;
    case PERMISSION_GET_ALL_SUCCESS:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case PERMISSION_GET_ID_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case PERMISSION_CREATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case PERMISSION_UPDATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default permissionReducer;
