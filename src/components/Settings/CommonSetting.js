import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
// hooks
import { useTranslate } from '@hooks';
import { ButtonGroupMain, ColorPickerMain } from '@components';

const CommonSetting = ({ open, anchor, toggleDrawer }) => {
  // hooks
  const { translate } = useTranslate();

  return (
    <Box>
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        onClose={toggleDrawer}
      >
        <Box
          sx={{
            width: 300,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: 'Josefin Sans', fontWeight: 'bold' }}
          >
            {translate('toolbar.setting.title')}
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
            sx={{
              margin: '20px 0px 10px',
              fontFamily: 'Josefin Sans',
              fontWeight: 'bold'
            }}
            variant="body1"
            gutterBottom
          >
            {translate('toolbar.setting.mode')}
          </Typography>
          <ButtonGroupMain />
        </Box>
        <Divider sx={{ padding: 2 }} />
        <Box sx={{ padding: '0 16px' }}>
          <Typography
            sx={{
              margin: '20px 0px 10px',
              fontFamily: 'Josefin Sans',
              fontWeight: 'bold'
            }}
            variant="body1"
            gutterBottom
          >
            {translate('toolbar.setting.color')}
          </Typography>
          <ColorPickerMain />
        </Box>
      </Drawer>
    </Box>
  );
};

export default CommonSetting;
