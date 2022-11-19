import { includes } from 'lodash';

export const warning = (condition, message) => {
  if (condition && process.env.NODE_ENV !== 'production') {
    console.warn(message); // eslint-disable-line
  }
};

export const checkExpiredTime = (exp) => {
  const clockTimestamp = Math.floor(new Date().getTime() / 1000);
  /**
   * Check expired after 30ms to call refresh
   */
  const callRefresh = clockTimestamp + 30 >= exp;
  console.info('Call refresh', callRefresh);

  return callRefresh;
};

export const checkSubMenuPer = (
  userPermissions = [],
  subMenuPermissions = []
) => {
  const isAllowed = subMenuPermissions.map((subPer) => {
    return userPermissions.includes(subPer);
  });

  return isAllowed.includes(true);
};

export const checkAuthorization = (userPermissions = [], permission = '') => {
  return includes(userPermissions, permission);
};

export const authAllowed = ({ payload, permission }) => {
  const { isAdmin, permissions } = payload;

  return isAdmin || includes(permissions, permission);
};
