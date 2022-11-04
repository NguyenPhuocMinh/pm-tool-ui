import { object, string } from 'yup';

export const validatePermission = (translate) => {
  return object().shape({
    name: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .uppercase(translate('validator.uppercase'))
      .max(100, translate('validator.maxLength', { max: 100 }))
  });
};

export const validateVerifyPermissionToDelete = (translate, verifyValue) => {
  return object().shape({
    verify: string()
      .strict()
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .test(
        'verify',
        translate('validator.notMatchesValue', { verifyValue }),
        (value) => value === verifyValue
      )
  });
};
