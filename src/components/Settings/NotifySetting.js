import React from 'react';
import { useNavigate } from 'react-router-dom';
// hooks
import { useTranslate } from '@hooks';
// redux
import { useDispatch } from 'react-redux';
// material ui
import {
  Divider,
  Menu,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Avatar
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((_) => ({
  selected: {
    background: 'rgb(0 0 0 / 12%) !important'
  },
  scrollHeight: {
    height: '400px',
    overflowX: 'hidden'
  }
}));

const NotifySetting = (props) => {
  const { open, anchorEl, handleClose } = props;
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const _ = useDispatch();
  const navigate = useNavigate();

  const handleClickViewAllNotify = () => {
    navigate('/login');
  };

  const renderListNotify = () => {
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
    );
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0
          }
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper'
        }}
      >
        <PerfectScrollbar className={classes.scrollHeight}>
          {renderListNotify()}
          <Divider variant="inset" component="li" />
          {renderListNotify()}
          <Divider variant="inset" component="li" />
          {renderListNotify()}
          <Divider variant="inset" component="li" />
          {renderListNotify()}
          <Divider variant="inset" component="li" />
          {renderListNotify()}
          <Divider variant="inset" component="li" />
          {renderListNotify()}
          <Divider variant="inset" component="li" />
          {renderListNotify()}
          <Divider variant="inset" component="li" />
        </PerfectScrollbar>
        <ListItem>
          <ListItemButton
            sx={{ height: 28 }}
            onClick={handleClickViewAllNotify}
          >
            <ListItemText
              sx={{ display: 'flex', justifyContent: 'center' }}
              primary={translate('common.button.viewAllNotify')}
              primaryTypographyProps={{
                color: 'primary',
                fontWeight: 'medium',
                variant: 'body2',
                fontFamily: 'sans-serif'
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Menu>
  );
};

export default NotifySetting;
