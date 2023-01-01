import { useTranslate } from '@hooks';
import { useSelector } from 'react-redux';
// mui
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// other
import { CircularCommon } from '@utilities';
import { get } from 'lodash';

const StyledButton = styled(Button)(({ hex }) => {
  return {
    color: hex
  };
});

const ButtonRegular = ({ sx, label, loading, disabled, variant, onClick }) => {
  const { translate } = useTranslate();
  const color = useSelector((state) => get(state, 'common.color'));

  return (
    <StyledButton
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
      hex={color?.hex}
      variant={variant}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <CircularCommon />}
      {translate(label)}
    </StyledButton>
  );
};

export default ButtonRegular;
