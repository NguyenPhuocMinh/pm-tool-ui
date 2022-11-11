import {
  RESET_RECORDS_USER,
  CALL_REQUEST_USER,
  END_REQUEST_USER,
  GET_ALL_USER,
  CREATE_USER,
  GET_ID_USER,
  EDIT_USER
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: false
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RESET_RECORDS_USER:
      return initialState;
    case CALL_REQUEST_USER:
      return {
        ...state,
        loading: true
      };
    case END_REQUEST_USER:
      return {
        ...state,
        loading: false
      };
    case GET_ALL_USER:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case CREATE_USER:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case GET_ID_USER:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case EDIT_USER:
      return {
        ...state,
        records: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default userReducer;
