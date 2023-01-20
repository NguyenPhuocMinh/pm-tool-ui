import { object, string, array } from 'yup';

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

export const validatorAddProjectToOrganization = (translate) => {
  return object().shape({
    projects: array().ensure().required(translate('validator.required'))
  });
};
