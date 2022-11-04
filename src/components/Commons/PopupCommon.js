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
  IconButton,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from '@components/inputs';
import { hidePopup } from '@reduxStore/actions';
import { useFormik } from 'formik';
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
  const dispatch = useDispatch();

  const { popup, color } = useSelector((state) => {
    return {
      popup: get(state, 'common.popup', {}),
      color: get(state, 'common.color', {})
    };
  });

  const {
    open = false,
    title,
    content,
    verifyName,
    validator,
    onSubmit,
    options
  } = popup;

  const initialValues = {
    verify: ''
  };

  const { isValid, dirty, setFieldTouched, ...formProps } = useFormik({
    initialValues,
    validationSchema: validator
  });

  const handleClose = () => {
    dispatch(hidePopup());
    setFieldTouched('verify', false);
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
          fontFamily: 'Josefin Sans',
          background: (theme) => color?.hex ?? theme.palette.primary.main
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
        <DialogContentText sx={{ fontFamily: 'Josefin Sans' }}>
          {!isEmpty(options) ? translate(content, options) : translate(content)}
        </DialogContentText>
        <Box sx={{ margin: '1rem' }}>
          <Typography variant="subtitle1" sx={{ fontFamily: 'Josefin Sans' }}>
            {!isEmpty(options)
              ? translate(verifyName, options)
              : translate(verifyName)}
          </Typography>
          <TextInput
            label=""
            required
            id="verify"
            source="verify"
            sx={{
              width: 350
            }}
            {...formProps}
          />
        </Box>
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
            },
            color: (theme) => color?.hex ?? theme.palette.primary.main,
            borderColor: (theme) => color?.hex ?? theme.palette.primary.main
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
            },
            background: (theme) => color?.hex ?? theme.palette.primary.main
          }}
          disabled={!isValid || !dirty}
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