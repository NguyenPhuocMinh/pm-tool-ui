import { Fragment } from 'react';

import {
  SearchSection,
  SettingSection,
  LanguageSection,
  ProfileSection,
  NotifySection
} from '@components';
import { Box, IconButton } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';

const ToolbarLayout = () => {
  return (
    <Fragment>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SearchSection />
        <SettingSection />
        <LanguageSection />
        <NotifySection />
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
