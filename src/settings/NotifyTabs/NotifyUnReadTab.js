import { useState, useEffect } from 'react';
// hooks
import { useTranslate, useAuth } from '@hooks';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getMoreUnReadNotifyUserAction } from '@reduxStore/actions';
// material ui
import { Box, Divider, Typography } from '@mui/material';
// other
import { get, isEmpty } from 'lodash';
import { NotifyListRender, LoadingCommon, EndMsgCustom } from '@utilities';
import InfiniteScroll from 'react-infinite-scroll-component';

const NotifyUnReadTab = (props) => {
  const { handleClose } = props;
  // states
  const [notificationsUnReadNew, setNotificationsUnReadNew] = useState([]);
  const [notificationsUnReadBefore, setNotificationsUnReadBefore] = useState(
    []
  );
  const [notificationsUnread, setNotificationsUnRead] = useState([]);

  // hooks
  const dispatch = useDispatch();
  const { translate } = useTranslate();
  const { whoami } = useAuth();

  const { dataNew, data, offset, isLoadMore } = useSelector((state) => {
    return {
      dataNew: get(state, 'notifyUser.dataNew', []),
      data: get(state, 'notifyUser.unread.data', []),
      offset: get(state, 'notifyUser.unread.offset'),
      isLoadMore: get(state, 'notifyUser.unread.isLoadMore')
    };
  });

  useEffect(() => {
    if (!isEmpty(dataNew)) {
      setNotificationsUnReadNew(dataNew);
    }

    return () => setNotificationsUnReadNew([]);
  }, [dataNew]);

  useEffect(() => {
    if (!isEmpty(data)) {
      setNotificationsUnReadBefore(data);
    }

    return () => setNotificationsUnReadBefore([]);
  }, [data]);

  useEffect(() => {
    if (
      !isEmpty(notificationsUnReadNew) &&
      !isEmpty(notificationsUnReadBefore)
    ) {
      setNotificationsUnRead((prev) => [
        ...prev,
        ...notificationsUnReadNew,
        ...notificationsUnReadBefore
      ]);
    }

    return () => setNotificationsUnRead([]);
  }, [notificationsUnReadNew, notificationsUnReadBefore]);

  const handleFetchMoreNotifyUnread = () => {
    setTimeout(() => {
      dispatch(getMoreUnReadNotifyUserAction(whoami?.id, offset));
    }, 1500);
  };

  return (
    <Box
      id="pm-tool-box-infinite-scroll-unread-notify"
      sx={{ height: 400, overflow: 'auto' }}
    >
      <InfiniteScroll
        scrollableTarget="pm-tool-box-infinite-scroll-unread-notify"
        dataLength={notificationsUnReadBefore.length}
        next={handleFetchMoreNotifyUnread}
        hasMore={isLoadMore}
        loader={<LoadingCommon />}
        endMessage={<EndMsgCustom />}
      >
        <Box>
          {!isEmpty(notificationsUnread) ? (
            notificationsUnread.map((unReadElement) => {
              return (
                <Box
                  id="pm-tool-box-render-list-notify-unread"
                  key={unReadElement.id}
                >
                  <NotifyListRender
                    item={unReadElement}
                    handleClose={handleClose}
                  />
                  <Divider variant="inset" component="li" />
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Typography variant="subtitle1">
                {translate('common.label.noNotificationUnread')}
              </Typography>
            </Box>
          )}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default NotifyUnReadTab;
