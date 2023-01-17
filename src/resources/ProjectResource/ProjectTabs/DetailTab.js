import { useMemo } from 'react';
// hooks
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslate } from '@hooks';
import { useSelector, useDispatch } from 'react-redux';
import { updateProjectByIdAction } from '@reduxStore/actions';
// mui
import { Box, Card, CardContent, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  TextInput,
  SwitchInput,
  ButtonSubmit,
  ButtonCancel,
  DateTimeInput
} from '@utilities';
// other
import { get } from 'lodash';
import { dateTimeFormat } from '@utils';
import { validatorProjectCreateOrUpdate } from '@validators';

const useStyles = makeStyles({
  input: {
    width: 350
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
      records: get(state, 'project.records', {}),
      loading: get(state, 'project.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const initialValues = useMemo(() => {
    return {
      name: records?.name ?? '-',
      description: records?.description ?? '-',
      startDay: records?.startDay,
      endDay: records?.endDay,
      createdAt: dateTimeFormat(records?.createdAt),
      activated: records?.activated ?? false
    };
  }, [records]);

  const handleUpdate = (projectId, values) => {
    dispatch(
      updateProjectByIdAction(projectId, {
        name: values.name,
        description: values.description,
        startDay: values.startDay,
        endDay: values.endDay,
        activated: values.activated
      })
    );
  };

  const handleCancel = () => {
    navigate('/projects');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validatorProjectCreateOrUpdate(translate),
    onSubmit: (values) => handleUpdate(records.id, values)
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              maxWidth: 800
            }}
          >
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <TextInput
                label="resources.projects.fields.name"
                id="name"
                source="name"
                required
                className={classes.input}
                {...formProps}
              />
            </Box>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <TextInput
                label="resources.projects.fields.createdAt"
                disabled
                id="createdAt"
                source="createdAt"
                className={classes.input}
                {...formProps}
              />
            </Box>
          </Box>
          <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
            <TextInput
              label="resources.projects.fields.description"
              multiline
              rows={4}
              id="description"
              source="description"
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              display: 'flex'
            }}
          >
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <DateTimeInput
                label="resources.projects.fields.startDay"
                id="startDay"
                source="startDay"
                className={classes.input}
                {...formProps}
              />
            </Box>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <DateTimeInput
                label="resources.projects.fields.endDay"
                id="endDay"
                source="endDay"
                className={classes.input}
                {...formProps}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex'
            }}
          >
            <SwitchInput
              id="activated"
              source="activated"
              label="resources.projects.fields.activated"
              {...formProps}
            />
          </Box>
        </CardContent>
        <CardActions>
          <ButtonSubmit
            id="pm-tool-button-organization-edit-submit"
            color={color}
            onClick={handleSubmit}
            loading={loading}
            isValid={isValid}
            dirty={dirty}
          />
          <ButtonCancel
            id="pm-tool-button-organization-edit-cancel"
            color={color}
            onClick={handleCancel}
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default DetailTab;
