import {
  CALL_REQUEST_PROJECT,
  END_REQUEST_PROJECT,
  GET_ALL_PROJECT,
  CREATE_PROJECT,
  GET_ID_PROJECT,
  EDIT_PROJECT
} from '@reduxStore/types';

const initialState = {
  loading: false,
  data: [],
  total: 0,
  record: {}
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CALL_REQUEST_PROJECT:
      return {
        ...state,
        loading: true
      };
    case END_REQUEST_PROJECT:
      return {
        ...state,
        loading: false
      };
    case GET_ALL_PROJECT:
      return {
        ...state,
        data: payload.data,
        total: payload.total
      };
    case CREATE_PROJECT:
      return {
        ...state,
        record: payload
      };
    case GET_ID_PROJECT:
      return {
        ...state,
        record: payload
      };
    case EDIT_PROJECT:
      return {
        ...state,
        record: payload
      };
    default:
      return state;
  }
};

export default projectReducer;
