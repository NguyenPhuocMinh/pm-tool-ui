import { object, string } from 'yup';

export const validatorProjectCreate = (translate) => {
  return object().shape({
    name: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .max(100, translate('validator.maxLength', { max: 100 }))
  });
};
