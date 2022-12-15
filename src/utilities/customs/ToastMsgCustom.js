import { get } from 'lodash';
import { useTranslate } from '@hooks';
import { Box, Typography } from '@mui/material';
import { convertNotifyType } from '@helpers';

const ToastMsgCustom = ({ toastInfo }) => {
  // hooks
  const { translate } = useTranslate();

  const template = get(toastInfo, 'template');
  const type = convertNotifyType(template?.type, translate);

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 'bold',
          lineHeight: '1.5rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '200px'
        }}
        variant="body1"
      >
        {`[${type}] ${template?.topic}`}
      </Typography>
      <Typography
        sx={{
          fontWeight: 'bold',
          lineHeight: '1.5rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '200px'
        }}
        variant="body2"
      >
        {template?.topic}
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          lineHeight: '1.5rem',
          textAlign: 'justify'
        }}
        variant="caption"
      >
        {template?.description}
      </Typography>
    </Box>
  );
};

export default ToastMsgCustom;
