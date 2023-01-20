import { useEffect, useState } from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { useTranslate } from '@hooks';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import constants from '@constants';

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
  const [locale, setLocale] = useState(constants.LANGUAGES.EN);
  const { translate, i18n } = useTranslate();

  const onChange = (value) => {
    setFieldValue(source, value, true);
  };

  useEffect(() => {
    if (i18n.language === 'vn') {
      setLocale(constants.LANGUAGES.VN);
    }
    return () => setLocale(constants.LANGUAGES.EN);
  }, [i18n.language]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
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
