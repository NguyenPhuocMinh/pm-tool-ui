import { isEmpty } from 'lodash';
import { getAllUserOnlineService } from '@services';
import {
  USER_ONLINE_REQUEST,
  USER_ONLINE_FAILURE,
  USER_ONLINE_GET_ALL_SUCCESS
} from '@reduxStore/types';

/**
 * @description GET ALL ONLINE USERS ACTION
 * @param {*} query
 */
export const getAllUserOnlineAction = (query) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ONLINE_REQUEST
    });

    const { result } = await getAllUserOnlineService(query);

    if (!isEmpty(result)) {
      dispatch({
        type: USER_ONLINE_GET_ALL_SUCCESS,
        payload: {
          data: result.data,
          total: result.total
        }
      });
    }
  } catch (err) {
    dispatch({
      type: USER_ONLINE_FAILURE,
      payload: err
    });
  }
};
