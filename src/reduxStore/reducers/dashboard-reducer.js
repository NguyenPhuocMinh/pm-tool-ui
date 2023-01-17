import {
  HOME_REQUEST,
  HOME_FAILURE,
  HOME_SUCCESS,
  HEALTH_CHECK_REQUEST,
  HEALTH_CHECK_FAILURE,
  HEALTH_CHECK_SUCCESS
} from '@reduxStore/types';

const initialState = {
  loadingHome: false,
  dataHome: null,
  errorHome: null,
  loadingHealth: false,
  dataHealth: null,
  errorHealth: null
};

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_REQUEST:
      return {
        ...state,
        loadingHome: true
      };
    case HOME_FAILURE:
      return {
        ...state,
        loadingHome: false,
        errorHome: payload
      };
    case HOME_SUCCESS:
      return {
        ...state,
        loadingHome: false,
        dataHome: payload
      };
    case HEALTH_CHECK_REQUEST:
      return {
        ...state,
        loadingHealth: true
      };
    case HEALTH_CHECK_FAILURE:
      return {
        ...state,
        loadingHealth: false,
        errorHealth: payload
      };
    case HEALTH_CHECK_SUCCESS:
      return {
        ...state,
        loadingHealth: false,
        dataHealth: payload
      };
    default:
      return state;
  }
};

export default dashboardReducer;
