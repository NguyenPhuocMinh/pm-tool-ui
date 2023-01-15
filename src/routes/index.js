import {
  DashboardResource,
  OrganizationList,
  OrganizationCreate,
  OrganizationEdit,
  ProjectList,
  ProjectCreate,
  ProjectEdit,
  RoleList,
  RoleCreate,
  RoleEdit,
  PermissionList,
  PermissionCreate,
  PermissionEdit,
  UserList,
  UserCreate,
  UserEdit,
  UserOnlineList,
  UserSessionTimeLine,
  NotifyList,
  NotifyUserList,
  NotifyUserDetail,
  NotifyTemplateList,
  NotifyTemplateCreate,
  TeamList,
  TeamCreate,
  TeamEdit
} from '@resources';
import { NotFoundCommon, ForbiddenCommon } from '@utilities';
import { menuPermissions } from '@permissions';

import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LanIcon from '@mui/icons-material/Lan';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import GroupsIcon from '@mui/icons-material/Groups';

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
  },
  {
    enable: true,
    name: 'projects-edit',
    path: '/projects/edit/:id',
    element: () => <ProjectEdit />,
    permission: menuPermissions.projects.EDIT
  }
];

const teamRoutes = [
  {
    enable: true,
    name: 'team-list',
    path: '/teams',
    element: () => <TeamList />,
    permission: menuPermissions.teams.LIST
  },
  {
    enable: true,
    name: 'team-create',
    path: '/teams/create',
    element: () => <TeamCreate />,
    permission: menuPermissions.teams.CREATE
  },
  {
    enable: true,
    name: 'teams-edit',
    path: '/teams/edit/:id',
    element: () => <TeamEdit />,
    permission: menuPermissions.teams.EDIT
  }
];

const roleRoutes = [
  {
    enable: true,
    name: 'role-list',
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

const userOnlineRoutes = [
  {
    enable: true,
    name: 'users-online',
    path: '/users/online',
    element: () => <UserOnlineList />,
    permission: menuPermissions.userOnline.LIST
  }
];

const userSessionRoutes = [
  {
    enable: true,
    name: 'users-timeline-session',
    path: '/users/sessions/:userID',
    element: () => <UserSessionTimeLine />,
    permission: menuPermissions.userSessions.TIME_LINE
  }
];

const notifyRoutes = [
  {
    enable: true,
    name: 'notifies',
    path: '/notifies',
    element: () => <NotifyList />,
    permission: menuPermissions.notifies.LIST
  }
];

const notifyUserRoutes = [
  {
    enable: false,
    name: 'notify-user',
    path: '/notify/users',
    element: () => <NotifyUserList />,
    permission: ''
  },
  {
    enable: false,
    name: 'notify-user',
    path: '/notify/users/:id',
    element: () => <NotifyUserDetail />,
    permission: ''
  }
];

const notifyTemplateRoutes = [
  {
    enable: true,
    name: 'notify-templates',
    path: '/notify-templates',
    element: () => <NotifyTemplateList />,
    permission: menuPermissions.notifyTemplates.LIST
  },
  {
    enable: true,
    name: 'notify-templates-create',
    path: '/notify-templates/create',
    element: () => <NotifyTemplateCreate />,
    permission: menuPermissions.notifyTemplates.CREATE
  }
];

const routes = [
  ...dashboardRoutes,
  ...notfoundRoutes,
  ...forbiddenRoutes,
  ...organizationRoutes,
  ...projectRoutes,
  ...teamRoutes,
  ...roleRoutes,
  ...permissionRoutes,
  ...userRoutes,
  ...userOnlineRoutes,
  ...userSessionRoutes,
  ...notifyRoutes,
  ...notifyUserRoutes,
  ...notifyTemplateRoutes
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
  },
  {
    enable: true,
    name: 'teams',
    title: 'menu.management.team.title',
    path: '/teams',
    icon: <GroupsIcon />,
    permission: menuPermissions.teams.LIST
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
  },
  {
    enable: true,
    name: 'users-online',
    title: 'menu.authenticate.userOnline.title',
    path: '/users/online',
    icon: <ContentPasteGoIcon />,
    permission: menuPermissions.userOnline.LIST
  }
];

const operationMenus = [
  {
    enable: true,
    name: 'notifies',
    title: 'menu.operation.notify.title',
    path: '/notifies',
    icon: <NotificationsActiveIcon />,
    permission: menuPermissions.notifies.LIST
  },
  {
    enable: true,
    name: 'projects',
    title: 'menu.operation.notifyTemplate.title',
    path: '/notify-templates',
    icon: <ReceiptLongIcon />,
    permission: menuPermissions.notifyTemplates.LIST
  }
];

export {
  routes,
  homeMenus,
  managementMenus,
  authenticateMenus,
  operationMenus
};
