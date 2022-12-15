import { Stack } from '@mui/material';

const StackColumnCommon = ({ sx, children }) => {
  return (
    <Stack sx={sx} spacing={1} direction="column" alignItems="center">
      {children}
    </Stack>
  );
};

export default StackColumnCommon;
