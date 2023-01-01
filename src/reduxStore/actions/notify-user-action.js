import { isEmpty } from 'lodash';
import constants from '@constants';
import {
  getAllNotifyUserService,
  getNotifyUserByIdService,
  getAllDataNotifyUserService,
  getAllDataUnreadNotifyUserService,
  readNotifyUserService,
  readAllNotifyUserService,
  trashNotifyUserService,
  trashAllNotifyUserService,
  getAllDataTrashNotifyUserService,
  rollbackNotifyUserService,
  rollbackAllNotifyUserService
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
  NOTIFY_USER_ADD_NEW_DATA_SUCCESS,
  NOTIFY_USER_GET_ALL_DATA_TRASH_SUCCESS,
  NOTIFY_USER_TRASH_SUCCESS,
  NOTIFY_USER_TRASH_ALL_SUCCESS,
  NOTIFY_USER_ROLLBACK_SUCCESS,
  NOTIFY_USER_ROLLBACK_ALL_SUCCESS
} from '@reduxStore/types';
import { showNotification } from '@reduxStore/actions';

const limit = constants.LIMIT_DEFAULT;

/**
 * @description GET ALL NOTIFY USER ACTION
 * @param {*} id {id of user}
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

/**
 * @description TRASH NOTIFY OF USER ACTION
 * @param {*} id {id of notify}
 * @param {*} userId {id of user}
 * @param {*} query {_start, _end}
 */
export const trashNotifyUserAction =
  (id, userId, query) => async (dispatch) => {
    try {
      dispatch({
        type: NOTIFY_USER_REQUEST
      });

      const { result, message } = await trashNotifyUserService(id);

      if (!isEmpty(result)) {
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message
          })
        );
        dispatch({ type: NOTIFY_USER_TRASH_SUCCESS });
        dispatch(getAllNotifyUserAction(userId, query));
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
 * @description TRASH ALL NOTIFY OF USER ACTION
 * @param {*} userId {id of user}
 * @param {*} query
 *
 */
export const trashAllNotifyUserAction = (userId, query) => async (dispatch) => {
  try {
    dispatch({
      type: NOTIFY_USER_REQUEST
    });

    const { result, message } = await trashAllNotifyUserService(userId);

    if (!isEmpty(result)) {
      dispatch(
        showNotification({
          level: constants.NOTIFY_LEVEL.SUCCESS,
          message
        })
      );
      dispatch({ type: NOTIFY_USER_TRASH_ALL_SUCCESS });
      dispatch(getAllDataTrashNotifyUserAction(userId, query));
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
 * @description GET ALL DATA NOTIFY OF USER ACTION
 * @param {*} userId {id of user}
 * @param {*} query {_start, _end, deleted}
 */
export const getAllDataTrashNotifyUserAction =
  (userId, query) => async (dispatch) => {
    try {
      dispatch({
        type: NOTIFY_USER_REQUEST
      });

      const { result } = await getAllDataTrashNotifyUserService(userId, query);

      if (!isEmpty(result)) {
        dispatch({
          type: NOTIFY_USER_GET_ALL_DATA_TRASH_SUCCESS,
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
 * @description ROLL BACK NOTIFY OF USER ACTION
 * @param {*} id {id of notify}
 * @param {*} userId {id of user}
 * @param {*} query {_start, _end}
 */
export const rollbackNotifyUserAction =
  (id, userId, query) => async (dispatch) => {
    try {
      dispatch({
        type: NOTIFY_USER_REQUEST
      });

      const { result, message } = await rollbackNotifyUserService(id);

      if (!isEmpty(result)) {
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message
          })
        );
        dispatch({ type: NOTIFY_USER_ROLLBACK_SUCCESS });
        dispatch(getAllDataTrashNotifyUserAction(userId, query));
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
 * @description ROLL BACK ALL NOTIFY OF USER ACTION
 * @param {*} userId {id of user}
 * @param {*} query {_start, _end}
 */
export const rollbackAllNotifyUserAction =
  (userId, query) => async (dispatch) => {
    try {
      dispatch({
        type: NOTIFY_USER_REQUEST
      });

      const { result, message } = await rollbackAllNotifyUserService(userId);

      if (!isEmpty(result)) {
        dispatch(
          showNotification({
            level: constants.NOTIFY_LEVEL.SUCCESS,
            message
          })
        );
        dispatch({ type: NOTIFY_USER_ROLLBACK_ALL_SUCCESS });
        dispatch(getAllDataTrashNotifyUserAction(userId, query));
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
