import {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_END,
  HEALTH_CHECK_REQUEST,
  HEALTH_CHECK_SUCCESS,
  HEALTH_CHECK_END
} from '@reduxStore/types';

const initialState = {
  dataHome: null,
  dataHealth: null,
  loading: true
};

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_REQUEST:
      return {
        ...state,
        loading: true
      };
    case HOME_SUCCESS:
      return {
        ...state,
        dataHome: payload,
        loading: false
      };
    case HOME_END:
      return {
        ...state,
        loading: false
      };
    case HEALTH_CHECK_REQUEST:
      return {
        ...state,
        loading: true
      };
    case HEALTH_CHECK_SUCCESS:
      return {
        ...state,
        dataHealth: payload,
        loading: false
      };
    case HEALTH_CHECK_END:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default dashboardReducer;
