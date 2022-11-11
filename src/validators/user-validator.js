import { object, string } from 'yup';

export const validatorUserCreate = (translate) => {
  return object().shape({
    firstName: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .min(2, translate('validator.minLength', { min: 2 }))
      .max(100, translate('validator.maxLength', { max: 100 })),
    lastName: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .min(2, translate('validator.minLength', { min: 2 }))
      .max(100, translate('validator.maxLength', { max: 100 })),
    email: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .email(translate('validator.email'))
  });
};

export const validatorUserEdit = (translate) => {
  return object().shape({
    firstName: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .min(2, translate('validator.minLength', { min: 2 }))
      .max(100, translate('validator.maxLength', { max: 100 })),
    lastName: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .min(2, translate('validator.minLength', { min: 2 }))
      .max(100, translate('validator.maxLength', { max: 100 }))
  });
};

export const validatorUserSetPassword = (translate) => {
  return object().shape({
    password: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .min(8, translate('validator.minLength', { min: 8 }))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        translate('validator.password')
      ),
    passwordConfirm: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .min(8, translate('validator.minLength', { min: 8 }))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        translate('validator.password')
      )
  });
};
