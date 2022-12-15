const translationNotify = {
  title: {
    list: 'Notify List',
    create: 'Create Notify',
    edit: 'Edit Notify'
  },
  description: {
    list: 'This page are manage notify has been create'
  },
  fields: {
    name: 'Notify Name',
    activated: 'Activated',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  },
  search: 'Search by notify',
  popup: {
    title: 'Delete Notify',
    content:
      'Are you sure you want to permanently delete the notify {{notifyName}}?',
    verifyName: 'Please input notify {{notifyName}}'
  },
  notifications: {
    errors: {
      idNotFound: 'Not found ID',
      templateNotFound: 'Notify Template Not Found'
    },
    success: {}
  }
};

export default translationNotify;
