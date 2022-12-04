import { useState } from 'react';
import { useTranslate } from '@hooks';
import { useSelector, useDispatch } from 'react-redux';
import { resetPasswordByUserIdAction } from '@reduxStore/actions';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextInput, ButtonSubmit, ButtonCancel } from '@utilities';
import { useFormik } from 'formik';
import { validatorUserSetPassword } from '@validators';
import { get } from 'lodash';

const useStyles = makeStyles({
  input: {
    width: 400
  }
});

const ResetPasswordCommon = ({
  userID,
  openResetPassword,
  handleCloseResetPassword
}) => {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const { loading, color } = useSelector((state) => {
    return {
      loading: get(state, 'user.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const initialValues = {
    password: '',
    passwordConfirm: ''
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    initialValues,
    validationSchema: validatorUserSetPassword(translate),
    onSubmit: (values) => handleResetPassword(userID, values)
  });

  const handleResetPassword = (id, values) => {
    dispatch(resetPasswordByUserIdAction(id, values));
    handleCloseResetPassword();
  };

  return (
    <Dialog
      open={openResetPassword}
      onClose={handleCloseResetPassword}
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          fontFamily: 'Josefin Sans'
        }}
      >
        {translate('resources.users.title.resetPass')}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: '2em', marginRight: '2em', marginBottom: '2em' }}>
          <TextInput
            label="resources.users.fields.password"
            required
            type={showPassword ? 'text' : 'password'}
            id="password"
            source="password"
            className={classes.input}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    border: 'none !important',
                    ':hover': {
                      background: 'none'
                    },
                    marginRight: '-8px !important'
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            {...formProps}
          />
        </Box>
        <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
          <TextInput
            label="resources.users.fields.passwordConfirm"
            required
            type={showPasswordConfirm ? 'text' : 'password'}
            id="passwordConfirm"
            source="passwordConfirm"
            className={classes.input}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    border: 'none !important',
                    ':hover': {
                      background: 'none'
                    },
                    marginRight: '-8px !important'
                  }}
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            {...formProps}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <ButtonSubmit
          color={color}
          onClick={handleSubmit}
          loading={loading}
          isValid={isValid}
          dirty={dirty}
        />
        <ButtonCancel color={color} onClick={handleCloseResetPassword} />
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordCommon;
