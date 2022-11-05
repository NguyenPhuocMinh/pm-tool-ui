import { useTranslate } from '@hooks';
import { Typography } from '@mui/material';

const TypoCommon = ({
  sx,
  label,
  variant,
  component,
  fontWeight,
  gutterBottom
}) => {
  const { translate } = useTranslate();

  return (
    <Typography
      variant={variant}
      component={component}
      fontWeight={fontWeight}
      gutterBottom={gutterBottom}
      sx={{ fontFamily: 'Josefin Sans', ...sx }}
    >
      {translate(label)}
    </Typography>
  );
};

export default TypoCommon;
