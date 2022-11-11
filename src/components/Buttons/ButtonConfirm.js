import { useTranslate } from '@hooks';
import { Button } from '@mui/material';
import { LoadingRegular } from '@components/index';

const ButtonConfirm = ({
  sx,
  onClick,
  onReset,
  color,
  isValid,
  dirty,
  loading
}) => {
  const { translate } = useTranslate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick();
    onReset();
  };

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
      onClick={handleSubmit}
      disabled={!isValid || !dirty || loading}
    >
      {loading && <LoadingRegular />}
      {translate('common.button.confirm')}
    </Button>
  );
};

export default ButtonConfirm;
