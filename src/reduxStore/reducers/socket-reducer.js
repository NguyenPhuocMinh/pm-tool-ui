import { SOCKET_GET_ALL_USER_ONLINE } from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0
};

const socketReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SOCKET_GET_ALL_USER_ONLINE:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default socketReducer;
