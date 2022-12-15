import {
  NOTIFY_TEMPLATE_REQUEST,
  NOTIFY_TEMPLATE_FAILURE,
  NOTIFY_TEMPLATE_GET_ALL_SUCCESS,
  NOTIFY_TEMPLATE_CREATE_SUCCESS
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: false,
  error: null
};

const notifyTemplateReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NOTIFY_TEMPLATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case NOTIFY_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case NOTIFY_TEMPLATE_GET_ALL_SUCCESS:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case NOTIFY_TEMPLATE_CREATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default notifyTemplateReducer;
