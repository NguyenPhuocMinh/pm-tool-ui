import translationAuth from './translation-auth';
import translationCommon from './translation-common';
import translationPage from './translation-page';
import translationMenu from './translation-menu';
import translationToolbar from './translation-toolbar';
import translationValidator from './translation-validator';
// resources

import translationLogin from './translation-login';
import translationDashboard from './translation-dashboard';
import translationOrganization from './translation-organization';
import translationRole from './translation-role';
import translationUser from './translation-user';
import translationPermission from './translation-permission';

const TRANSLATIONS_EN = {
  auth: translationAuth,
  common: translationCommon,
  page: translationPage,
  menu: translationMenu,
  toolbar: translationToolbar,
  validator: translationValidator,
  resources: {
    logins: translationLogin,
    dashboards: translationDashboard,
    organizations: translationOrganization,
    roles: translationRole,
    users: translationUser,
    permissions: translationPermission
  }
};

export default TRANSLATIONS_EN;
