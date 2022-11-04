const translationRole = {
  title: {
    create: 'Create Role',
    edit: 'Edit Role'
  },
  fields: {
    name: 'Role Name',
    description: 'Role Description',
    activated: 'Activated',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  },
  search: 'Search by name',
  popup: {
    title: 'Delete Role',
    content:
      'Are you sure you want to permanently delete the role {{roleName}}?',
    verifyName: 'Please input role {{roleName}}'
  },
  notifications: {
    errors: {
      idNotFound: 'Not found ID',
      duplicateName: 'Role name has duplicate',
      requiredName: 'Role name is required'
    },
    success: {
      create: 'Create role successfully!'
    }
  }
};

export default translationRole;
