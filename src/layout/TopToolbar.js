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
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { showToast } from '@reduxStore/actions';

const TopToolbar = () => {
  const dispatch = useDispatch();

  const clickToast = () => {
    dispatch(showToast({ message: 'hello' }));
  };

  return (
    <Fragment>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
          onClick={clickToast}
        >
          <AddIcon />
        </IconButton>
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
