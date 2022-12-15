import {
  PROJECT_REQUEST,
  PROJECT_FAILURE,
  PROJECT_RESET_RECORD,
  PROJECT_GET_ALL_SUCCESS,
  PROJECT_GET_ID_SUCCESS,
  PROJECT_CREATE_SUCCESS,
  PROJECT_UPDATE_SUCCESS
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  record: {},
  loading: false,
  error: null
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROJECT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case PROJECT_RESET_RECORD:
      return initialState;
    case PROJECT_GET_ALL_SUCCESS:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case PROJECT_GET_ID_SUCCESS:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case PROJECT_CREATE_SUCCESS:
      return {
        ...state,
        record: payload,
        loading: false
      };
    case PROJECT_UPDATE_SUCCESS:
      return {
        ...state,
        record: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default projectReducer;
