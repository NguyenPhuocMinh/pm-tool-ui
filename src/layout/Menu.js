import { Fragment } from 'react';
import { MenuCommon, PrivateSubMenuCommon } from '@utilities';
import { Divider } from '@mui/material';
import {
  homeMenus,
  managementMenus,
  authenticateMenus,
  operationMenus
} from '@routes';
import { subMenuPermissions } from '@permissions';

const Menu = ({ open }) => {
  return (
    <Fragment>
      <MenuCommon
        open={open}
        menus={homeMenus}
        titleSubHeader="menu.home.title"
      />
      <Divider />
      <PrivateSubMenuCommon subPermissions={subMenuPermissions.managementMenus}>
        <MenuCommon
          open={open}
          menus={managementMenus}
          titleSubHeader="menu.management.title"
        />
      </PrivateSubMenuCommon>
      <Divider />
      <PrivateSubMenuCommon
        subPermissions={subMenuPermissions.authenticateMenus}
      >
        <MenuCommon
          open={open}
          menus={authenticateMenus}
          titleSubHeader="menu.authenticate.title"
        />
      </PrivateSubMenuCommon>
      <Divider />
      <PrivateSubMenuCommon subPermissions={subMenuPermissions.operationMenus}>
        <MenuCommon
          open={open}
          menus={operationMenus}
          titleSubHeader="menu.operation.title"
        />
      </PrivateSubMenuCommon>
    </Fragment>
  );
};

export default Menu;
