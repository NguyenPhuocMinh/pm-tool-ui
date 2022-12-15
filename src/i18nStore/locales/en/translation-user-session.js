const translationUserSession = {
  title: {
    list: 'Sessions'
  },
  description: {
    list: 'Sessions are sessions of users access within the session'
  },
  fields: {
    user: 'User',
    userAgent: 'User agent',
    ipAddress: 'IP address',
    startAccess: 'Start access',
    lastAccess: 'Last access',
    reason: 'Reason'
  },
  search: 'Search by user...',
  popup: {
    title: 'Delete Session',
    content:
      'Are you sure you want to permanently delete the session {{sessionName}}?',
    verifyName: 'Please input role {{sessionName}}'
  },
  reasons: {
    titles: {
      userLogout: 'User logout session',
      userTokenExpired: 'User has expired token',
      userTokenRevoked: 'User has revoked token',
      userAreOnline: 'User are online'
    },
    contents: {
      userLogout: 'The user has logged out in session',
      userTokenExpired: 'User was logged out when token expired',
      userTokenRevoked: 'User was logged out when token revoked',
      userAreOnline: 'User are online'
    }
  },
  notifications: {
    errors: {
      e001: 'ID Not Found'
    },
    success: {
      s001: 'Get User Timeline Success',
      s002: 'Create User Session Success',
      s003: 'Update User Session Success',
      s004: 'Delete User Session Success'
    }
  }
};

export default translationUserSession;
