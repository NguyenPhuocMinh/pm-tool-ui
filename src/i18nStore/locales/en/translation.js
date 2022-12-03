import translationAuth from './translation-auth';
import translationCommon from './translation-common';
import translationPage from './translation-page';
import translationMenu from './translation-menu';
import translationToolbar from './translation-toolbar';
import translationValidator from './translation-validator';
import translationSocket from './translation-socket';

// resources
import translationLogin from './translation-login';
import translationDashboard from './translation-dashboard';
import translationOrganization from './translation-organization';
import translationProject from './translation-project';
import translationRole from './translation-role';
import translationPermission from './translation-permission';
import translationUser from './translation-user';
import translationUserOnline from './translation-user-online';
import translationUserSession from './translation-user-session';

const TRANSLATIONS_EN = {
  auth: translationAuth,
  common: translationCommon,
  page: translationPage,
  menu: translationMenu,
  toolbar: translationToolbar,
  validator: translationValidator,
  socket: translationSocket,
  resources: {
    logins: translationLogin,
    dashboards: translationDashboard,
    organizations: translationOrganization,
    projects: translationProject,
    roles: translationRole,
    permissions: translationPermission,
    users: translationUser,
    usersOnline: translationUserOnline,
    userSession: translationUserSession
  }
};

export default TRANSLATIONS_EN;
