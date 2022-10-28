import translationCommon from './translation-common';
import translationPage from './translation-page';
import translationToolbar from './translation-toolbar';
import translationValidator from './translation-validator';

// resources
import translationLogin from './translation-login';

const TRANSLATIONS_EN = {
  common: translationCommon,
  page: translationPage,
  toolbar: translationToolbar,
  validator: translationValidator,
  resources: {
    logins: translationLogin
  }
};

export default TRANSLATIONS_EN;
