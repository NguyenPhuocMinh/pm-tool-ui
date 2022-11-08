import { object, string } from 'yup';

export const validatorOrganizationCreate = (translate) => {
  return object().shape({
    name: string().required(translate('validator.required'))
  });
};

export const validatorOrganizationUpdate = (translate) => {
  return object().shape({
    name: string().required(translate('validator.required'))
  });
};
