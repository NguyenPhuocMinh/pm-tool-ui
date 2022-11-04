import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslate } from '@hooks';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import { addRolesToPermissionAction } from '@reduxStore/actions';
import { TransferListCommon, TypoCommon } from '@components/commons';
import { LoadingRegular } from '@components/regulars';

const SetRolesToPerTab = () => {
  // hooks
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

  const [dataLeft, setDataLeft] = useState(records.availableRoles ?? []);
  const [dataRight, setDataRight] = useState(records.assignedRoles ?? []);

  const initialValues = useMemo(() => {
    return {
      assignedRoles: records?.assignedRoles ?? []
    };
  }, [records]);

  const handleUpdate = (perID, values) => {
    dispatch(addRolesToPermissionAction(perID, values));
  };

  const handleCancel = () => {
    navigate('/permissions');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => handleUpdate(records.id, values)
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardHeader
          subheader={
            <Box display="flex" alignItems="center">
              <TypoCommon label="resources.permissions.title.tabs.roles" />
            </Box>
          }
        />
        <CardContent>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <TransferListCommon
              titleLeft="resources.permissions.transferList.roles.titleLeft"
              titleRight="resources.permissions.transferList.roles.titleRight"
              dataLeft={dataLeft}
              dataRight={dataRight}
              setDataLeft={setDataLeft}
              setDataRight={setDataRight}
              source="assignedRoles"
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

export default SetRolesToPerTab;
