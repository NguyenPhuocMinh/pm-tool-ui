import { CircularProgress } from '@mui/material';

const LoadingRegular = () => {
  return (
    <CircularProgress
      sx={{ marginRight: '5px' }}
      color="primary"
      size={20}
      thickness={2}
    />
  );
};

export default LoadingRegular;
