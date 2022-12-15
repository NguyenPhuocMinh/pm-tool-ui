import commonConstants from './common-constant';
import forageConstants from './forage-constant';
import socketConstants from './socket-constant';
import notifyConstants from './notify-constant';

const constants = {
  APP_NAME: 'PM-TOOL',
  ...commonConstants,
  ...forageConstants,
  ...socketConstants,
  ...notifyConstants
};

export default constants;
