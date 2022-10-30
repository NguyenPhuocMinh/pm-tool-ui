import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslate } from '@hooks';
import { ProfileSetting } from '@components';
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Typography,
  CircularProgress
} from '@mui/material';
import { get } from 'lodash';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

const ProfileSection = () => {
  const [anchorProfile, setAnchorProfile] = useState(null);
  const openPopupProfile = Boolean(anchorProfile);

  // hooks
  const { translate } = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickChangeProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleCloseChangeProfile = () => {
    setAnchorProfile(null);
  };

  const menus = handleMenus();
  const fullName = 'admin';
  const photoURL = '';

  const { loading } = useSelector((state) => {
    return {
      loading: get(state, 'auth.loading', false)
    };
  });

  return (
    <Box width="auto" minWidth={50}>
      <Tooltip title={translate('toolbar.tooltip.change_profile')}>
        <IconButton
          size="large"
          edge="end"
          sx={{
            ':hover': {
              background: 'none'
            },
            p: '10px',
            marginTop: '-5px'
          }}
          color="inherit"
          onClick={handleClickChangeProfile}
        >
          <Avatar
            alt={fullName}
            src={photoURL}
            sx={{ width: 28, height: 28, marginRight: '10px' }}
          />
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1,
              fontFamily: 'Josefin Sans',
              fontWeight: 'bold'
            }}
          >
            {loading && (
              <CircularProgress
                sx={{ marginRight: '5px' }}
                color="primary"
                size={10}
                thickness={2}
              />
            )}
            {fullName}
          </Typography>
        </IconButton>
      </Tooltip>
      <ProfileSetting
        open={openPopupProfile}
        anchorEl={anchorProfile}
        handleClose={handleCloseChangeProfile}
        location={location}
        navigate={navigate}
        menus={menus}
      />
    </Box>
  );
};

const handleMenus = () => {
  const menus = [
    {
      name: 'profile',
      title: 'toolbar.profile.show_profile',
      icon: <AccountCircleTwoToneIcon />,
      onClick: () => {}
    }
  ];

  return menus;
};

export default ProfileSection;
