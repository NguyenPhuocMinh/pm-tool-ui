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
      e001: 'Data Invalid',
      e002: 'Role Has Duplicate',
      e003: 'ID Not Found'
    },
    success: {
      s001: 'Get List Role Success',
      s002: 'Create Role Success',
      s003: 'Get Role By Id Success',
      s004: 'Update Role Success',
      s005: 'Delete Role Success',
      s006: 'Get Users In Role Success',
      s007: 'Get Permissions In Role Success'
    }
  }
};

export default translationRole;
