import {
  CONFIG_REQUEST,
  CONFIG_FAILURE,
  CONFIG_GET_DATA_JSON_SUCCESS
} from '@reduxStore/types';

const initialState = {
  loading: false,
  data: {}
};

const configReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONFIG_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CONFIG_FAILURE:
      return {
        ...state,
        loading: false,
        error: null
      };
    case CONFIG_GET_DATA_JSON_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default configReducer;
