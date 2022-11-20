import { useState, useEffect, createElement } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { refreshTokenAction } from '@reduxStore/actions';
import { get, isEmpty } from 'lodash';
import { routes } from '@routes';
import { useTranslate, useAuth } from '@hooks';
import {
  AppBarCustom,
  DrawerCustom,
  DrawerHeaderCustom,
  PrivateRouteCommon
} from '@utilities';
import { checkExpiredTime } from '@utils';
import decoded from 'jwt-decode';

// material
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PixIcon from '@mui/icons-material/Pix';
import Menu from './Menu';
import TopToolbar from './TopToolbar';

const Layout = () => {
  // states
  const [open, setOpen] = useState(false);

  // hooks
  const { translate } = useTranslate();
  const { token } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmMatch = useMediaQuery(theme.breakpoints.down('sm'));

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isSmMatch) {
      setOpen(false);
    }
  }, [isSmMatch]);

  useEffect(() => {
    let interval;
    if (!isEmpty(token)) {
      const decodeToken = decoded(token);
      interval = setInterval(() => {
        if (checkExpiredTime(decodeToken?.exp)) {
          dispatch(refreshTokenAction(navigate, decodeToken));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [token, dispatch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarCustom id="layout-appBar" position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: color?.hex }}>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ':hover': {
                background: 'none'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <TopToolbar />
        </Toolbar>
      </AppBarCustom>
      <DrawerCustom variant="permanent" open={open}>
        <DrawerHeaderCustom>
          <PixIcon
            sx={{
              marginRight: '1rem',
              color: color ? color.hex : 'primary.main'
            }}
          />
          <Typography
            id="layout-title"
            sx={{
              fontFamily: 'Monospace',
              textDecoration: 'none'
            }}
            variant="h6"
            noWrap
            component="a"
            href="/"
            color={color ? color.hex : '#B8E986'}
          >
            {translate('toolbar.title')}
          </Typography>
        </DrawerHeaderCustom>
        <Divider />
        <Menu open={open} />
      </DrawerCustom>
      <Routes>
        {routes.map((item) => {
          return (
            <Route
              key={item.name}
              path={item.path}
              element={
                <PrivateRouteCommon
                  enable={item.enable}
                  routePermission={item.permission}
                >
                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeaderCustom />
                    {createElement(item.element)}
                  </Box>
                </PrivateRouteCommon>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Box>
  );
};

export default Layout;
