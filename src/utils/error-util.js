import { get } from 'lodash';

export const formatErrorCommonMsg = (err) => {
  const errorMsg = get(err, 'response.data.message') || err.message;

  return errorMsg;
};
