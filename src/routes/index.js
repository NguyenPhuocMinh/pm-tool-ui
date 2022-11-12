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
import { NotFoundCommon } from '@components/commons';

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
    name: 'dashboard',
    path: '/',
    element: () => <DashboardResource />
  }
];

const notfoundRoutes = [
  {
    name: 'notfound',
    path: '/not-found',
    element: () => <NotFoundCommon />
  }
];

const organizationRoutes = [
  {
    name: 'organizations',
    path: '/organizations',
    element: () => <OrganizationList />
  },
  {
    name: 'organizations-create',
    path: '/organizations/create',
    element: () => <OrganizationCreate />
  },
  {
    name: 'organizations-edit',
    path: '/organizations/edit/:id',
    element: () => <OrganizationEdit />
  }
];

const projectRoutes = [
  {
    name: 'project',
    path: '/projects',
    element: () => <ProjectList />
  },
  {
    name: 'project',
    path: '/projects/create',
    element: () => <ProjectCreate />
  }
];

const roleRoutes = [
  {
    name: 'roles',
    path: '/roles',
    element: () => <RoleList />
  },
  {
    name: 'roles-create',
    path: '/roles/create',
    element: () => <RoleCreate />
  },
  {
    name: 'roles-edit',
    path: '/roles/edit/:id',
    element: () => <RoleEdit />
  }
];

const userRoutes = [
  {
    name: 'users',
    path: '/users',
    element: () => <UserList />
  },
  {
    name: 'users-create',
    path: '/users/create',
    element: () => <UserCreate />
  },
  {
    name: 'users-edit',
    path: '/users/edit/:id',
    element: () => <UserEdit />
  }
];

const permissionRoutes = [
  {
    name: 'permissions',
    path: '/permissions',
    element: () => <PermissionList />
  },
  {
    name: 'permissions-create',
    path: '/permissions/create',
    element: () => <PermissionCreate />
  },
  {
    name: 'permissions-edit',
    path: '/permissions/edit/:id',
    element: () => <PermissionEdit />
  }
];

const routes = [
  ...dashboardRoutes,
  ...notfoundRoutes,
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
    name: 'dashboard',
    title: 'menu.home.dashboard.title',
    path: '/',
    icon: <DashboardIcon />
  }
];

const managementMenus = [
  {
    name: 'organizations',
    title: 'menu.management.organization.title',
    path: '/organizations',
    icon: <StoreIcon />
  },
  {
    name: 'projects',
    title: 'menu.management.project.title',
    path: '/projects',
    icon: <AccountTreeIcon />
  }
];

const authenticateMenus = [
  {
    name: 'roles',
    title: 'menu.authenticate.role.title',
    path: '/roles',
    icon: <LanIcon />
  },
  {
    name: 'permissions',
    title: 'menu.authenticate.permission.title',
    path: '/permissions',
    icon: <LockPersonIcon />
  },
  {
    name: 'users',
    title: 'menu.authenticate.user.title',
    path: '/users',
    icon: <SupervisorAccountIcon />
  }
];

export { routes, homeMenus, managementMenus, authenticateMenus };
