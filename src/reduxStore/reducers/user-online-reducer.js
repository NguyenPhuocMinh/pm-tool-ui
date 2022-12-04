import { GET_ONLINE_USERS } from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: true
};

const userOnlineReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ONLINE_USERS:
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
