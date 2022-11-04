import { useTranslate } from '@hooks';
// material ui
import { TextField, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { isEmpty } from 'lodash';

const SearchInput = (props) => {
  const {
    label,
    placeholder,
    source,
    values,
    type,
    variant,
    margin = 'none',
    size = 'medium',
    handleChange,
    handleBlur,
    handleReset,
    className,
    sx
  } = props;

  const { translate } = useTranslate();

  const handleOnMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      label={translate(label)}
      placeholder={translate(placeholder)}
      variant={variant}
      margin={margin}
      size={size}
      type={type}
      name={source}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[source]}
      className={className}
      InputProps={{
        autoComplete: 'off',
        endAdornment: (
          <InputAdornment position="end">
            {isEmpty(values[source]) ? (
              <SearchIcon />
            ) : (
              <IconButton
                onClick={handleReset}
                onMouseDown={handleOnMouseDown}
                edge="end"
                sx={{
                  border: 'none !important'
                }}
              >
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        )
      }}
      sx={sx}
    />
  );
};

export default SearchInput;
