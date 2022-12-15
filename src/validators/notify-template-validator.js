import { object, string } from 'yup';

export const validatorNotifyTemplateCreate = (translate) => {
  return object().shape({
    topic: string().required(translate('validator.required')),
    description: string().required(translate('validator.required')),
    content: string().required(translate('validator.required')),
    type: string().required(translate('validator.required'))
  });
};
