import { useTranslate } from '@hooks';
import { Button } from '@mui/material';
import { CircularCommon } from '@utilities';

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
        background: (theme) => color?.hex ?? theme.palette.primary.main,
        ...sx
      }}
      variant="contained"
      type="submit"
      onClick={handleSubmit}
      disabled={!isValid || !dirty || loading}
    >
      {loading && <CircularCommon />}
      {translate('common.label.confirm')}
    </Button>
  );
};

export default ButtonConfirm;
