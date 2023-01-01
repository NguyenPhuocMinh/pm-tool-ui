import { useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { Box } from '@mui/material';
import {
  PopupCommon,
  CardListCommon,
  TabsCommon,
  TabPanelCommon
} from '@utilities';
import { tabs } from './Utils';

// tabs
import NotifyUserAllTab from './NotifyUserTabs/NotifyUserAllTab';
import NotifyUserTrashTab from './NotifyUserTabs/NotifyUserTrashTab';

const NotifyUserList = () => {
  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  // hooks
  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color')
    };
  });

  return (
    <Box display="block">
      <CardListCommon resource="notifyUsers" />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabsCommon
          tabs={tabs}
          tabName={tabName}
          onChange={handleChange}
          resourceLabel="resources.notifyUsers.tabs"
          color={color}
        />
      </Box>
      {tabs.map((tab) => {
        return (
          <TabPanelCommon value={tabName} index={tab.label} key={tab.id}>
            {tabName === tabs[0].label ? <NotifyUserAllTab /> : null}
            {tabName === tabs[1].label ? <NotifyUserTrashTab /> : null}
          </TabPanelCommon>
        );
      })}
      <PopupCommon />
    </Box>
  );
};

export default NotifyUserList;
