import { useState } from 'react';
import { useTranslate } from '@hooks';
import { NotifySetting } from '@utilities';
import { Box, Tooltip, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';

const NotifySection = () => {
  // const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [anchorNotify, setAnchorNotify] = useState(null);
  const openPopupNotify = Boolean(anchorNotify);

  // hooks
  const { translate } = useTranslate();
  const { notifications, unreadCount } = useNotificationCenter();

  const handleClickChangeNotify = (event) => {
    setAnchorNotify(event.currentTarget);
  };

  const handleCloseChangeNotify = () => {
    setAnchorNotify(null);
  };

  return (
    <Box width="auto" minWidth={50}>
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
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotifySetting
        open={openPopupNotify}
        anchorEl={anchorNotify}
        handleClose={handleCloseChangeNotify}
        notifications={notifications}
      />
    </Box>
  );
};

export default NotifySection;
