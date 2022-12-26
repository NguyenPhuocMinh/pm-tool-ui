import { CircularProgress } from '@mui/material';

const CircularCommon = ({ size = 20 }) => {
  return (
    <CircularProgress
      sx={{ marginRight: '5px' }}
      color="primary"
      size={size}
      thickness={2}
    />
  );
};

export default CircularCommon;
