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
    lastAccess: 'Last access'
  },
  search: 'Search by user...',
  popup: {
    title: 'Delete Session',
    content:
      'Are you sure you want to permanently delete the session {{sessionName}}?',
    verifyName: 'Please input role {{sessionName}}'
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
