import {
  HOME_REQUEST,
  HOME_FAILURE,
  HOME_SUCCESS,
  HEALTH_CHECK_REQUEST,
  HEALTH_CHECK_FAILURE,
  HEALTH_CHECK_SUCCESS
} from '@reduxStore/types';
import { isEmpty } from 'lodash';

import { homeService, healthCheckService } from '@services';

/**
 * HOME ACTION
 */
export const homeAction = () => async (dispatch) => {
  try {
    dispatch({
      type: HOME_REQUEST
    });
    const { result } = await homeService();

    if (!isEmpty(result)) {
      dispatch({
        type: HOME_SUCCESS,
        payload: result
      });
    }
  } catch (err) {
    dispatch({
      type: HOME_FAILURE,
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
      type: HEALTH_CHECK_REQUEST
    });
    const { result } = await healthCheckService();

    if (!isEmpty(result)) {
      dispatch({
        type: HEALTH_CHECK_SUCCESS,
        payload: result
      });
    }
  } catch (err) {
    dispatch({
      type: HEALTH_CHECK_FAILURE,
      payload: err
    });
  }
};
