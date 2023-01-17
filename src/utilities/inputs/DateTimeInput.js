import moment from 'moment';
import TextField from '@mui/material/TextField';
import { useTranslate } from '@hooks';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const DateTimeInput = ({
  label,
  source,
  values,
  setFieldValue,
  handleBlur,
  errors,
  touched,
  variant,
  disabled,
  readOnly,
  className
}) => {
  const { translate } = useTranslate();

  const onChange = (value) => {
    setFieldValue(source, value, true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        label={translate(label)}
        value={moment(values[source]).utc()}
        onChange={onChange}
        onBlur={handleBlur}
        disabled={disabled}
        readOnly={readOnly}
        className={className}
        renderInput={(params) => (
          <TextField
            name={source}
            error={errors[source] && touched[source]}
            helperText={errors[source] && touched[source] && errors[source]}
            variant={variant}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateTimeInput;
