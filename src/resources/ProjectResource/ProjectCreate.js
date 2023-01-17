import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProjectAction } from '@reduxStore/actions';
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
import {
  TypoCommon,
  BoxWrapper,
  TextInput,
  SwitchInput,
  ButtonSubmit,
  ButtonCancel
} from '@utilities';
import { validatorProjectCreateOrUpdate } from '@validators';

const useStyles = makeStyles({
  input: {
    width: 500
  }
});

const ProjectCreate = () => {
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
      loading: get(state, 'permission.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const handleCreate = useCallback(
    async (records) => {
      dispatch(createProjectAction({ navigate }, records));
    },
    [dispatch, navigate]
  );

  const handleCancel = () => {
    navigate('/projects');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    initialValues,
    validationSchema: validatorProjectCreateOrUpdate(translate),
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
                label="resources.projects.title.create"
              />
            </Box>
          }
        />
        <Divider sx={{ width: '100%' }} />
        <CardContent>
          <BoxWrapper>
            <TextInput
              label="resources.projects.fields.name"
              required
              id="name"
              source="name"
              className={classes.input}
              {...formProps}
            />
          </BoxWrapper>
          <BoxWrapper>
            <TextInput
              label="resources.projects.fields.description"
              id="description"
              multiline
              rows={4}
              source="description"
              className={classes.input}
              {...formProps}
            />
          </BoxWrapper>
          <BoxWrapper>
            <SwitchInput
              id="activated"
              source="activated"
              label="resources.projects.fields.activated"
              {...formProps}
            />
          </BoxWrapper>
        </CardContent>
        <CardActions>
          <ButtonSubmit
            id="pm-tool-button-project-create-submit"
            color={color}
            onClick={handleSubmit}
            loading={loading}
            isValid={isValid}
            dirty={dirty}
          />
          <ButtonCancel
            id="pm-tool-button-project-create-cancel"
            color={color}
            onClick={handleCancel}
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProjectCreate;
