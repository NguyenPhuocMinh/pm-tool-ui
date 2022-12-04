import commonConstants from './common-constant';
import forageConstants from './forage-constant';
import socketConstants from './socket-constant';

const constants = {
  APP_NAME: 'PM-TOOL',
  ...commonConstants,
  ...forageConstants,
  ...socketConstants
};

export default constants;
