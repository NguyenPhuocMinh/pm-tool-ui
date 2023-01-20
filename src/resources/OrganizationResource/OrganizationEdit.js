import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, Box, Divider } from '@mui/material';
import { TabPanelCommon, TypoCommon, TabsCommon } from '@utilities';
import { getOrganizationAction } from '@reduxStore/actions';
import { get } from 'lodash';
import { tabs } from './Utils';
// tabs
import DetailTab from './OrganizationTabs/DetailTab';
import SetProjectsToOrganizationTab from './OrganizationTabs/SetProjectsToOrganizationTab';

const OrganizationEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { id } = params;

  const { refresh, color } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh'),
      color: get(state, 'common.color', {})
    };
  });

  useEffect(() => {
    dispatch(getOrganizationAction(id));
  }, [dispatch, id, refresh]);

  const { records } = useSelector((state) => {
    return {
      records: get(state, 'organization.records', {})
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
                label="resources.organizations.title.edit"
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
              resourceLabel="resources.organizations.tabs"
              color={color}
            />
          </Box>
          {tabs.map((tab) => {
            return (
              <TabPanelCommon value={tabName} index={tab.label} key={tab.id}>
                {tabName === tabs[0].label ? <DetailTab /> : null}
                {tabName === tabs[1].label ? (
                  <SetProjectsToOrganizationTab
                    organizationId={id}
                    records={records}
                  />
                ) : null}
              </TabPanelCommon>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrganizationEdit;
