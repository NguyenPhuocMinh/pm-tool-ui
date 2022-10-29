import { useNavigate } from 'react-router-dom';
import { useTranslate } from '@hooks';

import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ButtonCreate = (props) => {
  const { redirect } = props;

  const { translate } = useTranslate();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirect);
  };

  return (
    <Button
      sx={{
        textTransform: 'capitalize'
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
