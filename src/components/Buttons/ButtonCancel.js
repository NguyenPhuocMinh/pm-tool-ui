import { useTranslate } from '@hooks';
import { Button } from '@mui/material';

const ButtonCancel = ({ sx, onClick, color }) => {
  const { translate } = useTranslate();

  return (
    <Button
      sx={{
        width: 'auto',
        minWidth: 150,
        borderRadius: 12,
        textTransform: 'capitalize',
        ':hover': {
          background: 'none',
          borderColor: (theme) => color?.hex ?? theme.palette.primary.main
        },
        fontFamily: 'Josefin Sans',
        color: (theme) => color?.hex ?? theme.palette.primary.main,
        borderColor: (theme) => color?.hex ?? theme.palette.primary.main,
        ...sx
      }}
      variant="outlined"
      onClick={onClick}
    >
      {translate('common.button.cancel')}
    </Button>
  );
};

export default ButtonCancel;
