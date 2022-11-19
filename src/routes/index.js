import {
  DashboardResource,
  OrganizationList,
  OrganizationCreate,
  OrganizationEdit,
  ProjectList,
  ProjectCreate,
  RoleList,
  RoleCreate,
  RoleEdit,
  PermissionList,
  PermissionCreate,
  PermissionEdit,
  UserList,
  UserCreate,
  UserEdit
} from '@resources';
import { NotFoundCommon, ForbiddenCommon } from '@utilities';
import { menuPermissions } from '@permissions';

import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LanIcon from '@mui/icons-material/Lan';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LockPersonIcon from '@mui/icons-material/LockPerson';

/**
 * @description ROUTES
 */
const dashboardRoutes = [
  {
    enable: false,
    name: 'dashboard',
    path: '/',
    element: () => <DashboardResource />,
    permission: ''
  }
];

const notfoundRoutes = [
  {
    enable: false,
    name: 'notfound',
    path: '/not-found',
    element: () => <NotFoundCommon />,
    permission: ''
  }
];

const forbiddenRoutes = [
  {
    enable: false,
    name: 'forbidden',
    path: '/forbidden',
    element: () => <ForbiddenCommon />,
    permission: ''
  }
];

const organizationRoutes = [
  {
    enable: true,
    name: 'organizations',
    path: '/organizations',
    element: () => <OrganizationList />,
    permission: menuPermissions.organizations.LIST
  },
  {
    enable: true,
    name: 'organizations-create',
    path: '/organizations/create',
    element: () => <OrganizationCreate />,
    permission: menuPermissions.organizations.CREATE
  },
  {
    enable: true,
    name: 'organizations-edit',
    path: '/organizations/edit/:id',
    element: () => <OrganizationEdit />,
    permission: menuPermissions.organizations.EDIT
  }
];

const projectRoutes = [
  {
    enable: true,
    name: 'project',
    path: '/projects',
    element: () => <ProjectList />,
    permission: menuPermissions.projects.LIST
  },
  {
    enable: true,
    name: 'project',
    path: '/projects/create',
    element: () => <ProjectCreate />,
    permission: menuPermissions.projects.CREATE
  }
];

const roleRoutes = [
  {
    enable: true,
    name: 'roles',
    path: '/roles',
    element: () => <RoleList />,
    permission: menuPermissions.roles.LIST
  },
  {
    enable: true,
    name: 'roles-create',
    path: '/roles/create',
    element: () => <RoleCreate />,
    permission: menuPermissions.roles.CREATE
  },
  {
    name: 'roles-edit',
    path: '/roles/edit/:id',
    element: () => <RoleEdit />,
    permission: menuPermissions.roles.EDIT
  }
];

const userRoutes = [
  {
    enable: true,
    name: 'users',
    path: '/users',
    element: () => <UserList />,
    permission: menuPermissions.users.LIST
  },
  {
    enable: true,
    name: 'users-create',
    path: '/users/create',
    element: () => <UserCreate />,
    permission: menuPermissions.users.CREATE
  },
  {
    enable: true,
    name: 'users-edit',
    path: '/users/edit/:id',
    element: () => <UserEdit />,
    permission: menuPermissions.users.EDIT
  }
];

const permissionRoutes = [
  {
    enable: true,
    name: 'permissions',
    path: '/permissions',
    element: () => <PermissionList />,
    permission: menuPermissions.permissions.LIST
  },
  {
    enable: true,
    name: 'permissions-create',
    path: '/permissions/create',
    element: () => <PermissionCreate />,
    permission: menuPermissions.permissions.CREATE
  },
  {
    enable: true,
    name: 'permissions-edit',
    path: '/permissions/edit/:id',
    element: () => <PermissionEdit />,
    permission: menuPermissions.permissions.EDIT
  }
];

const routes = [
  ...dashboardRoutes,
  ...notfoundRoutes,
  ...forbiddenRoutes,
  ...organizationRoutes,
  ...projectRoutes,
  ...roleRoutes,
  ...userRoutes,
  ...permissionRoutes
];

/**
 * @description MENUS
 */
const homeMenus = [
  {
    enable: false,
    name: 'dashboard',
    title: 'menu.home.dashboard.title',
    path: '/',
    icon: <DashboardIcon />,
    permission: ''
  }
];

const managementMenus = [
  {
    enable: true,
    name: 'organizations',
    title: 'menu.management.organization.title',
    path: '/organizations',
    icon: <StoreIcon />,
    permission: menuPermissions.organizations.LIST
  },
  {
    enable: true,
    name: 'projects',
    title: 'menu.management.project.title',
    path: '/projects',
    icon: <AccountTreeIcon />,
    permission: menuPermissions.projects.LIST
  }
];

const authenticateMenus = [
  {
    enable: true,
    name: 'roles',
    title: 'menu.authenticate.role.title',
    path: '/roles',
    icon: <LanIcon />,
    permission: menuPermissions.roles.LIST
  },
  {
    enable: true,
    name: 'permissions',
    title: 'menu.authenticate.permission.title',
    path: '/permissions',
    icon: <LockPersonIcon />,
    permission: menuPermissions.permissions.LIST
  },
  {
    enable: true,
    name: 'users',
    title: 'menu.authenticate.user.title',
    path: '/users',
    icon: <SupervisorAccountIcon />,
    permission: menuPermissions.users.LIST
  }
];

export { routes, homeMenus, managementMenus, authenticateMenus };
