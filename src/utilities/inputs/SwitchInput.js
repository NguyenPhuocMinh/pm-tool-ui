import { useTranslate } from '@hooks';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
// material ui
import { FormControlLabel, Switch } from '@mui/material';

const SwitchInput = (props) => {
  const {
    label,
    source,
    values,
    value,
    handleChange,
    handleBlur,
    required,
    className,
    defaultChecked,
    disabled,
    disableRipple,
    size,
    sx
  } = props;

  const { translate } = useTranslate();

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  return (
    <FormControlLabel
      control={
        <Switch
          name={source}
          value={value}
          checked={values[source]}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          className={className}
          defaultChecked={defaultChecked}
          disabled={disabled}
          disableRipple={disableRipple}
          size={size}
          sx={{
            '.MuiSwitch-thumb': {
              color: (theme) => color?.hex ?? theme.palette.primary.main
            },
            '.Mui-checked': {
              color: (theme) => color?.hex ?? theme.palette.primary.main
            },
            '.MuiSwitch-track': {
              background: (theme) =>
                `${color?.hex} !important` ?? theme.palette.primary.main
            },
            ...sx
          }}
        />
      }
      label={translate(label)}
    />
  );
};

export default SwitchInput;
