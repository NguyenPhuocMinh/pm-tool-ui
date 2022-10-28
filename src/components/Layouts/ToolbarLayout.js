import { Fragment } from 'react';

import { SettingSection, LanguageSection, ProfileSection } from '@components';
import { Box, IconButton } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';

const ToolbarLayout = () => {
  return (
    <Fragment>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SettingSection />
        <LanguageSection />
        <ProfileSection />
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
    </Fragment>
  );
};

export default ToolbarLayout;
