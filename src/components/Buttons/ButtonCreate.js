import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslate } from '@hooks';
import { get } from 'lodash';

import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ButtonCreate = (props) => {
  const { redirect } = props;

  const { translate } = useTranslate();
  const navigate = useNavigate();

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  const handleClick = () => {
    navigate(redirect);
  };

  return (
    <Button
      sx={{
        textTransform: 'capitalize',
        background: color ? color.hex : 'inherit',
        ':hover': {
          background: color ? color.hex : 'inherit'
        }
      }}
      startIcon={<AddCircleIcon />}
      onClick={handleClick}
      variant="contained"
    >
      {translate('common.button.create')}
    </Button>
  );
};

export default ButtonCreate;
