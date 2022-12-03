import constants from '@constants';

import LogoutIcon from '@mui/icons-material/Logout';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import HttpsIcon from '@mui/icons-material/Https';

export const convertTitleAndContentTimeline = (reason) => {
  switch (reason) {
    case constants.REASONS.USER_LOGOUT:
      return {
        title: 'userSession.reasons.titles.userLogout',
        content: 'userSession.reasons.contents.userLogout',
        icon: <LogoutIcon />
      };
    case constants.REASONS.USER_TOKEN_EXPIRED:
      return {
        title: 'userSession.reasons.titles.userTokenExpired',
        content: 'userSession.reasons.contents.userTokenExpired',
        icon: <TimerOffIcon />
      };
    case constants.REASONS.USER_TOKEN_REVOKED:
      return {
        title: 'userSession.reasons.titles.userTokenRevoked',
        content: 'userSession.reasons.contents.userTokenRevoked',
        icon: <HttpsIcon />
      };
    default:
      return {
        title: '',
        content: '',
        icon: <LogoutIcon />
      };
  }
};
