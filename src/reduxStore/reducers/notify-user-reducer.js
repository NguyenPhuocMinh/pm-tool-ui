import {
  NOTIFY_USER_REQUEST,
  NOTIFY_USER_FAILURE,
  NOTIFY_USER_GET_ALL_SUCCESS,
  NOTIFY_USER_GET_ALL_DATA_SUCCESS,
  NOTIFY_USER_GET_MORE_DATA_SUCCESS,
  NOTIFY_USER_GET_ALL_DATA_UNREAD_SUCCESS,
  NOTIFY_USER_GET_MORE_DATA_UNREAD_SUCCESS,
  NOTIFY_USER_ADD_NEW_DATA_SUCCESS,
  NOTIFY_USER_GET_ID_SUCCESS
} from '@reduxStore/types';
import { isEmpty } from 'lodash';

const initialState = {
  all: {
    data: [],
    total: 0,
    offset: 1,
    isLoadMore: true
  },
  unread: {
    data: [],
    total: 0,
    offset: 1,
    isLoadMore: true
  },
  data: [],
  total: 0,
  dataNew: [],
  records: {},
  loading: false,
  error: null
};

const notifyUserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NOTIFY_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case NOTIFY_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case NOTIFY_USER_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.data,
        total: payload.total
      };
    case NOTIFY_USER_GET_ALL_DATA_SUCCESS:
      if (isEmpty(payload.data)) {
        return {
          ...state,
          all: {
            ...state.all,
            offset: 1,
            isLoadMore: false
          }
        };
      }
      return {
        ...state,
        all: {
          ...state.all,
          data: payload.data,
          total: payload.total,
          offset: 1,
          isLoadMore: true
        }
      };
    case NOTIFY_USER_GET_MORE_DATA_SUCCESS:
      if (!isEmpty(payload)) {
        return {
          ...state,
          all: {
            ...state.all,
            data: [...state.all.data, ...payload],
            offset: state.all.offset + 1,
            isLoadMore: true
          }
        };
      }
      return {
        ...state,
        all: {
          ...state.all,
          data: state.all.data,
          isLoadMore: false
        }
      };
    case NOTIFY_USER_GET_ALL_DATA_UNREAD_SUCCESS:
      if (isEmpty(payload.data)) {
        return {
          ...state,
          unread: {
            ...state.unread,
            offset: 1,
            isLoadMore: false
          }
        };
      }
      return {
        ...state,
        unread: {
          ...state.unread,
          data: payload.data,
          total: payload.total,
          offset: 1,
          isLoadMore: true
        }
      };
    case NOTIFY_USER_GET_MORE_DATA_UNREAD_SUCCESS:
      if (!isEmpty(payload)) {
        return {
          ...state,
          unread: {
            ...state.unread,
            data: [...state.unread.data, ...payload],
            offset: state.unread.offset + 1,
            isLoadMore: true
          }
        };
      }
      return {
        ...state,
        unread: {
          ...state.unread,
          data: state.unread.data,
          isLoadMore: false
        }
      };
    case NOTIFY_USER_ADD_NEW_DATA_SUCCESS:
      return {
        ...state,
        dataNew: [payload, ...state.dataNew],
        loading: false
      };
    case NOTIFY_USER_GET_ID_SUCCESS:
      return {
        ...state,
        records: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default notifyUserReducer;
