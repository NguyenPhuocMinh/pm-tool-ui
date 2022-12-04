import {
  RESET_RECORDS_USER_SESSION,
  CALL_REQUEST_USER_SESSION,
  END_REQUEST_USER_SESSION,
  TIME_LINE_USER_SESSION,
  CREATE_USER_SESSION,
  UPDATE_USER_SESSION
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  loading: false,
  dataTimeline: [],
  totalTimeline: 0,
  records: {}
};

const userSessionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RESET_RECORDS_USER_SESSION:
      return initialState;
    case CALL_REQUEST_USER_SESSION:
      return {
        ...state,
        loading: true
      };
    case END_REQUEST_USER_SESSION:
      return {
        ...state,
        loading: false
      };
    case TIME_LINE_USER_SESSION:
      return {
        ...state,
        dataTimeline: payload.data,
        totalTimeline: payload.total,
        loading: false
      };
    case CREATE_USER_SESSION:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case UPDATE_USER_SESSION:
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
