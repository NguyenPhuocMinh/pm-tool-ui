import { Fragment } from 'react';
import { MenuCommon } from '@components/commons';
import { Divider } from '@mui/material';
import { homeMenus, managementMenus, authenticateMenus } from '@routes';

const Menu = ({ open }) => {
  return (
    <Fragment>
      <MenuCommon
        open={open}
        menus={homeMenus}
        titleSubHeader="menu.home.title"
      />
      <Divider />
      <MenuCommon
        open={open}
        menus={managementMenus}
        titleSubHeader="menu.management.title"
      />
      <Divider />
      <MenuCommon
        open={open}
        menus={authenticateMenus}
        titleSubHeader="menu.authenticate.title"
      />
    </Fragment>
  );
};

export default Menu;
