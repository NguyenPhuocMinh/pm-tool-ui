import { forwardRef } from 'react';
// mui material
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';

export const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

export const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

Alert.displayName = Alert;
