import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotifyUserByIdAction,
  trashNotifyUserAction
} from '@reduxStore/actions';
// mui
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Stack
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslate, useAuth } from '@hooks';
// utilities
import {
  TypoCommon,
  StackRowCommon,
  ButtonRegular,
  MarkdownField
} from '@utilities';
// other
import { get } from 'lodash';
import { dateTimeFormat } from '@utils';
import { convertNotifyType, convertFullName, convertDataMap } from '@helpers';

const useStyles = makeStyles({
  typoFont: {
    minWidth: '100px',
    fontWeight: 'bold !important'
  }
});

const NotifyUserDetail = () => {
  // hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { translate } = useTranslate();
  const { id } = useParams();
  const { whoami } = useAuth();

  const { color, records, loading } = useSelector((state) => {
    return {
      color: get(state, 'common.color'),
      records: get(state, 'notifyUser.records', {}),
      loading: get(state, 'notifyUser.loading')
    };
  });

  useEffect(() => {
    dispatch(getNotifyUserByIdAction(id));
  }, [id]);

  const { sender, receiver, createdAt, topic, description, content, type } =
    convertDataMap(records);
  const notifyType = convertNotifyType(type, translate);

  // func
  const handleBackList = () => {
    navigate('/notify/users');
  };

  const handleMoveToTrash = useCallback(() => {
    dispatch(trashNotifyUserAction(id, whoami?.id, { _start: 0, _end: 5 }));
    navigate('/notify/users');
  }, [id, whoami?.id]);

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
                label="resources.notifyUsers.title.detail"
              />
            </Box>
          }
        />
        <CardContent sx={{ padding: '1em' }}>
          <Stack spacing={2}>
            <StackRowCommon id="pm-tool-stack-row-sender">
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.typoFont}
              >
                {translate('resources.notifyUsers.fields.sender')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {convertFullName(sender?.firstName, sender?.lastName)}
              </Typography>
            </StackRowCommon>
            <StackRowCommon id="pm-tool-stack-row-receiver">
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.typoFont}
              >
                {translate('resources.notifyUsers.fields.receiver')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {convertFullName(receiver?.firstName, receiver?.lastName)}
              </Typography>
            </StackRowCommon>
            <StackRowCommon id="pm-tool-stack-row-sentAt">
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.typoFont}
              >
                {translate('resources.notifyUsers.fields.sentAt')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dateTimeFormat(createdAt)}
              </Typography>
            </StackRowCommon>
            <StackRowCommon id="pm-tool-stack-row-type">
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.typoFont}
              >
                {translate('resources.notifyUsers.fields.type')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {notifyType}
              </Typography>
            </StackRowCommon>
            <StackRowCommon id="pm-tool-stack-row-topic">
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.typoFont}
              >
                {translate('resources.notifyUsers.fields.topic')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {topic}
              </Typography>
            </StackRowCommon>
            <StackRowCommon id="pm-tool-stack-row-description">
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.typoFont}
              >
                {translate('resources.notifyUsers.fields.description')}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {description}
              </Typography>
            </StackRowCommon>
            <StackRowCommon
              id="pm-tool-stack-row-content"
              alignItems="flex-start"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.typoFont}
              >
                {translate('resources.notifyUsers.fields.content')}
              </Typography>
              <MarkdownField value={content} />
            </StackRowCommon>
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <ButtonRegular
            variant="outlined"
            label="common.label.back"
            onClick={handleBackList}
          />
          <ButtonRegular
            sx={{
              ':hover': {
                background: color?.hex
              },
              background: color?.hex,
              color: (theme) => theme.palette.common.white
            }}
            variant="contained"
            label="common.label.trash"
            loading={loading}
            onClick={handleMoveToTrash}
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default NotifyUserDetail;
