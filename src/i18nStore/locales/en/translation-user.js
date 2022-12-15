const translationUser = {
  title: {
    list: 'User List',
    create: 'Create User',
    edit: 'Edit User',
    tabs: {
      details: 'User Details',
      pass: 'Set User Password',
      roles: 'Set User Roles'
    },
    resetPass: 'Reset Password',
    isPasswordSet: 'Password has been set'
  },
  description: {
    list: 'This page are manage users has been create',
    isPasswordSet:
      'Once the password has been set, the password can only be refreshed'
  },
  fields: {
    firstName: 'First Name',
    lastName: 'Last Name',
    fullName: 'Full Name',
    email: 'Email',
    password: 'Password',
    passwordConfirm: 'Password Confirm',
    isPasswordTemporary: 'Temporary',
    isAdmin: 'IsAdmin',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  },
  tabs: {
    details: 'Details',
    setPassword: 'Set Password',
    setRolesToUser: 'Set Roles'
  },
  search: 'Search by name, email',
  popup: {
    title: 'Delete User',
    content:
      'Are you sure you want to permanently delete the user {{userName}}?',
    verifyName: 'Please input user {{userName}}'
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
      e002: 'Email Has Duplicate',
      e003: 'ID Not Found',
      e004: 'Data Change Password Invalid',
      e005: 'Current Password Is Not Matches',
      e006: 'Data Set Password Invalid',
      e007: 'Data Reset Password Invalid'
    },
    success: {
      s001: 'Get List User Success',
      s002: 'Create User Success',
      s003: 'Get User By Id Success',
      s004: 'Update User Success',
      s005: 'Delete User Success',
      s006: 'Change User Password Success',
      s007: 'Set User Password Success',
      s008: 'Reset User Password Success',
      s009: 'Add Role To User Success'
    }
  }
};

export default translationUser;
