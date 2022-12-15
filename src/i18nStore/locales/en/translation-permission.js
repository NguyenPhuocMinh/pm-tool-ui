const translationPermission = {
  title: {
    list: 'Permission List',
    create: 'Create Permission',
    edit: 'Edit Permission',
    tabs: {
      roles: 'Set Roles'
    }
  },
  description: {
    list: 'This page are manage permission has been create'
  },
  fields: {
    id: 'Permission ID',
    name: 'Permission Name',
    description: 'Permission Description',
    activated: 'Activated',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  },
  tabs: {
    details: 'Details',
    setRolesToPermission: 'Set Roles To Permission'
  },
  search: 'Search by name...',
  popup: {
    title: 'Delete Permission',
    content:
      'Are you sure you want to permanently delete the permission {{permissionName}}?',
    verifyName: 'Please input permission {{permissionName}}'
  },
  transferList: {
    roles: {
      titleLeft: 'Available Roles',
      titleRight: 'Assigned Roles'
    }
  },
  notifications: {
    errors: {
      e001: 'Data Invalid',
      e002: 'Permission Has Duplicate',
      e003: 'ID Not Found'
    },
    success: {
      s001: 'Get List Permission Success',
      s002: 'Create Permission Success',
      s003: 'Get Permission By Id Success',
      s004: 'Update Permission Success',
      s005: 'Delete Permission Success',
      s006: 'Add Roles To Permission Success'
    }
  }
};

export default translationPermission;
