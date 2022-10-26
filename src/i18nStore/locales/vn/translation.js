import translationCommon from './translation-common';
import translationValidator from './translation-validator';

// resources
import translationLogin from './translation-login';

const TRANSLATIONS_VN = {
  common: translationCommon,
  validator: translationValidator,
  resources: {
    logins: translationLogin
  }
};

export default TRANSLATIONS_VN;
