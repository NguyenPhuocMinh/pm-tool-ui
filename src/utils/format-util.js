import moment from 'moment';

export const dateTimeFormat = (value) => {
  return moment(value).utc().format('DD-MM-YYYY h:mm:ss A');
};
