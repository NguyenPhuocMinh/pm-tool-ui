import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslate } from '@hooks';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { dateTimeFormat } from '@utils';
import { LoadingRegular } from '@components/regulars';
import { TextInput, SwitchInput } from '@components/inputs';
import { updatePermissionByIdAction } from '@reduxStore/actions';
import { validatePermission } from '@validators';

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
      records: get(state, 'permission.records', {}),
      loading: get(state, 'permission.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const initialValues = useMemo(() => {
    return {
      name: records?.name ?? '-',
      createdAt: dateTimeFormat(records?.createdAt),
      description: records?.description ?? '',
      activated: records?.activated ?? false
    };
  }, [records]);

  const handleUpdate = (permissionID, values) => {
    dispatch(
      updatePermissionByIdAction(permissionID, {
        name: values.name,
        description: values.description,
        activated: values.activated
      })
    );
  };

  const handleCancel = () => {
    navigate('/permissions');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validatePermission(translate),
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
                label="resources.permissions.fields.name"
                required
                id="name"
                source="name"
                className={classes.input}
                {...formProps}
              />
            </Box>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <TextInput
                label="resources.permissions.fields.createdAt"
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
              label="resources.permissions.fields.description"
              id="description"
              source="description"
              rows={4}
              multiline
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              display: 'flex'
            }}
          >
            <SwitchInput
              id="activated"
              source="activated"
              label="resources.permissions.fields.activated"
              {...formProps}
            />
          </Box>
        </CardContent>
        <CardActions>
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
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            disabled={!isValid || !dirty || loading}
          >
            {loading && <LoadingRegular />}
            {translate('common.button.save')}
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
              color: (theme) => color?.hex ?? theme.palette.primary.main,
              borderColor: (theme) => color?.hex ?? theme.palette.primary.main
            }}
            variant="outlined"
            onClick={handleCancel}
          >
            {translate('common.button.cancel')}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default DetailTab;