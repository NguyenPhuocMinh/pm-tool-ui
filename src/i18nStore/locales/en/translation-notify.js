const translationNotify = {
  title: {
    list: 'Organization List',
    create: 'Create Organization',
    edit: 'Edit Organization'
  },
  description: {
    list: 'This page are manage organization has been create'
  },
  fields: {
    name: 'Organization Name',
    activated: 'Activated',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    verify: 'Verify'
  },
  search: 'Search by organization',
  popup: {
    title: 'Delete Organization',
    content:
      'Are you sure you want to permanently delete the organization {{organizationName}}?',
    verifyName: 'Please input organization {{organizationName}}'
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
