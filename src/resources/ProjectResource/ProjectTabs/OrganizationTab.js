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

const OrganizationTab = () => {
  // hooks
  const classes = useStyles();
  const navigate = useNavigate();

  const { records, loading, color } = useSelector((state) => {
    return {
      records: get(state, 'project.records', {}),
      loading: get(state, 'project.loading', false),
      color: get(state, 'common.color', {})
    };
  });

  const initialValues = useMemo(() => {
    return {
      organizationId: records?.organizationId,
      organizationName: records?.organizationName
    };
  }, [records]);

  const handleCancel = () => {
    navigate('/projects');
  };

  const { ...formProps } = useFormik({
    enableReinitialize: true,
    initialValues
  });

  const handleClickDetailOrganization = useCallback(() => {
    navigate(`/organizations/edit/${formProps.values.organizationId}`);
  }, [formProps.values.organizationId]);

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
                label="resources.projects.title.tabs.organization"
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
                label="resources.projects.fields.organizationName"
                disabled
                id="organizationName"
                source="organizationName"
                className={classes.input}
                {...formProps}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '2em',
                marginBottom: '2em'
              }}
            >
              <IconButton
                component="label"
                onClick={handleClickDetailOrganization}
              >
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

export default OrganizationTab;
