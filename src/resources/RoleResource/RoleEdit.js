import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRoleByIdAction } from '@reduxStore/actions';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Tab,
  Tabs,
  Divider,
  Typography
} from '@mui/material';
import { useTranslate } from '@hooks';
import { TabPanelCommon } from '@components/commons';
import { get } from 'lodash';
import { tabs } from './Utils';
// tabs
import DetailTab from './RoleTabs/DetailTab';
import UserInRoleTab from './RoleTabs/UserInRoleTab';
import PerInRoleTab from './RoleTabs/PerInRoleTab';

const RoleEdit = () => {
  const params = useParams();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { id } = params;

  useEffect(() => {
    dispatch(getRoleByIdAction(id));
  }, [dispatch, id]);

  const { records, color } = useSelector((state) => {
    return {
      records: get(state, 'role.records', {}),
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
              <Typography variant="body2" fontWeight={600}>
                {translate('resources.roles.title.edit')}
              </Typography>
            </Box>
          }
        />
        <Divider sx={{ width: '100%' }} />
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabName} onChange={handleChange}>
              {tabs.map((tab) => {
                return (
                  <Tab
                    sx={{
                      textTransform: 'capitalize'
                    }}
                    label={translate(`resources.roles.tabs.${tab.label}`)}
                    value={tab.label}
                    key={tab.id}
                  />
                );
              })}
            </Tabs>
          </Box>
          {tabs.map((tab) => {
            return (
              <TabPanelCommon value={tabName} index={tab.label} key={tab.id}>
                {tabName === tabs[0].label ? <DetailTab /> : null}
                {tabName === tabs[1].label ? (
                  <UserInRoleTab roleName={records?.name} />
                ) : null}
                {tabName === tabs[1].label ? (
                  <PerInRoleTab roleName={records?.name} />
                ) : null}
              </TabPanelCommon>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RoleEdit;
