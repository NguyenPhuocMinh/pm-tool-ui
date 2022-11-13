import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAction } from '@reduxStore/actions';
import { get } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate } from '@hooks';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TypoCommon, TextInput, ButtonSubmit, ButtonCancel } from '@utilities';
import { validatorUserCreate } from '@validators';

const useStyles = makeStyles({
  input: {
    width: 400
  }
});

const UserCreate = () => {
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // initialValue
  const initialValues = {
    firstName: '',
    lastName: '',
    email: ''
  };

  const { loading, color } = useSelector((state) => {
    return {
      loading: get(state, 'user.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const handleCreate = useCallback(
    async (records) => {
      dispatch(createUserAction({ navigate }, records));
    },
    [dispatch, navigate]
  );

  const handleCancel = () => {
    navigate('/users');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    initialValues,
    validationSchema: validatorUserCreate(translate),
    onSubmit: (values) => handleCreate(values)
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardHeader
          sx={{
            background: (theme) => color?.hex ?? theme.palette.primary.main
          }}
          subheader={
            <Box display="flex" alignItems="center">
              <TypoCommon
                variant="body2"
                fontWeight={600}
                label="resources.users.title.create"
              />
            </Box>
          }
        />
        <Divider sx={{ width: '100%' }} />
        <CardContent>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            <Box sx={{ marginRight: '32px' }}>
              <TextInput
                label="resources.users.fields.firstName"
                required
                id="firstName"
                source="firstName"
                className={classes.input}
                {...formProps}
              />
            </Box>
            <Box>
              <TextInput
                label="resources.users.fields.lastName"
                required
                id="lastName"
                source="lastName"
                className={classes.input}
                {...formProps}
              />
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <TextInput
              label="resources.users.fields.email"
              required
              id="email"
              source="email"
              className={classes.input}
              {...formProps}
            />
          </Box>
        </CardContent>
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

export default UserCreate;
