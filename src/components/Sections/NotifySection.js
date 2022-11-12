import { useState } from 'react';
import { useTranslate } from '@hooks';
import { NotifySetting } from '@components/settings';
import { Box, Tooltip, IconButton, Badge } from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';

const NotifySection = () => {
  const [anchorNotify, setAnchorNotify] = useState(null);
  const openPopupNotify = Boolean(anchorNotify);

  // hooks
  const { translate } = useTranslate();

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
          <Badge badgeContent={4} color="error">
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
