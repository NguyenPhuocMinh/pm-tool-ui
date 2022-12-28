import { useLocation } from 'react-router-dom';
import { NavLinkMain, PrivateMenuCommon } from '@utilities';
import { useTranslate } from '@hooks';
import {
  Tooltip,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

const MenuCommon = ({ open, menus = [], titleSubHeader = '' }) => {
  const { translate } = useTranslate();
  const location = useLocation();

  return (
    <List
      subheader={
        <ListSubheader
          sx={{
            fontFamily: 'Josefin Sans !important',
            ...(!open && {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '70px'
            })
          }}
          component="div"
        >
          {translate(titleSubHeader)}
        </ListSubheader>
      }
    >
      {menus.map((item) => {
        return (
          <PrivateMenuCommon
            key={item.name}
            enable={item.enable}
            menuPermission={item.permission}
          >
            <Tooltip
              key={item.name}
              title={translate(item.title)}
              placement="right"
            >
              <ListItem
                key={item.name}
                disablePadding
                sx={{
                  display: 'block'
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                  component={NavLinkMain}
                  to={item.path}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={translate(item.title)}
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiTypography-root': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </PrivateMenuCommon>
        );
      })}
    </List>
  );
};

export default MenuCommon;
