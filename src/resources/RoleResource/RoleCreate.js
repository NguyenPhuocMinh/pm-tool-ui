import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '@hooks';
import { useDispatch, useSelector } from 'react-redux';
import { createRoleAction } from '@reduxStore/actions';
import { get } from 'lodash';
import { useFormik } from 'formik';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  TypoCommon,
  ButtonSubmit,
  ButtonCancel,
  TextInput,
  SwitchInput
} from '@components';
import { validatorRole } from '@validators';

const useStyles = makeStyles({
  input: {
    width: 500
  }
});

const RoleCreate = () => {
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // initialValue
  const initialValues = {
    name: '',
    description: '',
    activated: true
  };

  const { loading, color } = useSelector((state) => {
    return {
      loading: get(state, 'role.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const handleCreate = useCallback(
    async (records) => {
      dispatch(createRoleAction({ navigate }, records));
    },
    [dispatch, navigate]
  );

  const handleCancel = () => {
    navigate('/role-list');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    initialValues,
    validationSchema: validatorRole(translate),
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
                label="resources.roles.title.create"
              />
            </Box>
          }
        />
        <Divider sx={{ width: '100%' }} />
        <CardContent>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <TextInput
              label="resources.roles.fields.name"
              required
              id="name"
              source="name"
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <TextInput
              label="resources.roles.fields.description"
              id="description"
              multiline
              rows={4}
              source="description"
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <SwitchInput
              id="activated"
              source="activated"
              label="resources.roles.fields.activated"
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

export default RoleCreate;
