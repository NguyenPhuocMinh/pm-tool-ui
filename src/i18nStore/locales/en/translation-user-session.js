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
    lastAccess: 'Last access'
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
      userTokenRevoked: 'User has revoked token'
    },
    contents: {
      userLogout: 'The user has logged out in session',
      userTokenExpired: 'User was logged out when token expired',
      userTokenRevoked: 'User was logged out when token revoked'
    }
  },
  notifications: {
    errors: {
      idNotFound: 'Not found ID'
    },
    success: {
      delete: 'Delete session successfully!',
      revoke: 'Revoke session successfully'
    }
  }
};

export default translationUserSession;
