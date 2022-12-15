import { menuPermissions } from './menu-per';

export const subMenuPermissions = {
  managementMenus: [
    menuPermissions.organizations.GET_ALL,
    menuPermissions.projects.GET_ALL
  ],
  authenticateMenus: [
    menuPermissions.roles.GET_ALL,
    menuPermissions.permissions.GET_ALL,
    menuPermissions.users.GET_ALL,
    menuPermissions.userOnline.GET_ALL
  ],
  operationMenus: [
    menuPermissions.notifies.GET_ALL,
    menuPermissions.notifyTemplates.GET_ALL
  ]
};
