import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslate } from '@hooks';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TextInput } from '@components';
import { ButtonSubmit, ButtonCancel } from '@components';
import { updateUserByIdAction } from '@reduxStore/actions';
import { validatorUserEdit } from '@validators';

const useStyles = makeStyles({
  input: {
    width: 400
  }
});

const DetailTab = () => {
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

  const initialValues = useMemo(() => {
    return {
      firstName: records?.firstName ?? '-',
      lastName: records?.lastName ?? '-',
      email: records?.email ?? '-'
    };
  }, [records]);

  const handleUpdate = (userID, values) => {
    dispatch(
      updateUserByIdAction(userID, {
        firstName: values.firstName,
        lastName: values.lastName
      })
    );
  };

  const handleCancel = () => {
    navigate('/users');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validatorUserEdit(translate),
    onSubmit: (values) => handleUpdate(records.id, values)
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <TextInput
                label="resources.users.fields.firstName"
                required
                id="firstName"
                source="firstName"
                className={classes.input}
                {...formProps}
              />
            </Box>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
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
          <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
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

export default DetailTab;
