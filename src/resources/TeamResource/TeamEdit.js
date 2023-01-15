import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, Box, Divider } from '@mui/material';
import { get } from 'lodash';
import { getTeamByIdAction } from '@reduxStore/actions';
import { TabsCommon, TabPanelCommon, TypoCommon } from '@utilities';
import { tabs } from './Utils';

// tabs
import DetailTab from './TeamTabs/DetailTab';
import SetUsersToTeamTab from './TeamTabs/SetUsersToTeamTab';

const TeamEdit = () => {
  // states
  const [tabName, setTabName] = useState(tabs[0].label);
  // hooks
  const params = useParams();
  const dispatch = useDispatch();

  const { color, refresh } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {}),
      refresh: get(state, 'common.refresh')
    };
  });

  const { id } = params;

  useEffect(() => {
    dispatch(getTeamByIdAction(id));
  }, [dispatch, id, refresh]);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

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
                label="resources.teams.title.edit"
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
              resourceLabel="resources.teams.tabs"
              color={color}
            />
          </Box>
          {tabs.map((tab) => {
            return (
              <TabPanelCommon value={tabName} index={tab.label} key={tab.id}>
                {tabName === tabs[0].label ? <DetailTab /> : null}
                {tabName === tabs[1].label ? (
                  <SetUsersToTeamTab teamId={id} />
                ) : null}
              </TabPanelCommon>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TeamEdit;
