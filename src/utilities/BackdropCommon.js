import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { get } from 'lodash';

const BackdropCommon = ({ sx, loading }) => {
  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  return (
    <Backdrop
      sx={{
        color: color?.hex,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ...sx
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropCommon;
