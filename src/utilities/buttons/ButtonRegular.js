import { useTranslate } from '@hooks';
// mui
import { Button } from '@mui/material';

const ButtonRegular = ({ sx, label, variant, onClick }) => {
  const { translate } = useTranslate();
  return (
    <Button
      sx={{
        width: 'auto',
        minWidth: 150,
        borderRadius: 12,
        textTransform: 'capitalize',
        '&:hover': {
          background: 'none'
        },
        ...sx
      }}
      variant={variant}
      onClick={onClick}
    >
      {translate(label)}
    </Button>
  );
};

export default ButtonRegular;
