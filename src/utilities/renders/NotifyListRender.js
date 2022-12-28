import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useDayjs, useAuth } from '@hooks';
// mui
import {
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack
} from '@mui/material';
// other
import { BadgeCommon } from '@utilities';
import { convertTypeToIconNotify, convertDataMap } from '@helpers';
import { readNotifyUserAction } from '@reduxStore/actions';
import { get } from 'lodash';

const NotifyListRender = ({ item, handleClose }) => {
  // hooks
  const { parseFromNow } = useDayjs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { whoami } = useAuth();

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  const { id, createdAt, topic, description, type, isRead } =
    convertDataMap(item);
  const timeNow = parseFromNow(createdAt);
  const notifyIcon = convertTypeToIconNotify(type);

  const handleClickDetail = () => {
    navigate(`/notify/users/${id}`);
    // handle close popup
    handleClose();
    // handle update read
    const userId = whoami?.id;
    dispatch(readNotifyUserAction(id, userId));
  };

  return (
    <ListItem
      id="pm-tool-list-item-notify"
      key={id}
      alignItems="flex-start"
      sx={{
        borderRadius: '10px',
        margin: '10px 0',
        background: (theme) => theme.palette.action.selected
      }}
    >
      <ListItemIcon>
        <BadgeCommon invisible={isRead}>{notifyIcon}</BadgeCommon>
      </ListItemIcon>
      <ListItemButton
        sx={{
          ':hover': {
            background: 'none'
          }
        }}
        onClick={handleClickDetail}
      >
        <Stack spacing={1}>
          <Typography
            sx={{
              fontWeight: 600,
              lineHeight: '1.5em'
            }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {topic}
          </Typography>
          <Typography
            sx={{
              display: 'inline',
              fontWeight: 500,
              lineHeight: '1.5em'
            }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {description}
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontWeight: 500,
              lineHeight: '1.5em',
              color: color?.hex ?? 'blue'
            }}
            component="span"
            variant="body2"
          >
            {timeNow}
          </Typography>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default NotifyListRender;
