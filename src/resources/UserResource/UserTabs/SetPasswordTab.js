import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslate } from '@hooks';
import { Visibility, VisibilityOff, HelpOutline } from '@mui/icons-material';
import { setPasswordByUserIdAction } from '@reduxStore/actions';
import {
  TypoCommon,
  TextInput,
  SwitchInput,
  ButtonSubmit,
  ButtonCancel,
  ResetPasswordCommon,
  TooltipCommon
} from '@utilities';
import { validatorUserSetPassword } from '@validators';

const useStyles = makeStyles({
  input: {
    width: 400
  }
});

const SetPasswordTab = () => {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);

  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { records, loading, color } = useSelector((state) => {
    return {
      records: get(state, 'user.records', {}),
      loading: get(state, 'user.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const initialValues = {
    password: '',
    passwordConfirm: '',
    isPasswordTemporary: false
  };

  const handleUpdate = (userID, values) => {
    dispatch(setPasswordByUserIdAction(userID, values));
  };

  const handleCancel = () => {
    navigate('/users');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    initialValues,
    validationSchema: validatorUserSetPassword(translate),
    onSubmit: (values) => {
      return handleUpdate(records.id, values);
    }
  });

  const handleClickOpenResetPassword = () => {
    setOpenResetPassword(true);
  };

  const handleCloseResetPassword = () => {
    setOpenResetPassword(false);
  };

  const isPasswordSet = get(records, 'isPasswordSet', false);

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardHeader
          subheader={
            <Box display="flex" alignItems="center">
              <TypoCommon
                variant="body2"
                fontWeight={600}
                label="resources.users.title.tabs.pass"
              />
            </Box>
          }
        />
        {isPasswordSet ? (
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
                marginBottom: '2em'
              }}
            >
              <TooltipCommon title="resources.users.description.isPasswordSet">
                <HelpOutline />
              </TooltipCommon>
              <TypoCommon
                sx={{
                  marginRight: '1em'
                }}
                variant="body2"
                fontWeight={600}
                label="resources.users.title.isPasswordSet"
              />
              <Box>
                <Button
                  id="button-reset-password"
                  sx={{
                    width: 'auto',
                    minWidth: 150,
                    borderRadius: 12,
                    textTransform: 'capitalize',
                    ':hover': {
                      background: (theme) =>
                        color?.hex ?? theme.palette.primary.main
                    },
                    fontFamily: 'Josefin Sans',
                    background: (theme) =>
                      color?.hex ?? theme.palette.primary.main
                  }}
                  variant="contained"
                  onClick={handleClickOpenResetPassword}
                >
                  {translate('common.button.resetPass')}
                </Button>
                <ResetPasswordCommon
                  userID={records.id}
                  openResetPassword={openResetPassword}
                  setOpenResetPassword={setOpenResetPassword}
                  handleCloseResetPassword={handleCloseResetPassword}
                />
              </Box>
            </Box>
          </CardContent>
        ) : (
          <CardContent>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
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
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
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
            <Box
              sx={{
                marginRight: '2em'
              }}
            >
              <SwitchInput
                label="resources.users.fields.isPasswordTemporary"
                id="isPasswordTemporary"
                source="isPasswordTemporary"
                {...formProps}
              />
            </Box>
          </CardContent>
        )}
        <CardActions>
          <ButtonSubmit
            color={color}
            onClick={handleSubmit}
            loading={loading}
            isValid={isValid}
            dirty={dirty}
          />
          <ButtonCancel color={color} onClick={handleCancel} />
        </CardActions>
      </Card>
    </Box>
  );
};

export default SetPasswordTab;
