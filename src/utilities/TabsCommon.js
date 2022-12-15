import { useTranslate } from '@hooks';
import { Tabs, Tab } from '@mui/material';

const TabsCommon = ({ tabs, tabName, onChange, resourceLabel, color }) => {
  const { translate } = useTranslate();

  return (
    <Tabs
      value={tabName}
      onChange={onChange}
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
            label={translate(`${resourceLabel}.${tab.label}`)}
            value={tab.label}
            key={tab.id}
          />
        );
      })}
    </Tabs>
  );
};

export default TabsCommon;
