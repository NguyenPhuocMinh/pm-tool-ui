import {
  DASH_BOARD_REQUEST,
  DASH_BOARD_FAILURE,
  DASH_BOARD_GET_HOME_SUCCESS,
  DASH_BOARD_GET_HEALTH_CHECK_SUCCESS
} from '@reduxStore/types';
import { isEmpty } from 'lodash';

import { homeService, healthCheckService } from '@services';

/**
 * HOME ACTION
 */
export const homeAction = () => async (dispatch) => {
  try {
    dispatch({
      type: DASH_BOARD_REQUEST
    });
    const { result } = await homeService();

    if (!isEmpty(result)) {
      dispatch({
        type: DASH_BOARD_GET_HOME_SUCCESS,
        payload: result
      });
    }
  } catch (err) {
    dispatch({
      type: DASH_BOARD_FAILURE,
      payload: err
    });
  }
};

/**
 * HEALTH CHECK ACTION
 */
export const healthCheckAction = () => async (dispatch) => {
  try {
    dispatch({
      type: DASH_BOARD_REQUEST
    });
    const { result } = await healthCheckService();

    if (!isEmpty(result)) {
      dispatch({
        type: DASH_BOARD_GET_HEALTH_CHECK_SUCCESS,
        payload: result
      });
    }
  } catch (err) {
    dispatch({
      type: DASH_BOARD_FAILURE,
      payload: err
    });
  }
};
