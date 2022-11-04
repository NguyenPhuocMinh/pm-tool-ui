const translationValidator = {
  required: 'Required',
  minLength: 'Must be {{min}} characters at least',
  maxLength: 'Must be {{max}} characters or less',
  minValue: 'Must be at least {{min}}',
  maxValue: 'Must be {{max}} or less',
  password:
    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
  password_confirm: 'Password confirm does not match password',
  email: 'Email does not match format',
  trim: 'Please remove space',
  uppercase: 'Please input uppercase words',
  notMatchesValue: 'Not matches value {{verifyValue}}'
};

export default translationValidator;
