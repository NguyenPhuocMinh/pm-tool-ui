const translationUserOnline = {
  title: {
    list: 'User Online'
  },
  description: {
    list: 'This page are manage users is online'
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

export default translationUserOnline;
