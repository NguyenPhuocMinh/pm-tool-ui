import { object, string, array } from 'yup';

export const validatorProjectCreateOrUpdate = (translate) => {
  return object().shape({
    name: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .max(100, translate('validator.maxLength', { max: 100 }))
  });
};

export const validatorAddTeamToProject = (translate) => {
  return object().shape({
    teams: array().ensure().required(translate('validator.required'))
  });
};
