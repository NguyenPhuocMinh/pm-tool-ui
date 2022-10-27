import { useState } from 'react';
// mui material
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
// react router dom
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '@reduxStore/actions';
import { get } from 'lodash';
// formik
import { useFormik } from 'formik';
import { validatorLogin } from '@validators';
// hooks
import { useTranslate } from '@hooks';
// themes
import { lightTheme } from '@themes';
// component
import { TextInput } from '@components';

const useStyles = makeStyles({
  input: {
    width: 300
  }
});

const LoginResource = () => {
  // state
  const [showPassword, setShowPassword] = useState(false);
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store
  const { loading } = useSelector((state) => {
    return {
      loading: get(state, 'auth.loading')
    };
  });

  // formik
  const initialValues = {
    email: '',
    password: ''
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    initialValues,
    validationSchema: validatorLogin(translate),
    onSubmit: (values) => handleSubmitLogin(values)
  });

  const handleSubmitLogin = (values) => {
    dispatch(loginAction(navigate, values));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'url(https://source.unsplash.com/random/1600x900)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden',
          boxShadow: 1,
          fontWeight: 'bold',
          borderRadius: 5
        }}
      >
        <Box
          sx={{
            minWidth: 400
          }}
        >
          <Card>
            <Box
              component="div"
              sx={{
                marginTop: '1em',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {translate('resources.logins.title')}
            </Box>
            <CardContent>
              <Box
                sx={{
                  marginTop: '1em',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <TextInput
                  label="resources.logins.fields.email"
                  required
                  id="email"
                  source="email"
                  className={classes.input}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  }
                  {...formProps}
                />
              </Box>
              <Box
                sx={{
                  marginTop: '1em',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <TextInput
                  label="resources.logins.fields.password"
                  source="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className={classes.input}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
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
            </CardContent>
            <CardActions
              sx={{
                padding: '0 1em 1em 1em',
                justifyContent: 'center'
              }}
            >
              <Button
                sx={{
                  width: 'auto',
                  minWidth: 256,
                  borderRadius: 12,
                  textTransform: 'capitalize',
                  color: '#fff'
                }}
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                disabled={!isValid || !dirty || loading}
              >
                {loading && (
                  <CircularProgress
                    sx={{ marginRight: '5px' }}
                    color="primary"
                    size={20}
                    thickness={2}
                  />
                )}
                {translate('common.button.login')}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

const LoginWithTheme = (props) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <LoginResource {...props} />
    </ThemeProvider>
  );
};

export default LoginWithTheme;