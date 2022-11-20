import { Fragment } from 'react';

import {
  SearchSection,
  SettingSection,
  LanguageSection,
  ProfileSection,
  NotifySection,
  RefreshSection
} from '@utilities';
import { Box, IconButton } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';

const TopToolbar = () => {
  return (
    <Fragment>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SearchSection />
        <RefreshSection />
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

export default TopToolbar;
