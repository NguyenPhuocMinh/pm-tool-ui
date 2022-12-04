import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { getTimeLineUserSessionAction } from '@reduxStore/actions';
import { Box, Card } from '@mui/material';
import { LoadingCommon, CardListCommon, TimeLineCommon } from '@utilities';

const UserSessionTimeLine = () => {
  // hooks
  const { userID } = useParams();

  const dispatch = useDispatch();

  const { refresh } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh')
    };
  });

  useEffect(() => {
    dispatch(getTimeLineUserSessionAction(userID));
  }, [userID, refresh]);

  const { dataTimeline, loading } = useSelector((state) => {
    return {
      dataTimeline: get(state, 'userSession.dataTimeline', []),
      loading: get(state, 'userSession.loading', false)
    };
  });

  return loading ? (
    <LoadingCommon />
  ) : (
    <Box display="block">
      <CardListCommon resource="userSession" />
      {!isEmpty(dataTimeline) ? (
        <Card sx={{ maxHeight: '500px', overflow: 'scroll' }}>
          <TimeLineCommon timelines={dataTimeline} />
        </Card>
      ) : null}
    </Box>
  );
};

export default UserSessionTimeLine;
