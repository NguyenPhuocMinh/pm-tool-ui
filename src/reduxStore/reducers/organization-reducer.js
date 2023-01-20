import {
  ORGANIZATION_REQUEST,
  ORGANIZATION_FAILURE,
  ORGANIZATION_RESET_RECORD,
  ORGANIZATION_GET_ALL_SUCCESS,
  ORGANIZATION_GET_ID_SUCCESS,
  ORGANIZATION_CREATE_SUCCESS,
  ORGANIZATION_UPDATE_SUCCESS,
  ORGANIZATION_GET_ALL_PROJECT_IN_ORGANIZATION_SUCCESS,
  ORGANIZATION_GET_ALL_PROJECT_NOT_ON_ORGANIZATION_SUCCESS
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: false,
  error: null,
  dataProjectInOrganization: [],
  totalProjectInOrganization: 0,
  dataProjectNotOnOrganization: [],
  totalProjectNotOnOrganization: 0
};

const organizationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ORGANIZATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case ORGANIZATION_RESET_RECORD:
      return initialState;
    case ORGANIZATION_GET_ALL_SUCCESS:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case ORGANIZATION_GET_ID_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case ORGANIZATION_CREATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case ORGANIZATION_UPDATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case ORGANIZATION_GET_ALL_PROJECT_IN_ORGANIZATION_SUCCESS:
      return {
        ...state,
        dataProjectInOrganization: payload.data,
        totalProjectInOrganization: payload.total,
        loading: false
      };
    case ORGANIZATION_GET_ALL_PROJECT_NOT_ON_ORGANIZATION_SUCCESS:
      return {
        ...state,
        dataProjectNotOnOrganization: payload.data,
        totalProjectNotOnOrganization: payload.total,
        loading: false
      };
    default:
      return state;
  }
};

export default organizationReducer;
