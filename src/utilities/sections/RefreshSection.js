import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refreshPage } from '@reduxStore/actions';
import { useTranslate } from '@hooks';
import { Box, Tooltip, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import { get } from 'lodash';

const useStyles = makeStyles((_) => ({
  refresh: {
    margin: 'auto'
  },
  spin: {
    margin: 'auto',
    animation: '$spin 1s 1'
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
}));

const RefreshSection = () => {
  const [spin, setSpin] = useState(false);

  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const { refresh } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh')
    };
  });

  // func
  const handleClickRefresh = () => {
    setSpin(!spin);
    dispatch(refreshPage(refresh));
  };

  return (
    <Box width="auto" minWidth={50}>
      <Tooltip title={translate('toolbar.tooltip.refresh')}>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleClickRefresh}
          sx={{
            ':hover': {
              background: 'none'
            },
            p: '10px'
          }}
        >
          <RefreshIcon
            fontSize="small"
            className={spin ? classes.spin : classes.refresh}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RefreshSection;
