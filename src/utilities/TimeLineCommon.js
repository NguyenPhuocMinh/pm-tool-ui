import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Stack
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses
} from '@mui/lab/TimelineOppositeContent';
import moment from 'moment';
import constants from '@constants';
import { get } from 'lodash';
import { useTranslate } from '@hooks';
import { convertTitleAndContentTimeline } from '@helpers';

const TimeLineCommon = ({ timelines = [] }) => {
  // hooks
  const { translate } = useTranslate();
  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  const handleClickDelete = () => {};

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.1
        }
      }}
    >
      {timelines.map((timeline) => {
        const id = get(timeline, 'id');
        const startAccess = get(timeline, 'startAccess');
        const lastAccess = get(timeline, 'lastAccess');
        const userAgent = get(timeline, 'userAgent');
        const reason = get(timeline, 'reason');

        const { title, content, icon } = convertTitleAndContentTimeline(reason);

        return (
          <TimelineItem key={id}>
            <TimelineOppositeContent variant="body2" color="text.secondary">
              {moment(startAccess).utc().format(constants.DATE_FORMAT)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  background: color?.hex ?? 'inherit'
                }}
              >
                {icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardHeader title={translate(title)} />
                <CardContent>
                  <Box sx={{ display: 'flex' }}>
                    <Typography
                      sx={{ marginRight: '5px', fontWeight: 'bold' }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {translate('resources.usersSession.fields.reason')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {translate(content)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', marginTop: '1em' }}>
                    <Typography
                      sx={{ marginRight: '5px', fontWeight: 'bold' }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {translate('resources.usersSession.fields.userAgent')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {userAgent}
                    </Typography>
                  </Box>
                  <Stack
                    sx={{ marginTop: '1em' }}
                    direction="column"
                    spacing={2}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        sx={{ marginRight: '5px', fontWeight: 'bold' }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {translate('resources.usersSession.fields.startAccess')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {moment(startAccess)
                          .utc()
                          .format(constants.DATE_TIME_FORMAT)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        sx={{ marginRight: '5px', fontWeight: 'bold' }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {translate('resources.usersSession.fields.lastAccess')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {moment(lastAccess)
                          .utc()
                          .format(constants.DATE_TIME_FORMAT)}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    sx={{
                      ':hover': {
                        background: 'none'
                      }
                    }}
                    onClick={() => handleClickDelete(id)}
                  >
                    <DeleteForeverIcon />
                    <Typography variant="body2" color="text.secondary">
                      {translate('common.label.delete')}
                    </Typography>
                  </IconButton>
                </CardActions>
              </Card>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default TimeLineCommon;
