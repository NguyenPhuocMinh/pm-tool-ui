import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// hooks
import { useTranslate } from '@hooks';
// redux
import { useSelector } from 'react-redux';
// material ui
import {
  Box,
  Tabs,
  Tab,
  Menu,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { TabPanelCommon, TypoCommon, ButtonRegular } from '@utilities';
// others
import { get } from 'lodash';

// tabs
import NotifyAllTab from './NotifyTabs/NotifyAllTab';
import NotifyUnReadTab from './NotifyTabs/NotifyUnreadTab';

const tabs = [
  {
    id: 'f2fc650c-a875-43df-9519-aa6cd581564e',
    label: 'common.label.all'
  },
  {
    id: '926a4ac6-47f4-42f9-9407-716f5e5f3216',
    label: 'common.label.unread'
  }
];

const NotifySetting = (props) => {
  const { open, anchorEl, handleClose } = props;

  // states
  const [tabName, setTabName] = useState(tabs[0].label);

  // hooks
  const { translate } = useTranslate();
  const navigate = useNavigate();

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  // func
  const handleChangeTab = (event, newValue) => {
    setTabName(newValue);
  };

  const handleClickMarkAllAsReadReadAll = () => {};

  const handleClickViewAllNotify = () => {
    navigate('/notify/users');
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          width: 380,
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0
          }
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1em'
          }}
        >
          <TypoCommon
            label="common.label.notification"
            variant="h6"
            fontWeight={600}
          />
          <ButtonRegular
            label="common.label.markAllAsRead"
            onClick={handleClickMarkAllAsReadReadAll}
          />
        </Box>
        <Tabs
          value={tabName}
          onChange={handleChangeTab}
          sx={{
            '.MuiTabs-indicator': {
              background: (theme) => color?.hex ?? theme.palette.primary.main
            },
            '.Mui-selected': {
              color: (theme) =>
                `${color?.hex} !important` ?? theme.palette.primary.main
            }
          }}
        >
          {tabs.map((tab) => {
            return (
              <Tab
                sx={{
                  textTransform: 'capitalize'
                }}
                label={translate(tab.label)}
                value={tab.label}
                key={tab.id}
              />
            );
          })}
        </Tabs>
        {tabs.map((tab) => {
          return (
            <TabPanelCommon
              sx={{ p: '24px 12px !important' }}
              value={tabName}
              index={tab.label}
              key={tab.id}
            >
              {tabName === tabs[0].label ? (
                <NotifyAllTab handleClose={handleClose} />
              ) : null}
              {tabName === tabs[1].label ? (
                <NotifyUnReadTab handleClose={handleClose} />
              ) : null}
            </TabPanelCommon>
          );
        })}
        <ListItem>
          <ListItemButton
            sx={{ height: 28 }}
            onClick={handleClickViewAllNotify}
          >
            <ListItemText
              sx={{ display: 'flex', justifyContent: 'center' }}
              primary={translate('common.label.viewAll')}
              primaryTypographyProps={{
                color: 'primary',
                fontWeight: 'medium',
                variant: 'body2'
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Menu>
  );
};

export default NotifySetting;
