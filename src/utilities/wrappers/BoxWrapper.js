import { Box } from '@mui/material';

const BoxWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        padding: '0.5em 0'
      }}
    >
      {children}
    </Box>
  );
};

export default BoxWrapper;
