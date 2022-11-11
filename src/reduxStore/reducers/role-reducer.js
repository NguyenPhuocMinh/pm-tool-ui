import {
  RESET_RECORDS_ROLE,
  CALL_REQUEST_ROLE,
  END_REQUEST_ROLE,
  GET_ALL_ROLE,
  CREATE_ROLE,
  GET_ID_ROLE,
  EDIT_ROLE,
  GET_ALL_USER_IN_ROLE,
  GET_ALL_PERMISSION_IN_ROLE
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: false,
  dataUsersInRole: [],
  totalUsersInRole: 0,
  dataPermissionsInRole: [],
  totalPermissionsInRole: 0
};

const roleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RESET_RECORDS_ROLE:
      return initialState;
    case CALL_REQUEST_ROLE:
      return {
        ...state,
        loading: true
      };
    case END_REQUEST_ROLE:
      return {
        ...state,
        loading: false
      };
    case GET_ALL_ROLE:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case CREATE_ROLE:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case GET_ID_ROLE:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case EDIT_ROLE:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case GET_ALL_USER_IN_ROLE:
      return {
        ...state,
        dataUsersInRole: payload.data,
        totalUsersInRole: payload.total,
        loading: false
      };
    case GET_ALL_PERMISSION_IN_ROLE:
      return {
        ...state,
        dataPermissionsInRole: payload.data,
        totalPermissionsInRole: payload.total,
        loading: false
      };
    default:
      return state;
  }
};

export default roleReducer;
