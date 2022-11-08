import { object, string } from 'yup';

export const validatorVerifyToDelete = (translate, verifyValue) => {
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
