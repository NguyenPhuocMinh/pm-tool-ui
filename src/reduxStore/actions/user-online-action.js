import { isEmpty } from 'lodash';
import { GET_ONLINE_USERS } from '@reduxStore/types';

/**
 * @description GET ONLINE USERS ACTION
 * @param {*} data
 */
export const getOnlineUsersAction = (data) => (dispatch) => {
  if (!isEmpty(data)) {
    dispatch({
      type: GET_ONLINE_USERS,
      payload: {
        data,
        total: data.total
      }
    });
  }
};
