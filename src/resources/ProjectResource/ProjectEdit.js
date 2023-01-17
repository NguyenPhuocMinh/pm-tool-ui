import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, Box, Divider } from '@mui/material';
import { get } from 'lodash';
import { getProjectByIdAction } from '@reduxStore/actions';
import { TabsCommon, TabPanelCommon, TypoCommon } from '@utilities';
import { tabs } from './Utils';

// tabs
import DetailTab from './ProjectTabs/DetailTab';
import SetTeamToProjectTab from './ProjectTabs/SetTeamToProjectTab';
import OrganizationTab from './ProjectTabs/OrganizationTab';

const ProjectEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { id } = params;

  const { color, refresh } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {}),
      refresh: get(state, 'common.refresh', false)
    };
  });

  useEffect(() => {
    dispatch(getProjectByIdAction(id));
  }, [dispatch, id, refresh]);

  const { records } = useSelector((state) => {
    return {
      records: get(state, 'project.records', {})
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
                label="resources.projects.title.edit"
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
              resourceLabel="resources.projects.tabs"
              color={color}
            />
          </Box>
          {tabs.map((tab) => {
            return (
              <TabPanelCommon value={tabName} index={tab.label} key={tab.id}>
                {tabName === tabs[0].label ? <DetailTab /> : null}
                {tabName === tabs[1].label ? (
                  <SetTeamToProjectTab projectId={id} records={records} />
                ) : null}
                {tabName === tabs[2].label ? (
                  <OrganizationTab records={records} />
                ) : null}
              </TabPanelCommon>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProjectEdit;
