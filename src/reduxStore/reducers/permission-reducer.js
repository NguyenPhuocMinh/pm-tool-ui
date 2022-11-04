import {
  CALL_REQUEST_PERMISSION,
  END_REQUEST_PERMISSION,
  GET_ALL_PERMISSION,
  CREATE_PERMISSION,
  GET_ID_PERMISSION,
  EDIT_PERMISSION
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: false
};

const permissionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CALL_REQUEST_PERMISSION:
      return {
        ...state,
        loading: true
      };
    case END_REQUEST_PERMISSION:
      return {
        ...state,
        loading: false
      };
    case GET_ALL_PERMISSION:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case CREATE_PERMISSION:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case GET_ID_PERMISSION:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case EDIT_PERMISSION:
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
