import { useTranslate } from '@hooks';
import { Typography } from '@mui/material';

const TypoCommon = ({ label, sx }) => {
  const { translate } = useTranslate();
  return (
    <Typography
      variant="body2"
      fontWeight={600}
      sx={{ fontFamily: 'Josefin Sans', ...sx }}
    >
      {translate(label)}
    </Typography>
  );
};

export default TypoCommon;
