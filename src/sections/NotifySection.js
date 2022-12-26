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
import { NotifySetting } from '@settings';
import { get } from 'lodash';
// mui
import { Box, Tooltip, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotifySection = () => {
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

  // call one data notify
  useEffect(() => {
    dispatch(getAllDataNotifyUserAction(whoami?.id));
  }, [whoami]);

  // call one data notify isRead equal false
  useEffect(() => {
    dispatch(getAllDataUnreadNotifyUserAction(whoami?.id));
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
