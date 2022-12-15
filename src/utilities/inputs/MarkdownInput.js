import { useTranslate } from '@hooks';
import { FormControl, FormLabel, FormHelperText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MDEditor from '@uiw/react-md-editor';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      border: '1px solid rgb(17, 24, 39)'
    },
    border: '1px solid #e1c7b4',
    borderRadius: '4px'
  }
});

const MarkdownInput = (props) => {
  const {
    label,
    source,
    values,
    errors,
    touched,
    required,
    setFieldValue,
    setTouched,
    className
  } = props;
  const isError = (errors[source] && touched[source]) || false;
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();

  const handleChange = (content) => {
    setFieldValue(source, content);
  };

  const handleBlur = (e) => {
    setTouched({ [source]: e.isTrusted });
  };

  return (
    <FormControl
      sx={{
        width: '100%',
        ':hover': {
          color: '#607d8b'
        }
      }}
      className={className}
      error={isError}
    >
      <FormLabel sx={{ marginBottom: '5px' }} required={required}>
        {translate(label)}
      </FormLabel>
      <MDEditor
        id={source}
        name={source}
        height={500}
        value={values[source]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={classes.root}
      />
      <FormHelperText>{isError && errors[source]}</FormHelperText>
    </FormControl>
  );
};

export default MarkdownInput;
