import { menuPermissions } from './menu-per';

export const subMenuPermissions = {
  managementMenus: [
    menuPermissions.organizations.LIST,
    menuPermissions.projects.LIST
  ],
  authenticateMenus: [
    menuPermissions.roles.LIST,
    menuPermissions.permissions.LIST,
    menuPermissions.users.LIST
  ]
};
