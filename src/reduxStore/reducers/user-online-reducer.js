import {
  USER_ONLINE_REQUEST,
  USER_ONLINE_FAILURE,
  USER_ONLINE_GET_ALL_SUCCESS
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: true,
  error: null
};

const userOnlineReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ONLINE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case USER_ONLINE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case USER_ONLINE_GET_ALL_SUCCESS:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    default:
      return state;
  }
};

export default userOnlineReducer;
