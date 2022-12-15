import { useTranslate } from '@hooks';
import { Button } from '@mui/material';

const ButtonCancel = ({ id, sx, onClick, color }) => {
  const { translate } = useTranslate();

  return (
    <Button
      id={id}
      sx={{
        width: 'auto',
        minWidth: 150,
        borderRadius: 12,
        textTransform: 'capitalize',
        ':hover': {
          background: 'none',
          borderColor: (theme) => color?.hex ?? theme.palette.primary.main
        },
        color: (theme) => color?.hex ?? theme.palette.primary.main,
        borderColor: (theme) => color?.hex ?? theme.palette.primary.main,
        ...sx
      }}
      variant="outlined"
      onClick={onClick}
    >
      {translate('common.label.cancel')}
    </Button>
  );
};

export default ButtonCancel;
