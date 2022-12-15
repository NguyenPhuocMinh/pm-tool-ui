import { useCallback } from 'react';
import { useTranslate } from '@hooks';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
// locale
import localeVN from 'dayjs/locale/vi';
import localeEN from 'dayjs/locale/en';
// plugins
import relativeTime from 'dayjs/plugin/relativeTime';

// load plugins
dayjs.extend(utc);
dayjs.extend(relativeTime);

const useDayjs = () => {
  const { i18n } = useTranslate();

  const parseFromNow = useCallback(
    (date) => {
      const locale = i18n.language === 'vn' ? localeVN : localeEN;
      const dayParse = dayjs(date)
        .locale(locale)
        .utc()
        .subtract(7, 'hours')
        .fromNow();

      return dayParse;
    },
    [i18n.language]
  );

  return { parseFromNow };
};

export default useDayjs;
