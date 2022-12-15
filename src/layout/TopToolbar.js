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
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { addDataNewNotifyUserAction } from '@reduxStore/actions';

const TopToolbar = () => {
  const dispatch = useDispatch();

  const _ = useSelector((state) => state);

  const handledClick = () => {
    dispatch(
      addDataNewNotifyUserAction({
        topic: 'Hello',
        description: 'Alo',
        createdAt: new Date()
      })
    );
  };

  return (
    <Fragment>
      <Box
        id="pm-tool-box-top-toolbar"
        sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
      >
        <IconButton
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
          onClick={handledClick}
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
