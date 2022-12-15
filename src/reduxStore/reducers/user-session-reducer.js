import {
  USER_SESSION_REQUEST,
  USER_SESSION_FAILURE,
  USER_SESSION_RESET_RECORD,
  USER_SESSION_TIME_LINE_SUCCESS,
  USER_SESSION_CREATE_USER_SUCCESS,
  USER_SESSION_UPDATE_USER_SUCCESS
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  dataTimeline: [],
  totalTimeline: 0,
  records: {},
  error: null,
  loading: false
};

const userSessionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_SESSION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case USER_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case USER_SESSION_RESET_RECORD:
      return initialState;
    case USER_SESSION_TIME_LINE_SUCCESS:
      return {
        ...state,
        dataTimeline: payload.data,
        totalTimeline: payload.total,
        loading: false
      };
    case USER_SESSION_CREATE_USER_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case USER_SESSION_UPDATE_USER_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default userSessionReducer;
