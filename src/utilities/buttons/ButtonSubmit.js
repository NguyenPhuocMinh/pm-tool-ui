import { useTranslate } from '@hooks';
import { Button } from '@mui/material';
import { CircularCommon } from '@utilities';

const ButtonSubmit = ({ id, sx, onClick, color, isValid, dirty, loading }) => {
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
          background: (theme) => color?.hex ?? theme.palette.primary.main
        },
        fontFamily: 'Josefin Sans',
        background: (theme) => color?.hex ?? theme.palette.primary.main,
        ...sx
      }}
      variant="contained"
      type="submit"
      onClick={onClick}
      disabled={!isValid || !dirty || loading}
    >
      {loading && <CircularCommon />}
      {translate('common.button.save')}
    </Button>
  );
};

export default ButtonSubmit;
