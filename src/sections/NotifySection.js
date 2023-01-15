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
import { CircularCommon } from '@utilities';
import { NotifySetting } from '@settings';
import { get, isEmpty } from 'lodash';
// mui
import { Box, Tooltip, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotifySection = () => {
  // states
  const [anchorNotify, setAnchorNotify] = useState(null);
  const openPopupNotify = Boolean(anchorNotify);

  const { toastInfo, refresh } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh', {}),
      toastInfo: get(state, 'notify.toast', {})
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
    if (!isEmpty(whoami)) {
      dispatch(getAllDataNotifyUserAction(whoami?.id));
      dispatch(getAllDataUnreadNotifyUserAction(whoami?.id));
    }
  }, [whoami, toastInfo, refresh]);

  const { loading, totalUnread } = useSelector((state) => {
    return {
      loading: get(state, 'notifyUser.loading'),
      totalUnread: get(state, 'notifyUser.unread.total', 0)
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
          <Badge
            badgeContent={loading ? <CircularCommon size={5} /> : totalUnread}
            color="error"
          >
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
