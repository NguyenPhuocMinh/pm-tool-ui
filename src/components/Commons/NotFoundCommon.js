import classnames from 'classnames';
// core
import { useTranslate } from '@hooks';
// material ui
import History from '@mui/icons-material/History';
import HotTub from '@mui/icons-material/HotTub';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import TitleCommon from './TitleCommon';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      height: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      height: '100vh',
      marginTop: '-3em'
    }
  },
  icon: {
    width: '9em !important',
    height: '9em !important'
  },
  message: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    opacity: 0.5,
    margin: '0 1em'
  },
  toolbar: {
    textAlign: 'center',
    marginTop: '2em'
  }
}));

const NotFoundCommon = (props) => {
  const { className, title, navigate } = props;

  // hooks
  const classes = useStyles(props);
  const { translate } = useTranslate();

  return (
    <div className={classnames(classes.container, className)}>
      <TitleCommon defaultTitle={title} />
      <div className={classes.message}>
        <HotTub className={classes.icon} />
        <h1>{translate('page.not_found.name')}</h1>
        <div>{translate('page.not_found.message')}</div>
      </div>
      <div className={classes.toolbar}>
        <Button
          variant="contained"
          startIcon={<History />}
          onClick={() => navigate('/')}
        >
          {translate('common.button.back')}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundCommon;
