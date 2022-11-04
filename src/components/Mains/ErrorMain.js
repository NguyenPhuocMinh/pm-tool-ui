import { Fragment } from 'react';
import classnames from 'classnames';
// material ui
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import History from '@mui/icons-material/History';
import ErrorIcon from '@mui/icons-material/Report';
import {
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslate } from '@hooks';
import TitleCommon from './TitleMain';
// hooks

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '1em'
    },
    fontFamily: 'Roboto, sans-serif',
    opacity: 0.5
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    width: '2em',
    height: '2em',
    marginRight: '0.5em'
  },
  panel: {
    marginTop: '1em',
    maxWidth: '60em'
  },
  panelDetails: {
    whiteSpace: 'pre-wrap'
  },
  toolbar: {
    marginTop: '2em'
  },
  advice: {
    marginTop: '2em'
  }
}));

const ErrorMain = (props) => {
  const { error, resetErrorBoundary, className, title, ...rest } = props;

  // hooks
  const classes = useStyles(props);
  const { translate } = useTranslate();

  return (
    <Fragment>
      {title && <TitleCommon defaultTitle={title} />}
      <div className={classnames(classes.container, className)} {...rest}>
        <h1 className={classes.title} role="alert">
          <ErrorIcon className={classes.icon} />
          {translate('page.error.name')}
        </h1>
        <div>{translate('page.error.message')}</div>
        {process.env.NODE_ENV !== 'production' && (
          <>
            <Accordion className={classes.panel}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {translate(error.toString(), {
                  _: error.toString()
                })}
              </AccordionSummary>
              {error && (
                <AccordionDetails className={classes.panelDetails}>
                  {error.stack}
                </AccordionDetails>
              )}
            </Accordion>
            <div className={classes.advice}>
              <Typography align="center">
                {translate('page.error.message_text')}
              </Typography>
              <Typography component="div">
                <ul>
                  <li>
                    {translate('page.error.search_on')}
                    <a href="https://stackoverflow.com/questions/tagged/react">
                      StackOverflow
                    </a>
                    {translate('page.error.community_answers')}
                  </li>
                  <li>
                    {translate('page.error.message_help')}
                    <a href="https://reactjs.org/docs/error-boundaries.html">
                      React Error Boundaries
                    </a>
                  </li>
                </ul>
              </Typography>
            </div>
          </>
        )}
        <div className={classes.toolbar}>
          <Button
            variant="contained"
            startIcon={<History />}
            onClick={resetErrorBoundary}
          >
            {translate('common.button.back')}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ErrorMain;
