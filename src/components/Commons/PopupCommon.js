import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from '@hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { hidePopup } from '@reduxStore/actions';
import { isEmpty, get } from 'lodash';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = 'Transition';

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center' }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            border: 'none !important'
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

const PopupCommon = () => {
  const { translate } = useTranslate();

  const { popup } = useSelector((state) => {
    return {
      popup: get(state, 'common.popup', {})
    };
  });

  const { open = false, title, content, onSubmit, options } = popup;

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hidePopup());
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="sm"
    >
      <BootstrapDialogTitle
        sx={{
          background: (theme) => theme.palette.primary.main
        }}
        onClose={handleClose}
      >
        {translate(title)}
      </BootstrapDialogTitle>
      <DialogContent
        dividers
        sx={{
          height: 'auto',
          minHeight: '150px'
        }}
      >
        <DialogContentText>
          {!isEmpty(options) ? translate(content, options) : translate(content)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            width: 'auto',
            minWidth: 150,
            borderRadius: 12,
            textTransform: 'capitalize',
            ':hover': {
              background: 'none'
            }
          }}
          variant="outlined"
          onClick={handleClose}
        >
          {translate('common.button.cancel')}
        </Button>
        <Button
          sx={{
            width: 'auto',
            minWidth: 150,
            borderRadius: 12,
            textTransform: 'capitalize',
            ':hover': {
              background: 'none'
            }
          }}
          variant="contained"
          onClick={onSubmit}
        >
          {translate('common.button.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupCommon;
