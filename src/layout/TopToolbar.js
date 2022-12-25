import { Fragment } from 'react';
import {
  SearchSection,
  SettingSection,
  LanguageSection,
  ProfileSection,
  NotifySection,
  RefreshSection
} from '@sections';
import { Box, IconButton } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';

const TopToolbar = () => {
  const _ = useSelector((state) => state);

  return (
    <Fragment>
      <Box
        id="pm-tool-box-top-toolbar"
        sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
      >
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
