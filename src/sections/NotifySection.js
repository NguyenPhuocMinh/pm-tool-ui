import { useState, useEffect } from 'react';
// hooks
import { useTranslate, useAuth } from '@hooks';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllDataNotifyUserAction,
  getAllDataUnreadNotifyUserAction
} from '@reduxStore/actions';
// another
import constants from '@constants';
import { NotifySetting } from '@settings';
import { get } from 'lodash';
// mui
import { Box, Tooltip, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotifySection = () => {
  const limit = constants.LIMIT_DEFAULT;

  // states
  const [anchorNotify, setAnchorNotify] = useState(null);
  const openPopupNotify = Boolean(anchorNotify);

  const _ = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh', {})
    };
  });

  // hooks
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const { whoami } = useAuth();

  // func
  const handleClickChangeNotify = (event) => {
    setAnchorNotify(event.currentTarget);
  };

  const handleCloseChangeNotify = () => {
    setAnchorNotify(null);
  };

  // call one data notify isNew equal false
  useEffect(() => {
    const query = {
      _start: 0,
      _end: limit,
      isNew: false
    };
    dispatch(getAllDataNotifyUserAction(whoami?.id, query));
  }, [whoami]);

  // call one data notify isRead equal false
  useEffect(() => {
    const query = {
      _start: 0,
      _end: limit
    };
    dispatch(getAllDataUnreadNotifyUserAction(whoami?.id, query));
  }, [whoami]);

  const { total } = useSelector((state) => {
    return {
      total: get(state, 'notifyUser.all.total', 0)
    };
  });

  return (
    <Box id="pm-tool-box-notify-section" width="auto" minWidth={50}>
      <Tooltip title={translate('toolbar.tooltip.notification')}>
        <IconButton
          sx={{
            ':hover': {
              background: 'none'
            },
            p: '10px'
          }}
          color="inherit"
          onClick={handleClickChangeNotify}
        >
          <Badge badgeContent={total} color="error">
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotifySetting
        open={openPopupNotify}
        anchorEl={anchorNotify}
        handleClose={handleCloseChangeNotify}
      />
    </Box>
  );
};

export default NotifySection;
