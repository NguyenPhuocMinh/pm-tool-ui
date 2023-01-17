import moment from 'moment';
import constants from '@constants';
import { isEmpty } from 'lodash';

export const dateTimeFormat = (value) => {
  return !isEmpty(value)
    ? moment(value).utc().format(constants.DATE_TIME_FORMAT)
    : null;
};
