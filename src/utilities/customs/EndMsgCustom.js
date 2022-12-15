import { useTranslate } from '@hooks';
import { Box, Typography } from '@mui/material';
import { defaultSx } from '@utils';

const EndMsgCustom = ({ message = 'common.messages.endMsg' }) => {
  const { translate } = useTranslate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1em 0'
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          lineHeight: defaultSx.lineHeight,
          fontFamily: defaultSx.fontFamily
        }}
      >
        {translate(message)}
      </Typography>
    </Box>
  );
};

export default EndMsgCustom;
