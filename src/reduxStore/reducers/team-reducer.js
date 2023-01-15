import {
  TEAM_REQUEST,
  TEAM_FAILURE,
  TEAM_RESET_RECORD,
  TEAM_GET_ALL_SUCCESS,
  TEAM_GET_ID_SUCCESS,
  TEAM_CREATE_SUCCESS,
  TEAM_UPDATE_SUCCESS,
  TEAM_GET_ALL_MEMBER_IN_TEAM_SUCCESS,
  TEAM_GET_ALL_MEMBER_NOT_ON_TEAM_SUCCESS
} from '@reduxStore/types';

const initialState = {
  data: [],
  total: 0,
  records: {},
  loading: false,
  error: null,
  dataMembersInTeam: [],
  totalMembersInTeam: 0,
  dataMembersNotOnTeam: [],
  totalMembersNotOnTeam: 0
};

const teamReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TEAM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TEAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case TEAM_RESET_RECORD:
      return initialState;
    case TEAM_GET_ALL_SUCCESS:
      return {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      };
    case TEAM_GET_ID_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case TEAM_CREATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case TEAM_UPDATE_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    case TEAM_GET_ALL_MEMBER_IN_TEAM_SUCCESS:
      return {
        ...state,
        dataMembersInTeam: payload.data,
        totalMembersInTeam: payload.total,
        loading: false
      };
    case TEAM_GET_ALL_MEMBER_NOT_ON_TEAM_SUCCESS:
      return {
        ...state,
        dataMembersNotOnTeam: payload.data,
        totalMembersNotOnTeam: payload.total,
        loading: false
      };
    default:
      return state;
  }
};

export default teamReducer;
