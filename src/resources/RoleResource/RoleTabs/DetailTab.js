import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { updateRoleByIdAction } from '@reduxStore/actions';
import { Box, Card, CardContent, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TextInput, SwitchInput } from '@components';
import { ButtonSubmit, ButtonCancel } from '@components';
import { dateTimeFormat } from '@utils';

const useStyles = makeStyles({
  input: {
    width: 350
  }
});

const DetailTab = () => {
  // hooks
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { records, loading, color } = useSelector((state) => {
    return {
      records: get(state, 'role.records', {}),
      loading: get(state, 'role.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const initialValues = useMemo(() => {
    return {
      name: records?.name ?? '-',
      description: records?.description ?? '',
      createdAt: dateTimeFormat(records?.createdAt),
      activated: records?.activated ?? false
    };
  }, [records]);

  const handleUpdate = (roleID, values) => {
    dispatch(
      updateRoleByIdAction(roleID, {
        name: values.name,
        description: values.description,
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
                label="resources.roles.fields.name"
                id="name"
                source="name"
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
