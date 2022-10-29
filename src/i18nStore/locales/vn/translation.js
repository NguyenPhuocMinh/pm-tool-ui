import translationCommon from './translation-common';
import translationPage from './translation-page';
import translationMenu from './translation-menu';
import translationToolbar from './translation-toolbar';
import translationValidator from './translation-validator';

// resources
import translationLogin from './translation-login';
import translationOrganization from './translation-organization';
import translationRole from './translation-role';
import translationUser from './translation-user';

const TRANSLATIONS_VN = {
  common: translationCommon,
  page: translationPage,
  menu: translationMenu,
  toolbar: translationToolbar,
  validator: translationValidator,
  resources: {
    logins: translationLogin,
    organizations: translationOrganization,
    roles: translationRole,
    users: translationUser
  }
};

export default TRANSLATIONS_VN;
