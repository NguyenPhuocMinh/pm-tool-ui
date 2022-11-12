import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { addRolesToUserAction } from '@reduxStore/actions';
import {
  TransferListCommon,
  TypoCommon,
  ButtonSubmit,
  ButtonCancel
} from '@components';

const SetRolesToUserTab = () => {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { records, loading, color } = useSelector((state) => {
    return {
      records: get(state, 'user.records', {}),
      loading: get(state, 'user.loading', false),
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

  const handleUpdate = (userID, values) => {
    dispatch(
      addRolesToUserAction(userID, {
        availableRoles: dataLeft,
        ...values
      })
    );
  };

  const handleCancel = () => {
    navigate('/users');
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
              <TypoCommon
                variant="body2"
                fontWeight={600}
                label="resources.users.title.tabs.roles"
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
              titleLeft="resources.users.transferList.roles.titleLeft"
              titleRight="resources.users.transferList.roles.titleRight"
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
  );
};

export default SetRolesToUserTab;
