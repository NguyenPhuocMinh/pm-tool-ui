const translationRole = {
  title: {
    list: 'Role List',
    create: 'Create Role',
    edit: 'Edit Role',
    tabs: {
      roles: 'Set Roles'
    }
  },
  description: {
    list: 'This page are manage roles has been create'
  },
  fields: {
    name: 'Role Name',
    description: 'Role Description',
    activated: 'Activated',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  },
  tabs: {
    details: 'Details',
    usersInRole: 'Users In Role',
    permissionsInRole: 'Permissions In Role'
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
      create: 'Create role successfully!',
      edit: 'Edit role successfully!',
      delete: 'Delete role successfully!'
    }
  }
};

export default translationRole;
