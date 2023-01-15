import { useSelector } from 'react-redux';
import { useTranslate } from '@hooks';
import { ButtonRegular, ButtonConfirm } from '@utilities';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { get } from 'lodash';

const DialogCommon = ({
  open,
  setOpen,
  title,
  content,
  contentBody,
  handleConfirm,
  handleReset,
  isLoading,
  isValid,
  dirty
}) => {
  const { translate } = useTranslate();

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color')
    };
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle>{translate(title)}</DialogTitle>
      <DialogContent>
        <DialogContentText>{translate(content)}</DialogContentText>
        <Box
          sx={{
            margin: '20px 0'
          }}
        >
          {contentBody}
        </Box>
      </DialogContent>
      <DialogActions>
        <ButtonRegular
          variant="outlined"
          label="common.label.cancel"
          onClick={handleClose}
        />
        <ButtonConfirm
          color={color}
          onClick={handleConfirm}
          onReset={handleReset}
          loading={isLoading}
          isValid={isValid}
          dirty={dirty}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogCommon;
