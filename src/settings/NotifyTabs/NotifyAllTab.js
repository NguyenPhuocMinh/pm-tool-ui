import { useState, useEffect } from 'react';
// hooks
import { useTranslate, useAuth } from '@hooks';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getMoreNotifyUserAction } from '@reduxStore/actions';
// material ui
import { Box, Divider, Typography } from '@mui/material';
// other
import { get, isEmpty } from 'lodash';
import { NotifyListRender, LoadingCommon, EndMsgCustom } from '@utilities';
import InfiniteScroll from 'react-infinite-scroll-component';

const NotifyAllTab = (props) => {
  const { handleClose } = props;
  // states
  const [notificationsNew, setNotificationsNew] = useState([]);
  const [notificationsBefore, setNotificationsBefore] = useState([]);

  // hooks
  const dispatch = useDispatch();
  const { translate } = useTranslate();
  const { whoami } = useAuth();

  const { dataNew, data, offset, isLoadMore } = useSelector((state) => {
    return {
      dataNew: get(state, 'notifyUser.dataNew', []),
      data: get(state, 'notifyUser.all.data', []),
      offset: get(state, 'notifyUser.all.offset'),
      isLoadMore: get(state, 'notifyUser.all.isLoadMore')
    };
  });

  useEffect(() => {
    if (!isEmpty(dataNew)) {
      setNotificationsNew(dataNew);
    }

    return () => setNotificationsNew([]);
  }, [dataNew]);

  useEffect(() => {
    if (!isEmpty(data)) {
      setNotificationsBefore(data);
    }

    return () => setNotificationsBefore([]);
  }, [data]);

  const handleFetchMoreNotify = () => {
    setTimeout(() => {
      dispatch(getMoreNotifyUserAction(whoami?.id, offset));
    }, 1500);
  };

  return (
    <Box
      id="pm-tool-box-infinite-scroll-all-notify"
      sx={{ height: 400, overflow: 'auto' }}
    >
      <InfiniteScroll
        scrollableTarget="pm-tool-box-infinite-scroll-all-notify"
        dataLength={notificationsBefore.length}
        next={handleFetchMoreNotify}
        hasMore={isLoadMore}
        loader={<LoadingCommon />}
        endMessage={<EndMsgCustom />}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              lineHeight: '1.5rem'
            }}
            variant="subtitle2"
          >
            {translate('common.label.new')}
          </Typography>
          {!isEmpty(notificationsNew) ? (
            notificationsNew.map((newElement) => {
              return (
                <Box
                  id="pm-tool-box-render-list-notify-new"
                  key={newElement.id}
                >
                  <NotifyListRender
                    item={newElement}
                    handleClose={handleClose}
                  />
                  <Divider variant="middle" component="li" />
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
                {translate('common.label.noNotificationNew')}
              </Typography>
            </Box>
          )}
          <Divider sx={{ margin: '1em 0' }} variant="middle" />
          <Typography
            sx={{
              fontWeight: 600,
              lineHeight: '1.5rem'
            }}
            variant="subtitle2"
          >
            {translate('common.label.before')}
          </Typography>
          {!isEmpty(notificationsBefore) ? (
            notificationsBefore.map((beforeElement) => {
              return (
                <Box
                  id="pm-tool-box-render-list-notify-before"
                  key={beforeElement.id}
                >
                  <NotifyListRender
                    item={beforeElement}
                    handleClose={handleClose}
                  />
                  <Divider variant="middle" component="li" />
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
                {translate('common.label.noNotificationBefore')}
              </Typography>
            </Box>
          )}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default NotifyAllTab;
