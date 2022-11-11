import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRoleByIdAction } from '@reduxStore/actions';
import { Card, CardHeader, CardContent, Box, Divider } from '@mui/material';
import { TabsCommon, TabPanelCommon, TypoCommon } from '@components/index';
import { get } from 'lodash';
import { tabs } from './Utils';
// tabs
import DetailTab from './RoleTabs/DetailTab';
import UserInRoleTab from './RoleTabs/UserInRoleTab';
import PerInRoleTab from './RoleTabs/PerInRoleTab';

const RoleEdit = () => {
  const params = useParams();
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
              <TypoCommon
                variant="body2"
                fontWeight={600}
                label="resources.roles.title.edit"
              />
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
              resourceLabel="resources.roles.tabs"
              color={color}
            />
          </Box>
          {tabs.map((tab) => {
            return (
              <TabPanelCommon value={tabName} index={tab.label} key={tab.id}>
                {tabName === tabs[0].label ? <DetailTab /> : null}
                {tabName === tabs[1].label ? (
                  <UserInRoleTab roleID={records?.id} />
                ) : null}
                {tabName === tabs[2].label ? (
                  <PerInRoleTab roleID={records?.id} />
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
