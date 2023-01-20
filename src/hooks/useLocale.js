import { useTranslate } from '@hooks';
import constants from '@constants';

const useLocale = () => {
  const { i18n } = useTranslate();

  switch (i18n.language) {
    case 'en':
      return {
        locale: constants.LANGUAGES.EN
      };
    case 'vn':
      return {
        locale: constants.LANGUAGES.VN
      };
    default:
      return {
        locale: constants.LANGUAGES.EN
      };
  }
};

export default useLocale;
