import { useState, useEffect, createElement } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  AppBarLayout,
  DrawerLayout,
  DrawerHeaderLayout,
  ToolbarLayout,
  NavLinkMain
} from '@components';
import { routes } from '@routes';
import { useTranslate } from '@hooks';
import constants from '@constants';
// material
import {
  Box,
  Toolbar,
  Tooltip,
  List,
  ListSubheader,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PixIcon from '@mui/icons-material/Pix';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  fontStyle: {
    fontFamily: 'Josefin Sans !important'
  }
});

const LayoutResource = () => {
  // states
  const [open, setOpen] = useState(false);

  // hooks
  const { translate, i18n } = useTranslate();
  const [_, setLanguage] = useState(constants.LOCALES.EN);
  const theme = useTheme();
  const classes = useStyles();
  const location = useLocation();
  const isSmMatch = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isSmMatch) {
      setOpen(false);
    }
  }, [isSmMatch]);

  useEffect(() => {
    if (i18n.language === 'vn') {
      setLanguage(constants.LOCALES.VN);
    } else {
      setLanguage(constants.LOCALES.EN);
    }
  }, [i18n.language]);

  const renderMenu = (menus = [], titleSubHeader = '') => {
    return (
      <List
        subheader={
          <ListSubheader
            sx={{
              fontFamily: 'Josefin Sans !important',
              ...(!open && {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '70px'
              })
            }}
            component="div"
          >
            {titleSubHeader}
          </ListSubheader>
        }
      >
        {menus.map((item) => (
          <Tooltip title={item.title} key={item.name} placement="right">
            <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
                component={NavLinkMain}
                to={`/${item.path}`}
                selected={location.pathname === `/${item.path}`}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                  classes={{
                    primary: classes.fontStyle
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarLayout position="fixed" open={open}>
        <Toolbar>
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
          <PixIcon sx={{ marginRight: '1rem', color: 'primary.main' }} />
          <Typography
            sx={{
              fontFamily: 'Monospace',
              textDecoration: 'none'
            }}
            variant="h6"
            noWrap
            component="a"
            href="/"
            color="primary.main"
          >
            {translate('toolbar.title')}
          </Typography>
        </DrawerHeaderLayout>
        <Divider />
        {renderMenu(routes.slice(0, 2), 'Categories')}
        <Divider />
        {renderMenu(routes.slice(2, routes.length), 'Genres')}
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
