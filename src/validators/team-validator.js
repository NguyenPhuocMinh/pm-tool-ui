import { object, string, array } from 'yup';

export const validatorTeamCreateOrUpdate = (translate) => {
  return object().shape({
    name: string()
      .strict(true)
      .required(translate('validator.required'))
      .trim(translate('validator.trim'))
      .max(100, translate('validator.maxLength', { max: 100 }))
  });
};

export const validatorAddMemberToTeam = (translate) => {
  return object().shape({
    members: array().ensure().required(translate('validator.required'))
  });
};
