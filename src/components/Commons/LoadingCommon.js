import classnames from 'classnames';

import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useTranslate } from '@hooks';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      height: '100%'
    },
    [theme.breakpoints.down('lg')]: {
      height: '100vh',
      marginTop: '-3em'
    }
  },
  icon: {
    width: '9em',
    height: '9em'
  },
  message: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    opacity: 0.5,
    margin: '0 1em'
  }
}));

const LoadingCommon = (props) => {
  const {
    className,
    loadingHelperPrimary = '',
    loadingHelperSecondary = ''
  } = props;
  const classes = useStyles(props);
  const { translate } = useTranslate();
  return (
    <div className={classnames(classes.container, className)}>
      <div className={classes.message}>
        <CircularProgress className={classes.icon} color="primary" />
        <h1>{translate(loadingHelperPrimary)}</h1>
        <div>{translate(loadingHelperSecondary)}</div>
      </div>
    </div>
  );
};

export default LoadingCommon;
