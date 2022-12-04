import { useTranslate } from '@hooks';
import Tooltip from '@mui/material/Tooltip';

const TooltipCommon = ({ title, placement = 'top-start', children }) => {
  const { translate } = useTranslate();
  return (
    <Tooltip title={translate(title)} placement={placement}>
      {children}
    </Tooltip>
  );
};

export default TooltipCommon;
