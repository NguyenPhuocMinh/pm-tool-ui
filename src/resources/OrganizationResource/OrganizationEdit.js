import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { TabPanelCommon } from '@utilities';
import { useTranslate } from '@hooks';
import { getOrganizationByIdAction } from '@reduxStore/actions';
import { get } from 'lodash';
import { tabs } from './Utils';
// tabs
import ProjectTab from './OrganizationTabs/ProjectTab';

const OrganizationEdit = () => {
  const params = useParams();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { id } = params;

  useEffect(() => {
    dispatch(getOrganizationByIdAction(id));
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
            background: (theme) => color?.hex ?? theme.palette.primary.main,
            '& .MuiTypography-root': {
              color: (theme) => theme.palette.secondary.contrastText
            }
          }}
          subheader={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                {translate('resources.organizations.title.edit')}
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
                    label={translate(
                      `resources.organizations.tabs.${tab.label}`
                    )}
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
                {tabName === tabs[0].label ? <ProjectTab /> : null}
              </TabPanelCommon>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrganizationEdit;
