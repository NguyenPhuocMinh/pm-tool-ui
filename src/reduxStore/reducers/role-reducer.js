import {
  ROLE_REQUEST,
  ROLE_FAILURE,
  ROLE_RESET_RECORD,
  ROLE_GET_ALL_SUCCESS,
  ROLE_GET_ID_SUCCESS,
  ROLE_CREATE_SUCCESS,
  ROLE_UPDATE_SUCCESS,
  ROLE_GET_ALL_USER_SUCCESS,
  ROLE_GET_ALL_PERMISSION_SUCCESS
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: false,
  error: null,
  dataUsersInRole: [],
  totalUsersInRole: 0,
  dataPermissionsInRole: [],
  totalPermissionsInRole: 0
};

const roleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ROLE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case ROLE_RESET_RECORD:
      return initialState;
    case ROLE_GET_ALL_SUCCESS:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case ROLE_GET_ID_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case ROLE_CREATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case ROLE_UPDATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case ROLE_GET_ALL_USER_SUCCESS:
      return {
        ...state,
        dataUsersInRole: payload.data,
        totalUsersInRole: payload.total,
        loading: false
      };
    case ROLE_GET_ALL_PERMISSION_SUCCESS:
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
