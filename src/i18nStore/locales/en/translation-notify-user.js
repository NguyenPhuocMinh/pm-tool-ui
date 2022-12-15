const translationNotifyUser = {
  title: {
    list: 'Notify User List',
    detail: 'Notify User Detail'
  },
  description: {
    list: 'This page are manage notify of user'
  },
  fields: {
    sender: 'Sender',
    receiver: 'Receiver',
    type: 'Type',
    topic: 'Topic',
    description: 'Description',
    content: 'Content',
    sentAt: 'SentAt',
    deleted: 'Deleted',
    isRead: 'Read'
  },
  search: 'Search by topic...',
  notifications: {
    errors: {
      e001: 'ID Not Found'
    },
    success: {
      s001: 'Get List Notify User Success',
      s002: 'Get Detail Notify User Success',
      s003: 'Get All Data Notify User Success',
      s004: 'Get All Unread Notify User Success'
    }
  }
};

export default translationNotifyUser;
