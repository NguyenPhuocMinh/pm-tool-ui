import { Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

const DialogCustom = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export default DialogCustom;
