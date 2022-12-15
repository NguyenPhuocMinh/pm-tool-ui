import { useTranslate } from '@hooks';
import { Box, Typography } from '@mui/material';
import HotTubIcon from '@mui/icons-material/HotTub';

const NoRowsCommon = () => {
  const { translate } = useTranslate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        opacity: 0.5,
        margin: '5em 5em'
      }}
    >
      <HotTubIcon
        sx={{
          width: '5em !important',
          height: '5em !important'
        }}
      />
      <Typography
        variant="body2"
        sx={{ marginBottom: '1em !important', fontWeight: 'bold' }}
      >
        {translate('common.label.noRows')}
      </Typography>
    </Box>
  );
};

export default NoRowsCommon;
