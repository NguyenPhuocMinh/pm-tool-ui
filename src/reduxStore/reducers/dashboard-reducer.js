import {
  DASH_BOARD_REQUEST,
  DASH_BOARD_FAILURE,
  DASH_BOARD_GET_HOME_SUCCESS,
  DASH_BOARD_GET_HEALTH_CHECK_SUCCESS
} from '@reduxStore/types';

const initialState = {
  dataHome: null,
  dataHealth: null,
  loading: true,
  error: null
};

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DASH_BOARD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DASH_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case DASH_BOARD_GET_HOME_SUCCESS:
      return {
        ...state,
        dataHome: payload,
        loading: false
      };
    case DASH_BOARD_GET_HEALTH_CHECK_SUCCESS:
      return {
        ...state,
        dataHealth: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default dashboardReducer;
