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
  const [notificationAll, setNotificationAll] = useState([]);

  // hooks
  const dispatch = useDispatch();
  const { translate } = useTranslate();
  const { whoami } = useAuth();

  const { data, offset, isLoadMore } = useSelector((state) => {
    return {
      data: get(state, 'notifyUser.all.data', []),
      offset: get(state, 'notifyUser.all.offset'),
      isLoadMore: get(state, 'notifyUser.all.isLoadMore')
    };
  });

  useEffect(() => {
    if (!isEmpty(data)) {
      setNotificationAll(data);
    }

    return () => setNotificationAll([]);
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
        dataLength={notificationAll.length}
        next={handleFetchMoreNotify}
        hasMore={isLoadMore}
        loader={<LoadingCommon />}
        endMessage={<EndMsgCustom />}
      >
        <Box>
          {!isEmpty(notificationAll) ? (
            notificationAll.map((allElement) => {
              return (
                <Box
                  id="pm-tool-box-render-list-notify-all"
                  key={allElement.id}
                >
                  <NotifyListRender
                    item={allElement}
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
                {translate('common.label.noNotificationAll')}
              </Typography>
            </Box>
          )}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default NotifyAllTab;
