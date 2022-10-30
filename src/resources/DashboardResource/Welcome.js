import { Box, Card, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslate } from '@hooks';

const Welcome = () => {
  const { translate } = useTranslate();

  const _ = useSelector((state) => state);

  return (
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
          <Typography variant="h5" color="inherit" component="h2" gutterBottom>
            {translate('resources.dashboards.welcome.title')}
          </Typography>
          <Box maxWidth="40em">
            <Typography
              variant="body1"
              color="inherit"
              component="p"
              gutterBottom
            >
              {translate('resources.dashboards.welcome.subtitle')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Welcome;
