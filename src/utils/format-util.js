import moment from 'moment';
import constants from '@constants';
import { isEmpty } from 'lodash';

export const dateTimeFormat = (value, locale) => {
  moment.locale(locale);
  return !isEmpty(value)
    ? moment(value).format(constants.DATE_TIME_FORMAT)
    : null;
};
