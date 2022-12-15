import { useTranslate } from '@hooks';
import { Box, FormLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MDEditor from '@uiw/react-md-editor';

const useStyles = makeStyles({
  root: {
    border: '1px solid #faf6f3',
    borderRadius: '4px',
    fontFamily: 'Josefin Sans'
  }
});

const MarkdownField = (props) => {
  const { label, value } = props;
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();

  return (
    <Box
      sx={{
        ':hover': {
          color: '#607d8b'
        }
      }}
    >
      <FormLabel>{translate(label)}</FormLabel>
      <MDEditor.Markdown
        source={value}
        linkTarget="_blank"
        className={classes.root}
      />
    </Box>
  );
};

export default MarkdownField;
