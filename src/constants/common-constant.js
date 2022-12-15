const commonConstants = {
  LOCALES: {
    VN: 'vi-VN',
    EN: 'en-US'
  },
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark'
  },
  LANGUAGES: {
    VN: 'vi',
    EN: 'en'
  },
  NOTIFY_LEVEL: {
    ERROR: 'error',
    SUCCESS: 'success',
    INFO: 'info',
    WARN: 'warn'
  },
  HTTP_STATUS: {
    SUCCESS: 200,
    CREATE: 202,
    BAD_REQUEST: 400,
    AUTHORIZATION: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    ERROR_SERVER: 500
  },
  VERTICAL: 'top',
  HORIZONTAL: 'center',
  LIMIT_DEFAULT: 10,
  SORT_DEFAULT: 'createdAt',
  SORT_ORDER: 'desc',
  DATE_FORMAT: 'DD-MM-YYYY',
  DATE_TIME_FORMAT: 'DD-MM-YYYY h:mm:ss A',
  REASONS: {
    USER_LOGOUT: 'USER_LOGOUT',
    USER_TOKEN_EXPIRED: 'USER_TOKEN_EXPIRED',
    USER_TOKEN_REVOKED: 'USER_TOKEN_REVOKED'
  }
};

export default commonConstants;
