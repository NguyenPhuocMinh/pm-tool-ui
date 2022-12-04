import moment from 'moment';
import constants from '@constants';

export const dateTimeFormat = (value) => {
  return moment(value).utc().format(constants.DATE_TIME_FORMAT);
};
