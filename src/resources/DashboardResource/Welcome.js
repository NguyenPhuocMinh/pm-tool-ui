import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { homeAction, healthCheckAction } from '@reduxStore/actions';
import { Box, Card } from '@mui/material';
import { TypoCommon, LoadingCommon } from '@utilities';
import { get } from 'lodash';

const Welcome = () => {
  // hooks
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeAction());
    dispatch(healthCheckAction());
  }, []);

  const { loading } = useSelector((state) => {
    return {
      loading: get(state, 'dashboard.loading')
    };
  });

  return loading ? (
    <LoadingCommon />
  ) : (
    <Card
      sx={{
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#9e9e9e' : '#607d8b',
        padding: '20px',
        marginTop: 2,
        marginBottom: '1em'
      }}
    >
      <Box display="flex">
        <Box flex="1">
          <TypoCommon
            variant="h5"
            component="h2"
            label="resources.dashboards.welcome.title"
            gutterBottom={true}
          />
          <Box maxWidth="40em">
            <TypoCommon
              variant="body1"
              component="p"
              label="resources.dashboards.welcome.subtitle"
              gutterBottom={true}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Welcome;
