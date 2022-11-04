import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Divider,
  Typography
} from '@mui/material';
import { useTranslate } from '@hooks';
import { get } from 'lodash';
import { getPermissionByIdAction } from '@reduxStore/actions';
import { TabsCommon, TabPanelCommon } from '@components/commons';
import { tabs } from './Utils';

// tabs
import DetailTab from './PermissionTabs/DetailTab';
import SetRolesToPerTab from './PermissionTabs/SetRolesToPerTab';

const PermissionEdit = () => {
  const params = useParams();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { id } = params;

  useEffect(() => {
    dispatch(getPermissionByIdAction(id));
  }, [dispatch, id]);

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardHeader
          sx={{
            background: (theme) => color?.hex ?? theme.palette.primary.main
          }}
          subheader={
            <Box display="flex" alignItems="center">
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Josefin Sans'
                }}
                fontWeight={600}
              >
                {translate('resources.permissions.title.edit')}
              </Typography>
            </Box>
          }
        />
        <Divider sx={{ width: '100%' }} />
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabsCommon
              tabs={tabs}
              tabName={tabName}
              onChange={handleChange}
              resourceLabel="resources.permissions.tabs"
              color={color}
            />
          </Box>
          {tabs.map((tab) => {
            return (
              <TabPanelCommon value={tabName} index={tab.label} key={tab.id}>
                {tabName === tabs[0].label ? <DetailTab /> : null}
                {tabName === tabs[1].label ? <SetRolesToPerTab /> : null}
              </TabPanelCommon>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PermissionEdit;
