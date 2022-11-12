import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { addRolesToPermissionAction } from '@reduxStore/actions';
import {
  TransferListCommon,
  TypoCommon,
  ButtonSubmit,
  ButtonCancel
} from '@components';

const SetRolesToPerTab = () => {
  // hooks
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
    dispatch(
      addRolesToPermissionAction(perID, {
        availableRoles: dataLeft,
        ...values
      })
    );
  };

  const handleCancel = () => {
    navigate('/permissions');
  };

  const { handleSubmit, isValid, dirty, ...formProps } = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => handleUpdate(records.id, values)
  });

  return records?.activated ? (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardHeader
          subheader={
            <Box display="flex" alignItems="center">
              <TypoCommon
                variant="body2"
                fontWeight={600}
                label="resources.permissions.title.tabs.roles"
              />
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
  ) : (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardContent>
          <TypoCommon
            variant="subtitle2"
            fontWeight={600}
            label="Please activated permission to set roles"
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default SetRolesToPerTab;
