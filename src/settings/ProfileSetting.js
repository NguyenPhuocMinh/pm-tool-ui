import { useNavigate } from 'react-router-dom';
// hooks
import { useTranslate, useAuth, useSocket } from '@hooks';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction, socketUserLogoutAction } from '@reduxStore/actions';
// material ui
import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  Box
} from '@mui/material';
import { PowerSettingsNew as PowerSettingsNewIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { isEmpty, get } from 'lodash';

const useStyles = makeStyles((_) => ({
  selected: {
    background: 'rgb(0 0 0 / 12%) !important'
  }
}));

const ProfileSetting = (props) => {
  const { open, anchorEl, handleClose, menus } = props;
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, whoami } = useAuth();
  const { socket } = useSocket();

  const { recordsUserSession } = useSelector((state) => {
    return {
      recordsUserSession: get(state, 'userSession.records', {})
    };
  });

  const handleLogout = () => {
    const toolBox = { navigate, socket };
    dispatch(socketUserLogoutAction(toolBox, whoami));
    dispatch(
      logoutAction(toolBox, {
        email: whoami?.email,
        token,
        sessionID: recordsUserSession?.id
      })
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
      {!isEmpty(menus) ? (
        menus.map((menu) => {
          return (
            <Box key={menu.name}>
              <MenuItem
                key={menu.name}
                onClick={menu.onClick}
                classes={{
                  selected: classes.selected
                }}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <Typography variant="caption">
                  {translate(menu.title)}
                </Typography>
              </MenuItem>
              {menu.divider ? <Divider /> : null}
              <MenuItem
                onClick={handleLogout}
                classes={{
                  selected: classes.selected
                }}
              >
                <ListItemIcon>
                  <PowerSettingsNewIcon
                    sx={{
                      fontSize: '1.25rem',
                      width: '1em',
                      height: '1em'
                    }}
                  />
                </ListItemIcon>
                <Typography variant="caption">
                  {translate('common.label.logout')}
                </Typography>
              </MenuItem>
            </Box>
          );
        })
      ) : (
        <MenuItem
          onClick={handleLogout}
          classes={{
            selected: classes.selected
          }}
        >
          <ListItemIcon>
            <PowerSettingsNewIcon
              sx={{
                fontSize: '1.25rem',
                width: '1em',
                height: '1em'
              }}
            />
          </ListItemIcon>
          <Typography variant="caption">
            {translate('toolbar.profile.logout')}
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );
};

export default ProfileSetting;
