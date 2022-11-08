import { object, string } from 'yup';

export const validatorPermission = (translate) => {
  return object().shape({
    name: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .uppercase(translate('validator.uppercase'))
      .max(100, translate('validator.maxLength', { max: 100 }))
  });
};
