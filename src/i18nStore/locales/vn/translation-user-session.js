const translationUserSession = {
  title: {
    list: 'Phiên'
  },
  description: {
    list: 'Phiên là phiên người dùng truy cập trong phiên'
  },
  fields: {
    user: 'Người sử dụng',
    userAgent: 'Thiết bị người dùng',
    ipAddress: 'Địa chỉ IP',
    startAccess: 'Bắt đầu truy cập',
    lastAccess: 'Truy cập lần cuối',
    reason: 'Lý do'
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
