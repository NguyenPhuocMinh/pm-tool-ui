import {
  CALL_REQUEST_ORGANIZATION,
  END_REQUEST_ORGANIZATION,
  GET_ALL_ORGANIZATION,
  CREATE_ORGANIZATION,
  GET_ID_ORGANIZATION,
  EDIT_ORGANIZATION
} from '../types';

const initialState = {
  loading: false,
  data: [],
  total: 0,
  record: {}
};

const organizationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CALL_REQUEST_ORGANIZATION:
      return {
        ...state,
        loading: true
      };
    case END_REQUEST_ORGANIZATION:
      return {
        ...state,
        loading: false
      };
    case GET_ALL_ORGANIZATION:
      return {
        ...state,
        data: payload.data,
        total: payload.total
      };
    case CREATE_ORGANIZATION:
      return {
        ...state,
        record: payload
      };
    case GET_ID_ORGANIZATION:
      return {
        ...state,
        record: payload
      };
    case EDIT_ORGANIZATION:
      return {
        ...state,
        record: payload
      };
    default:
      return state;
  }
};

export default organizationReducer;
