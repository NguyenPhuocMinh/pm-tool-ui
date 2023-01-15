import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslate } from '@hooks';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { dateTimeFormat } from '@utils';
import { TextInput, SwitchInput, ButtonSubmit, ButtonCancel } from '@utilities';
import { updateTeamByIdAction } from '@reduxStore/actions';
import { validatorTeamCreateOrUpdate } from '@validators';

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
      records: get(state, 'team.records', {}),
      loading: get(state, 'team.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const initialValues = useMemo(() => {
    return {
      name: records?.name ?? '-',
      createdAt: dateTimeFormat(records?.createdAt),
      activated: records?.activated ?? false
    };
  }, [records]);

  const handleUpdate = (teamId, values) => {
    dispatch(
      updateTeamByIdAction(teamId, {
        name: values.name,
        activated: values.activated
      })
    );
  };

  const handleCancel = () => {
    navigate('/teams');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validatorTeamCreateOrUpdate(translate),
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
                label="resources.teams.fields.name"
                required
                id="name"
                source="name"
                className={classes.input}
                {...formProps}
              />
            </Box>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <TextInput
                label="resources.teams.fields.createdAt"
                disabled
                id="createdAt"
                source="createdAt"
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
              label="resources.teams.fields.activated"
              {...formProps}
            />
          </Box>
        </CardContent>
        <CardActions>
          <ButtonSubmit
            id="pm-tool-button-team-edit-submit"
            color={color}
            onClick={handleSubmit}
            loading={loading}
            isValid={isValid}
            dirty={dirty}
          />
          <ButtonCancel
            id="pm-tool-button-team-edit-cancel"
            color={color}
            onClick={handleCancel}
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default DetailTab;
