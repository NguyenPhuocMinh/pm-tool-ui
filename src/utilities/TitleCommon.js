import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import { Box } from '@mui/material';
// hooks
import { useTranslate } from '@hooks';
import { warning } from '@utils';

const TitleCommon = ({ className, defaultTitle, record, title, ...rest }) => {
  const { translate } = useTranslate();

  warning(!defaultTitle && !title, 'Missing title prop in <Title> element');

  const titleElement = !title ? (
    <span className={className} {...rest}>
      {defaultTitle}
    </span>
  ) : typeof title === 'string' ? (
    <span className={className} {...rest}>
      {translate(title, { _: title })}
    </span>
  ) : (
    cloneElement(title, { className, record, ...rest })
  );
  return (
    <Box sx={{ textAlign: 'center', marginTop: '2em' }}>{titleElement}</Box>
  );
};

export const TitlePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element
]);

export default TitleCommon;
