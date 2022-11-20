import { useState } from 'react';
import { useTranslate } from '@hooks';
import { CommonSetting } from '@utilities';
import { Box, Tooltip, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SettingSection = () => {
  const [openSetting, setOpenSetting] = useState(false);

  // hooks
  const { translate } = useTranslate();

  // func
  const handleChangeSetting = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenSetting(!openSetting);
  };

  return (
    <Box width="auto" minWidth={50}>
      <Tooltip title={translate('toolbar.tooltip.change_setting')}>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleChangeSetting}
          sx={{
            ':hover': {
              background: 'none'
            },
            p: '10px'
          }}
        >
          <SettingsIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <CommonSetting
        open={openSetting}
        anchor="right"
        toggleDrawer={handleChangeSetting}
      />
    </Box>
  );
};

export default SettingSection;
