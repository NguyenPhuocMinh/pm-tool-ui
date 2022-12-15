import { Stack } from '@mui/material';

const StackRowCommon = ({ sx, children, alignItems = 'center' }) => {
  return (
    <Stack sx={sx} spacing={1} direction="row" alignItems={alignItems}>
      {children}
    </Stack>
  );
};

export default StackRowCommon;
