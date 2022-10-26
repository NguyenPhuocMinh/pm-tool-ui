import { TextField } from '@mui/material';
import { useTranslate } from '@hooks';

const TextInput = (props) => {
  const {
    label = 'TextInput',
    source,
    values,
    type,
    variant,
    margin = 'none',
    handleChange,
    handleBlur,
    errors,
    touched,
    required,
    multiline,
    rows,
    disabled,
    className,
    startAdornment,
    endAdornment,
    size = 'medium',
    sx
  } = props;

  const { translate } = useTranslate();

  return (
    <TextField
      label={translate(label)}
      variant={variant}
      margin={margin}
      type={type}
      name={source}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[source]}
      required={required}
      error={errors[source] && touched[source]}
      helperText={errors[source] && touched[source] && errors[source]}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      className={className}
      InputProps={{
        autoComplete: 'off',
        startAdornment,
        endAdornment
      }}
      sx={sx}
      size={size}
    />
  );
};

export default TextInput;
