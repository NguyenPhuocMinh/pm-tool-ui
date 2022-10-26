import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
// hooks
import { useTranslate } from '@hooks';
import { LogoutResource } from '@resources';

const CommonSetting = ({ open, anchor, toggleDrawer }) => {
  // hooks
  const { translate } = useTranslate();

  return (
    <Drawer anchor={anchor} open={open} onClose={toggleDrawer}>
      <Box
        sx={{
          width: 300,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2
        }}
      >
        <Typography variant="h6">
          {translate('appBar.toolbar.setting.title')}
        </Typography>
        <IconButton
          sx={{
            border: 'none',
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
          onClick={toggleDrawer}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ padding: '0 16px' }}>
        <Typography
          sx={{ margin: '20px 0px 10px' }}
          variant="body1"
          gutterBottom
        >
          {translate('appBar.toolbar.setting.mode')}
        </Typography>
        <LogoutResource />
      </Box>
    </Drawer>
  );
};

export default CommonSetting;
