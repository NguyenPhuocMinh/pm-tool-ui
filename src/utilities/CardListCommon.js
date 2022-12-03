import { TypoCommon } from '@utilities';
import { Box, Card } from '@mui/material';

const CardListCommon = ({ resource }) => {
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
          <TypoCommon
            variant="h5"
            component="h2"
            label={`resources.${resource}.title.list`}
            gutterBottom={true}
          />
          <Box maxWidth="40em">
            <TypoCommon
              variant="body1"
              component="p"
              label={`resources.${resource}.description.list`}
              gutterBottom={true}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CardListCommon;
