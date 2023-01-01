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
  tabs: {
    notifyUserAll: 'Notify User All',
    notifyUserTrash: 'Notify User Trash'
  },
  search: 'Search by topic...',
  notifications: {
    errors: {
      e001: 'ID Not Found',
      e002: 'Not Found Notify In Trash'
    },
    success: {
      s001: 'Get List Notify User Success',
      s002: 'Get Detail Notify User Success',
      s003: 'Get All Data Notify User Success',
      s004: 'Get All Unread Notify User Success',
      s005: 'Read Notify User Success',
      s006: 'Read All Notify User Success',
      s007: 'Move To Trash Notify User Success',
      s008: 'Deleted All Notify User Success',
      s009: 'Get All Data Trash Notify User Success',
      s0010: 'Roll Back Data Trash Notify User Success',
      s0011: 'Roll Back All Data Trash Notify User Success'
    }
  }
};

export default translationNotifyUser;
