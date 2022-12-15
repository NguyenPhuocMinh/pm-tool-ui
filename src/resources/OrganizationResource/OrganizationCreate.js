import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '@hooks';
import { useSelector, useDispatch } from 'react-redux';
import { createOrganizationAction } from '@reduxStore/actions';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TextInput, SwitchInput, ButtonSubmit, ButtonCancel } from '@utilities';
import { useFormik } from 'formik';
import { validatorOrganizationCreate } from '@validators';
import { get } from 'lodash';

const useStyles = makeStyles({
  input: {
    width: 350
  }
});

const OrganizationCreate = () => {
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // initialValue
  const initialValues = {
    name: '',
    activated: true
  };

  const handleCreate = useCallback(
    async (records) => {
      dispatch(createOrganizationAction({ navigate }, records));
    },
    [dispatch, navigate]
  );

  const { loading, color } = useSelector((state) => {
    return {
      loading: get(state, 'organization.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const handleCancel = () => {
    navigate('/organizations');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    initialValues,
    validationSchema: validatorOrganizationCreate(translate),
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
              <Typography variant="body2" fontWeight={600}>
                {translate('resources.organizations.title.create')}
              </Typography>
            </Box>
          }
        />
        <Divider sx={{ width: '100%' }} />
        <CardContent>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <TextInput
              label="resources.organizations.fields.name"
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
            <SwitchInput
              id="activated"
              source="activated"
              label="resources.organizations.fields.activated"
              {...formProps}
            />
          </Box>
        </CardContent>
        <CardActions>
          <ButtonSubmit
            id="pm-tool-button-organization-create-submit"
            color={color}
            onClick={handleSubmit}
            loading={loading}
            isValid={isValid}
            dirty={dirty}
          />
          <ButtonCancel
            id="pm-tool-button-organization-create-cancel"
            color={color}
            onClick={handleCancel}
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default OrganizationCreate;
