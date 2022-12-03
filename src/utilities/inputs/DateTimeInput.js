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
  handleChange,
  handleBlur,
  disabled,
  readOnly,
  className
}) => {
  const { translate } = useTranslate();

  const value = moment(values[source]).utc();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        label={translate(label)}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        readOnly={readOnly}
        className={className}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
};

export default DateTimeInput;
