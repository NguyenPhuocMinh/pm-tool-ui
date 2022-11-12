import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, Box, Divider } from '@mui/material';
import { get } from 'lodash';
import { getUserByIdAction } from '@reduxStore/actions';
import { TabsCommon, TabPanelCommon, TypoCommon } from '@components';
import { tabs } from './Utils';

// tabs
import DetailTab from './UserTabs/DetailTab';
import SetPasswordTab from './UserTabs/SetPasswordTab';
import SetRolesToPerTab from './UserTabs/SetRolesToUserTab';

const UserEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { id } = params;

  const { refresh } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh')
    };
  });

  useEffect(() => {
    dispatch(getUserByIdAction(id));
  }, [dispatch, id, refresh]);

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
              <TypoCommon
                variant="body2"
                fontWeight={600}
                label="resources.users.title.edit"
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
              resourceLabel="resources.users.tabs"
              color={color}
            />
          </Box>
          {tabs.map((tab) => {
            return (
              <TabPanelCommon value={tabName} index={tab.label} key={tab.id}>
                {tabName === tabs[0].label ? <DetailTab /> : null}
                {tabName === tabs[1].label ? <SetPasswordTab /> : null}
                {tabName === tabs[2].label ? <SetRolesToPerTab /> : null}
              </TabPanelCommon>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserEdit;
