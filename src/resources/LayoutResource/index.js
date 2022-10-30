import { useState, useEffect, createElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  AppBarLayout,
  DrawerLayout,
  DrawerHeaderLayout,
  ToolbarLayout,
  MenuLayout
} from '@components';
import { routes } from '@routes';
import { useTranslate } from '@hooks';
// import constants from '@constants';
// material
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
import { get } from 'lodash';

const LayoutResource = () => {
  // states
  const [open, setOpen] = useState(false);

  // hooks
  const { translate } = useTranslate();
  // const [_, setLanguage] = useState(constants.LOCALES.EN);
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

  // useEffect(() => {
  //   if (i18n.language === 'vn') {
  //     setLanguage(constants.LOCALES.VN);
  //   } else {
  //     setLanguage(constants.LOCALES.EN);
  //   }
  // }, [i18n.language]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarLayout position="fixed" open={open}>
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
          <ToolbarLayout />
        </Toolbar>
      </AppBarLayout>
      <DrawerLayout variant="permanent" open={open}>
        <DrawerHeaderLayout>
          <PixIcon
            sx={{
              marginRight: '1rem',
              color: color ? color.hex : 'primary.main'
            }}
          />
          <Typography
            sx={{
              fontFamily: 'Monospace',
              textDecoration: 'none'
            }}
            variant="h6"
            noWrap
            component="a"
            href="/"
            color={color ? color.hex : 'primary.main'}
          >
            {translate('toolbar.title')}
          </Typography>
        </DrawerHeaderLayout>
        <Divider />
        <MenuLayout open={open} />
      </DrawerLayout>
      <Routes>
        {routes.map((item) => {
          return (
            <Route
              key={item.name}
              path={item.path}
              element={
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <DrawerHeaderLayout />
                  {createElement(item.element)}
                </Box>
              }
            />
          );
        })}
      </Routes>
    </Box>
  );
};

export default LayoutResource;
