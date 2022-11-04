import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslate } from '@hooks';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { updateRoleByIdAction } from '@reduxStore/actions';
import { Box, Card, CardContent, CardActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LoadingRegular } from '@components/regulars';
import { TextInput, SwitchInput } from '@components/inputs';
import { dateTimeFormat } from '@utils';

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

  const { record, loading, color } = useSelector((state) => {
    return {
      record: get(state, 'role.record', {}),
      loading: get(state, 'role.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const initialValues = useMemo(() => {
    return {
      id: record?.id ?? '-',
      createdAt: dateTimeFormat(record?.createdAt),
      name: record?.name ?? '-',
      description: record?.description ?? '',
      activated: record?.activated ?? false,
      realmName: record?.realmName ?? '-'
    };
  }, [record]);

  const handleUpdate = (roleID, values) => {
    dispatch(
      updateRoleByIdAction(roleID, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        activated: values.activated
      })
    );
  };

  const handleCancel = () => {
    navigate('/roles');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => handleUpdate(record.id, values)
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
                label="resources.roles.fields.id"
                disabled
                id="id"
                source="id"
                className={classes.input}
                {...formProps}
              />
            </Box>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <TextInput
                label="resources.roles.fields.createdAt"
                disabled
                id="createdAt"
                source="createdAt"
                className={classes.input}
                {...formProps}
              />
            </Box>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <TextInput
                label="resources.roles.fields.name"
                disabled
                id="name"
                source="name"
                className={classes.input}
                {...formProps}
              />
            </Box>
          </Box>
          <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
            <TextInput
              label="resources.roles.fields.description"
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
            <SwitchInput
              id="activated"
              source="activated"
              label="resources.roles.fields.activated"
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
