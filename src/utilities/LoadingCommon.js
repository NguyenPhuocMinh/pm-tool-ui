import { useTranslate } from '@hooks';
import classnames from 'classnames';
import { CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
    margin: '0.5em 1em'
  }
}));

const LoadingCommon = (props) => {
  const { className, loadMsg = 'common.messages.loadMsg' } = props;
  const classes = useStyles(props);
  const { translate } = useTranslate();
  return (
    <div className={classnames(classes.container, className)}>
      <div className={classes.message}>
        <CircularProgress className={classes.icon} color="primary" />
        <Typography variant="subtitle2">{translate(loadMsg)}</Typography>
      </div>
    </div>
  );
};

export default LoadingCommon;
