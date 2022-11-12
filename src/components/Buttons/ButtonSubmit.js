import { useTranslate } from '@hooks';
import { Button } from '@mui/material';
import { LoadingRegular } from '@components/regulars';

const ButtonSubmit = ({ sx, onClick, color, isValid, dirty, loading }) => {
  const { translate } = useTranslate();

  return (
    <Button
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
      {loading && <LoadingRegular />}
      {translate('common.button.save')}
    </Button>
  );
};

export default ButtonSubmit;
