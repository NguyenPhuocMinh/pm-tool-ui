import { useTranslate } from '@hooks';
import { Typography } from '@mui/material';

const TypoCommon = ({
  sx,
  label,
  color,
  variant,
  component,
  fontWeight,
  gutterBottom,
  className
}) => {
  const { translate } = useTranslate();

  return (
    <Typography
      color={color}
      variant={variant}
      component={component}
      fontWeight={fontWeight}
      gutterBottom={gutterBottom}
      className={className}
      sx={{ ...sx }}
    >
      {translate(label)}
    </Typography>
  );
};

export default TypoCommon;
