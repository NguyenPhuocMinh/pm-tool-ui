import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifyUserByIdAction } from '@reduxStore/actions';
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
import { useTranslate } from '@hooks';
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
  withTypo: {
    minWidth: '100px'
  }
});

const NotifyUserDetail = () => {
  // hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { translate } = useTranslate();
  const { id } = useParams();

  const { color, records } = useSelector((state) => {
    return {
      color: get(state, 'common.color'),
      records: get(state, 'notifyUser.records', {})
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
              <TypoCommon
                label="resources.notifyUsers.fields.sender"
                variant="body1"
                fontWeight={600}
                className={classes.withTypo}
              />
              <Typography variant="subtitle2" color="text.secondary">
                {convertFullName(sender?.firstName, sender?.lastName)}
              </Typography>
            </StackRowCommon>
            <StackRowCommon id="pm-tool-stack-row-receiver">
              <TypoCommon
                label="resources.notifyUsers.fields.receiver"
                variant="body1"
                fontWeight={600}
                className={classes.withTypo}
              />
              <Typography variant="subtitle2" color="text.secondary">
                {convertFullName(receiver?.firstName, receiver?.lastName)}
              </Typography>
            </StackRowCommon>
            <StackRowCommon id="pm-tool-stack-row-sentAt">
              <TypoCommon
                label="resources.notifyUsers.fields.sentAt"
                variant="body1"
                fontWeight={600}
                className={classes.withTypo}
              />
              <Typography variant="subtitle2" color="text.secondary">
                {dateTimeFormat(createdAt)}
              </Typography>
            </StackRowCommon>
            <StackRowCommon id="pm-tool-stack-row-type">
              <TypoCommon
                label="resources.notifyUsers.fields.type"
                variant="body1"
                fontWeight={600}
                className={classes.withTypo}
              />
              <Typography variant="subtitle2" color="text.secondary">
                {notifyType}
              </Typography>
            </StackRowCommon>
            <StackRowCommon id="pm-tool-stack-row-topic">
              <TypoCommon
                label="resources.notifyUsers.fields.topic"
                variant="body1"
                fontWeight={600}
                className={classes.withTypo}
              />
              <Typography variant="subtitle2" color="text.secondary">
                {topic}
              </Typography>
            </StackRowCommon>
            <StackRowCommon id="pm-tool-stack-row-description">
              <TypoCommon
                label="resources.notifyUsers.fields.description"
                variant="body1"
                fontWeight={600}
                className={classes.withTypo}
              />
              <Typography variant="subtitle2" color="text.secondary">
                {description}
              </Typography>
            </StackRowCommon>
            <StackRowCommon
              id="pm-tool-stack-row-content"
              alignItems="flex-start"
            >
              <TypoCommon
                label="resources.notifyUsers.fields.content"
                variant="body1"
                fontWeight={600}
                className={classes.withTypo}
              />
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
              background: color?.hex
            }}
            variant="contained"
            label="common.label.trash"
            onClick={handleBackList}
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default NotifyUserDetail;
