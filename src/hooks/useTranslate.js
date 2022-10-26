import { useCallback } from 'react';
import i18n from 'i18next';

const useTranslate = () => {
  const translate = useCallback((key, options) => {
    return i18n.t(key, options);
  }, []);

  return { translate, i18n };
};

export default useTranslate;
