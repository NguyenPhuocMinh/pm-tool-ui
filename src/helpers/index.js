import { get } from 'lodash';
import constants from '@constants';

import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import LogoutIcon from '@mui/icons-material/Logout';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import HttpsIcon from '@mui/icons-material/Https';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReportIcon from '@mui/icons-material/Report';
import EventIcon from '@mui/icons-material/Event';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';

export const convertTitleAndContentTimeline = (reason) => {
  switch (reason) {
    case constants.REASONS.USER_LOGOUT:
      return {
        title: 'resources.usersSession.reasons.titles.userLogout',
        content: 'resources.usersSession.reasons.contents.userLogout',
        icon: <LogoutIcon />
      };
    case constants.REASONS.USER_TOKEN_EXPIRED:
      return {
        title: 'resources.usersSession.reasons.titles.userTokenExpired',
        content: 'resources.usersSession.reasons.contents.userTokenExpired',
        icon: <TimerOffIcon />
      };
    case constants.REASONS.USER_TOKEN_REVOKED:
      return {
        title: 'resources.usersSession.reasons.titles.userTokenRevoked',
        content: 'resources.usersSession.reasons.contents.userTokenRevoked',
        icon: <HttpsIcon />
      };
    default:
      return {
        title: 'resources.usersSession.reasons.titles.userAreOnline',
        content: 'resources.usersSession.reasons.contents.userAreOnline',
        icon: <OnlinePredictionIcon />
      };
  }
};

export const convertNotifyType = (type, translate) => {
  switch (type) {
    case constants.NOTIFY_TYPES.NOTIFY_SYSTEM:
      return translate('resources.notifyTemplates.types.t001');
    case constants.NOTIFY_TYPES.NOTIFY_EVENT:
      return translate('resources.notifyTemplates.types.t002');
    case constants.NOTIFY_TYPES.NOTIFY_WARNING:
      return translate('resources.notifyTemplates.types.t003');
    case constants.NOTIFY_TYPES.NOTIFY_IMPORTANT:
      return translate('resources.notifyTemplates.types.t004');
    case constants.NOTIFY_TYPES.NOTIFY_REMIND:
      return translate('resources.notifyTemplates.types.t005');
    case constants.NOTIFY_TYPES.NOTIFY_REMIND_CHANGE_PASS_TEMPORARY:
      return translate('resources.notifyTemplates.types.t006');
    default:
      break;
  }
};

export const convertTypeToIconNotify = (type) => {
  switch (type) {
    case constants.NOTIFY_TYPES.NOTIFY_SYSTEM:
      return <SettingsSystemDaydreamIcon color="primary" />;
    case constants.NOTIFY_TYPES.NOTIFY_EVENT:
      return <EventIcon color="secondary" />;
    case constants.NOTIFY_TYPES.NOTIFY_WARNING:
      return <WarningAmberIcon color="warning" />;
    case constants.NOTIFY_TYPES.NOTIFY_IMPORTANT:
      return <ReportIcon color="error" />;
    case constants.NOTIFY_TYPES.NOTIFY_REMIND:
    case constants.NOTIFY_TYPES.NOTIFY_REMIND_CHANGE_PASS_TEMPORARY:
      return <CalendarViewDayIcon color="action" />;
    default:
      break;
  }
};

export const convertFullName = (firstName = '', lastName = '') => {
  return `${lastName} ${firstName}`;
};

export const convertData = (data = []) => {
  return data.map((e) => {
    return convertDataMap(e);
  });
};

export const convertDataMap = (data) => {
  const id = get(data, 'id');
  const sender = get(data, 'sender');
  const receiver = get(data, 'user');
  const createdAt = get(data, 'createdAt');
  const deleted = get(data, 'deleted');
  const isRead = get(data, 'details.isRead');

  const template = get(data, 'template');
  const topic = get(template, 'topic');
  const description = get(template, 'description');
  const content = get(template, 'content');
  const type = get(template, 'type');

  return {
    id,
    sender,
    receiver,
    createdAt,
    isRead,
    deleted,
    topic,
    description,
    content,
    type
  };
};
