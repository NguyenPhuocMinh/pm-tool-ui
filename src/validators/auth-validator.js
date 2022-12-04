import { object, string } from 'yup';

export const validatorLogin = (translate) => {
  return object().shape({
    email: string()
      .required(translate('validator.required'))
      .email(translate('validator.email')),
    password: string()
      .required(translate('validator.required'))
      .min(6, translate('validator.minLength', { min: 6 }))
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   translate('validator.password')
    // )
  });
};
