import { useCallback, useMemo } from 'react';
// hooks
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
// mui
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  TextInput,
  ButtonCancel,
  TypoCommon,
  BackdropCommon
} from '@utilities';
import EditIcon from '@mui/icons-material/Edit';
// other
import { get } from 'lodash';

const useStyles = makeStyles({
  input: {
    width: 400
  }
});

const TeamTab = () => {
  // hooks
  const classes = useStyles();
  const navigate = useNavigate();

  const { records, loading, color } = useSelector((state) => {
    return {
      records: get(state, 'user.records', {}),
      loading: get(state, 'user.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const initialValues = useMemo(() => {
    return {
      teamId: records?.teamId ?? '',
      teamName: records?.teamName ?? '-'
    };
  }, [records]);

  const handleCancel = () => {
    navigate('/users');
  };

  const { ...formProps } = useFormik({
    enableReinitialize: true,
    initialValues
  });

  const handleClickDetailTeam = useCallback(() => {
    navigate(`/teams/edit/${formProps.values.teamId}`);
  }, [formProps.values.teamId]);

  return (
    <Box sx={{ minWidth: 400 }}>
      {loading && <BackdropCommon loading={loading} />}
      <Card>
        <CardHeader
          subheader={
            <Box display="flex" alignItems="center">
              <TypoCommon
                variant="body2"
                fontWeight={600}
                label="resources.users.title.tabs.team"
              />
            </Box>
          }
        />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <TextInput
                label="resources.users.fields.teamName"
                disabled
                id="teamName"
                source="teamName"
                className={classes.input}
                {...formProps}
              />
            </Box>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <IconButton component="label" onClick={handleClickDetailTeam}>
                <EditIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <ButtonCancel color={color} onClick={handleCancel} />
        </CardActions>
      </Card>
    </Box>
  );
};

export default TeamTab;
