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

export const validatorOrganizationDelete = (translate) => {
  return object().shape({
    verify: string().required(translate('validator.required'))
  });
};

export const validatorOrganizationProject = (translate) => {
  return object().shape({
    verify: string().required(translate('validator.required'))
  });
};
