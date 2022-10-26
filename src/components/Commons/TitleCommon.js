import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import { createPortal } from 'react-dom';
// hooks
import { useTranslate } from '@hooks';
import { warning } from '../Utils';

const TitleCommon = ({ className, defaultTitle, record, title, ...rest }) => {
  const { translate } = useTranslate();
  const container =
    typeof document !== 'undefined'
      ? document.getElementById('demo-react-title')
      : null;

  if (!container) return null;

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
  return createPortal(titleElement, container);
};

export const TitlePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element
]);

export default TitleCommon;
