import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastMsgCustom } from '@utilities';
import {
  addDataNewNotifyUserAction,
  hideToastChangePasswordTemporary
} from '@reduxStore/actions';
import { get, isEmpty } from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import constants from '@constants';

const ToastCommon = ({ theme }) => {
  // hooks
  const dispatch = useDispatch();

  const { toastInfo } = useSelector((state) => {
    return {
      toastInfo: get(state, 'notify.toast', {})
    };
  });

  const autoClose = constants.AUTO_CLOSE;

  useEffect(() => {
    if (!isEmpty(toastInfo)) {
      toast(<ToastMsgCustom toastInfo={toastInfo} />, {
        toastId: toastInfo?.id
      });
      dispatch(addDataNewNotifyUserAction(toastInfo));
      setTimeout(() => {
        dispatch(hideToastChangePasswordTemporary());
      }, autoClose);
    }
  }, [toastInfo]);

  return (
    <ToastContainer
      newestOnTop
      draggable
      closeOnClick
      pauseOnHover
      pauseOnFocusLoss
      limit={10}
      theme={theme}
      autoClose={autoClose}
      position="bottom-right"
    />
  );
};

export default ToastCommon;
