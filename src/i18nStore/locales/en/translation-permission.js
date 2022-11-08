const translationPermission = {
  title: {
    create: 'Create Permission',
    edit: 'Edit Permission',
    tabs: {
      roles: 'Set Roles'
    }
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
  search: 'Search by name',
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
      idNotFound: 'Not found ID',
      duplicateName: 'Permission name has duplicate',
      requiredName: 'Permission name is required'
    },
    success: {
      create: 'Create permission successfully!',
      edit: 'Edit permission successfully!',
      delete: 'Delete permission successfully!',
      addRoles: 'Add role to permission successfully!'
    }
  }
};

export default translationPermission;
