import { useTranslate } from '@hooks';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const SelectInput = (props) => {
  const {
    label,
    choices,
    source,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    required,
    className,
    size,
    sx
  } = props;

  // hooks
  const { translate } = useTranslate();

  return (
    <FormControl
      sx={{ ...sx }}
      className={className}
      required={required}
      error={errors[source] && touched[source]}
    >
      <InputLabel>{translate(label)}</InputLabel>
      <Select
        label={translate(label)}
        name={source}
        value={values[source]}
        onChange={handleChange}
        onBlur={handleBlur}
        size={size}
      >
        {choices &&
          choices.map((choice) => {
            return (
              <MenuItem key={choice.id} value={choice.id}>
                {translate(choice.name)}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>
        {errors[source] && touched[source] && errors[source]}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
