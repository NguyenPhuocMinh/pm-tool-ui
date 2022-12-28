import { useSelector } from 'react-redux';
import { useTranslate } from '@hooks';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { get } from 'lodash';

const BackdropCommon = ({ sx, loading }) => {
  // hooks
  const { translate } = useTranslate();
  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  return (
    <Backdrop
      sx={{
        color: (theme) => color?.hex ?? theme.palette.primary.main,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ...sx
      }}
      open={loading}
    >
      <CircularProgress
        color="inherit"
        sx={{
          marginRight: '5px',
          color: (theme) => color?.hex ?? theme.palette.primary.main
        }}
      />
      <Typography variant="h6">{translate('common.label.waiting')}</Typography>
    </Backdrop>
  );
};

export default BackdropCommon;
