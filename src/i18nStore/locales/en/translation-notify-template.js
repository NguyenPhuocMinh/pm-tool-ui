const translationNotifyTemplate = {
  title: {
    list: 'Notify Template List',
    create: 'Create Notify Template',
    edit: 'Edit Notify Template'
  },
  description: {
    list: 'This page are manage notify template has been create'
  },
  fields: {
    topic: 'Topic',
    description: 'Description',
    content: 'Content',
    type: 'Type Notification',
    activated: 'Activated',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  },
  types: {
    t001: 'NOTIFY_SYSTEM',
    t002: 'NOTIFY_EVENT',
    t003: 'NOTIFY_WARNING',
    t004: 'NOTIFY_IMPORTANT',
    t005: 'NOTIFY_REMIND',
    t006: 'NOTIFY_REMIND_CHANGE_PASS_TEMPORARY'
  },
  search: 'Search by notify template...',
  popup: {
    title: 'Delete NotifyTemplate',
    content:
      'Are you sure you want to permanently delete the notify template {{notifyTemplateName}}?',
    verifyName: 'Please input notify template {{notifyTemplateName}}'
  },
  notifications: {
    errors: {
      invalidData: 'Invalid Data'
    },
    success: {
      create: 'Create notify template successfully!',
      edit: 'Edit notify template successfully!',
      delete: 'Delete notify template successfully!'
    }
  }
};

export default translationNotifyTemplate;
