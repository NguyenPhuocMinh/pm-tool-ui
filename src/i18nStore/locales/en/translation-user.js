const translationUser = {
  title: {
    create: 'Create User',
    edit: 'Edit User',
    tabs: {
      pass: 'Set password temporary',
      roles: 'Set Roles'
    }
  },
  fields: {
    firstName: 'First Name',
    lastName: 'Last Name',
    fullName: 'Full Name',
    email: 'Email',
    password: 'Password',
    passwordConfirm: 'Password Confirm',
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
      fistNameIsRequired: 'First name is required',
      lastNameIsRequired: 'Last name is required',
      emailIsRequired: 'Email is required',
      passwordIsRequired: 'Password is required',
      passwordConfirmIsRequired: 'Password confirm is required',
      emailIsNotFormat: 'Email invalid format',
      passwordIsValidLength: 'Password is invalid length',
      passwordConfirmIsValidLength: 'Password confirm is invalid length',
      passwordConfirmIsNotMatches: 'Password confirm is not matches',
      currentPasswordIsRequired: 'Current password is required',
      newPasswordConfirmIsRequired: 'New password confirm is required',
      currentPasswordIsNotMatches: 'Current password is not matches',
      emailIsDuplicate: 'Email has duplicate',
      idNotFound: 'Not found ID'
    },
    success: {
      create: 'Create user successfully!',
      edit: 'Edit user successfully!',
      delete: 'Delete user successfully!',
      changePass: 'Change password successfully!',
      addRoles: 'Add role to user successfully!',
      setPassword: 'Set temporary password successfully!'
    }
  }
};

export default translationUser;
