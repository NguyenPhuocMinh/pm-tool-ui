import { useEffect, useState, useCallback } from 'react';
// mui material
import Snackbar from '@mui/material/Snackbar';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from '@reduxStore/actions';
// lodash
import { get, isEmpty } from 'lodash';
// hooks
import { useTranslate } from '@hooks';
import { SlideTransition, Alert } from '@regulars';

const NotifyCommon = () => {
  const [open, setOpen] = useState(false);
  // hooks
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  // store
  const { notify } = useSelector((state) => {
    return {
      notify: get(state, 'common.notify')
    };
  });

  useEffect(() => {
    if (!isEmpty(notify)) {
      setOpen(true);
    }
  }, [notify]);

  const handleRequestClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleExited = useCallback(() => {
    dispatch(hideNotification());
  }, [dispatch]);

  return (
    <Snackbar
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={handleRequestClose}
      TransitionComponent={SlideTransition}
      TransitionProps={{
        onExited: handleExited
      }}
    >
      <Alert onClose={handleRequestClose} severity={notify.level}>
        {translate(notify?.message)}
      </Alert>
    </Snackbar>
  );
};

export default NotifyCommon;
