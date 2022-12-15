import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDayjs } from '@hooks';
// mui
import {
  Typography,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Stack
} from '@mui/material';
// other
import { convertTypeToIconNotify, convertDataMap } from '@helpers';
import { get } from 'lodash';

const NotifyListRender = ({ item, handleClose }) => {
  // hooks
  const { parseFromNow } = useDayjs();
  const navigate = useNavigate();

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  const { id, createdAt, topic, description, type } = convertDataMap(item);
  const timeNow = parseFromNow(createdAt);
  const notifyIcon = convertTypeToIconNotify(type);

  const handleClickDetail = () => {
    navigate(`/notify/users/${id}`);
    handleClose();
  };

  return (
    <ListItem id="pm-tool-list-item-notify" key={id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>{notifyIcon}</Avatar>
      </ListItemAvatar>
      <ListItemButton onClick={handleClickDetail}>
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
