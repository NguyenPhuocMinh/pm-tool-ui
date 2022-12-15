import { isEmpty } from 'lodash';
import constants from '@constants';
import {
  getAllNotifyTemplateService,
  createNotifyTemplateService
} from '@services';
import { showNotification } from '@reduxStore/actions';
import {
  NOTIFY_TEMPLATE_REQUEST,
  NOTIFY_TEMPLATE_FAILURE,
  NOTIFY_TEMPLATE_GET_ALL_SUCCESS,
  NOTIFY_TEMPLATE_CREATE_SUCCESS
} from '@reduxStore/types';

/**
 * @description GET ALL NOTIFY TEMPLATE ACTION
 * @param {*} query {_state, _end, search}
 */
export const getAllNotifyTemplateAction =
  (query = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: NOTIFY_TEMPLATE_REQUEST
      });

      const { result } = await getAllNotifyTemplateService(query);

      if (!isEmpty(result)) {
        dispatch({
          type: NOTIFY_TEMPLATE_GET_ALL_SUCCESS,
          payload: {
            data: result.data,
            total: result.total
          }
        });
      }
    } catch (err) {
      dispatch({
        type: NOTIFY_TEMPLATE_FAILURE,
        payload: err
      });
    }
  };

/**
 * @description CREATE NOTIFY TEMPLATE ACTION
 * @param {*} records {data of notify template}
 */
export const createNotifyTemplateAction =
  (toolBox, records) => async (dispatch) => {
    const { navigate } = toolBox;
    try {
      dispatch({
        type: NOTIFY_TEMPLATE_REQUEST
      });
      const { result, message } = await createNotifyTemplateService(records);

      if (!isEmpty(result)) {
        dispatch({
          type: NOTIFY_TEMPLATE_CREATE_SUCCESS,
          payload: result.data
        });
        dispatch(
          showNotification({ level: constants.NOTIFY_LEVEL.SUCCESS, message })
        );
        navigate('/notify-templates');
      }
    } catch (err) {
      dispatch({
        type: NOTIFY_TEMPLATE_FAILURE,
        payload: err
      });
    }
  };
