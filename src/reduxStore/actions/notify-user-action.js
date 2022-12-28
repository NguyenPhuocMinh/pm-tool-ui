import { isEmpty } from 'lodash';
import constants from '@constants';
import {
  getAllNotifyUserService,
  getNotifyUserByIdService,
  getAllDataNotifyUserService,
  getAllDataUnreadNotifyUserService,
  readNotifyUserService,
  readAllNotifyUserService
} from '@services';
import {
  NOTIFY_USER_REQUEST,
  NOTIFY_USER_FAILURE,
  NOTIFY_USER_GET_ALL_SUCCESS,
  NOTIFY_USER_GET_ID_SUCCESS,
  NOTIFY_USER_GET_ALL_DATA_SUCCESS,
  NOTIFY_USER_GET_MORE_DATA_SUCCESS,
  NOTIFY_USER_GET_ALL_DATA_UNREAD_SUCCESS,
  NOTIFY_USER_GET_MORE_DATA_UNREAD_SUCCESS,
  NOTIFY_USER_ADD_NEW_DATA_SUCCESS
} from '@reduxStore/types';

const limit = constants.LIMIT_DEFAULT;

/**
 * @description GET ALL NOTIFY USER ACTION
 * @param {*} id
 * @param {*} query {_start, _end}
 */
export const getAllNotifyUserAction = (id, query) => async (dispatch) => {
  try {
    dispatch({
      type: NOTIFY_USER_REQUEST
    });

    const { result } = await getAllNotifyUserService(id, query);

    if (!isEmpty(result)) {
      dispatch({
        type: NOTIFY_USER_GET_ALL_SUCCESS,
        payload: {
          data: result.data,
          total: result.total
        }
      });
    }
  } catch (err) {
    dispatch({
      type: NOTIFY_USER_FAILURE,
      payload: err
    });
  }
};

/**
 * @description GET NOTIFY USER BY ID ACTION
 * @param {*} id
 */
export const getNotifyUserByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: NOTIFY_USER_REQUEST
    });

    const { result } = await getNotifyUserByIdService(id);

    if (!isEmpty(result)) {
      dispatch({
        type: NOTIFY_USER_GET_ID_SUCCESS,
        payload: result.data
      });
    }
  } catch (err) {
    dispatch({
      type: NOTIFY_USER_FAILURE,
      payload: err
    });
  }
};

/**
 * @description GET ALL DATA NOTIFY USER ACTION
 * @param {*} id {id of user}
 * @param {*} query {_start, _end}
 */
export const getAllDataNotifyUserAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: NOTIFY_USER_REQUEST
    });

    const query = {
      _start: 0,
      _end: limit
    };

    const { result } = await getAllDataNotifyUserService(id, query);

    if (!isEmpty(result)) {
      dispatch({
        type: NOTIFY_USER_GET_ALL_DATA_SUCCESS,
        payload: {
          data: result.data,
          total: result.total
        }
      });
    }
  } catch (err) {
    dispatch({
      type: NOTIFY_USER_FAILURE,
      payload: err
    });
  }
};

/**
 * @description GET MORE NOTIFY USER ACTION
 * @param {*} id {id of user}
 * @param {*} offset
 */
export const getMoreNotifyUserAction = (id, offset) => async (dispatch) => {
  try {
    dispatch({
      type: NOTIFY_USER_REQUEST
    });

    const query = {
      _start: offset * limit,
      _end: offset * limit + limit,
      isNew: false
    };

    const { result } = await getAllDataNotifyUserService(id, query);

    if (!isEmpty(result)) {
      dispatch({
        type: NOTIFY_USER_GET_MORE_DATA_SUCCESS,
        payload: result.data
      });
    }
  } catch (err) {
    dispatch({
      type: NOTIFY_USER_FAILURE,
      payload: err
    });
  }
};

/**
 * @description GET ALL DATA UNREAD NOTIFY USER ACTION
 * @param {*} id {id of user}
 * @param {*} query {_start, _end}
 */
export const getAllDataUnreadNotifyUserAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: NOTIFY_USER_REQUEST
    });

    const query = {
      _start: 0,
      _end: limit
    };

    const { result } = await getAllDataUnreadNotifyUserService(id, query);

    if (!isEmpty(result)) {
      dispatch({
        type: NOTIFY_USER_GET_ALL_DATA_UNREAD_SUCCESS,
        payload: {
          data: result.data,
          total: result.total
        }
      });
    }
  } catch (err) {
    dispatch({
      type: NOTIFY_USER_FAILURE,
      payload: err
    });
  }
};

/**
 * @description GET MORE DATA UNREAD NOTIFY USER ACTION
 * @param {*} id {id of user}
 * @param {*} offset
 */
export const getMoreUnReadNotifyUserAction =
  (id, offset) => async (dispatch) => {
    try {
      dispatch({
        type: NOTIFY_USER_REQUEST
      });

      const query = {
        _start: offset * limit,
        _end: offset * limit + limit,
        isNew: false
      };

      const { result } = await getAllDataUnreadNotifyUserService(id, query);

      if (!isEmpty(result)) {
        dispatch({
          type: NOTIFY_USER_GET_MORE_DATA_UNREAD_SUCCESS,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: NOTIFY_USER_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description ADD DATA NOTIFY NEW OF USER ACTION
 * @param {*} offset
 * @param {*} userID
 */
export const addDataNewNotifyUserAction = (notify) => (dispatch) => {
  dispatch({
    type: NOTIFY_USER_ADD_NEW_DATA_SUCCESS,
    payload: notify
  });
};

/**
 * @description READ NOTIFY OF USER ACTION
 * @param {*} id {id of notify}
 * @param {*} userId {id of user}
 */
export const readNotifyUserAction = (id, userId) => async (dispatch) => {
  try {
    dispatch({
      type: NOTIFY_USER_REQUEST
    });

    const { result } = await readNotifyUserService(id);

    if (!isEmpty(result)) {
      dispatch(getAllDataNotifyUserAction(userId));
      dispatch(getAllDataUnreadNotifyUserAction(userId));
    }
  } catch (err) {
    dispatch({
      type: NOTIFY_USER_FAILURE,
      payload: err
    });
  }
};

/**
 * @description READ ALL NOTIFY OF USER ACTION
 * @param {*} userId {id of user}
 */
export const readAllNotifyUserAction = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: NOTIFY_USER_REQUEST
    });

    const { result } = await readAllNotifyUserService(userId);

    if (!isEmpty(result)) {
      dispatch(getAllDataNotifyUserAction(userId));
      dispatch(getAllDataUnreadNotifyUserAction(userId));
    }
  } catch (err) {
    dispatch({
      type: NOTIFY_USER_FAILURE,
      payload: err
    });
  }
};
