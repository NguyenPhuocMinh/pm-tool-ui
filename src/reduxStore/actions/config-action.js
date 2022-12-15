import { isEmpty } from 'lodash';
import { getDataConfigJsonService } from '@services';
import {
  CONFIG_REQUEST,
  CONFIG_FAILURE,
  CONFIG_GET_DATA_JSON_SUCCESS
} from '@reduxStore/types';

/**
 * @description GET DATA CONFIG JSON ACTION
 * @param {*} name
 */
export const getDataConfigJsonAction =
  (name = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: CONFIG_REQUEST
      });

      const { result } = await getDataConfigJsonService(name);

      if (!isEmpty(result)) {
        dispatch({
          type: CONFIG_GET_DATA_JSON_SUCCESS,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: CONFIG_FAILURE,
        payload: err
      });
    }
  };
