import { useEffect, useState } from 'react';
// material ui
import { FormGroup, FormControlLabel, Tooltip } from '@mui/material';
// redux
import { useDispatch } from 'react-redux';
import { changeTheme } from '@reduxStore/actions';
// hooks
import { useTranslate } from '@hooks';
import { localForage } from '@utils';
import { ThemeSwitchMain } from '@components';
import constants from '@constants';

const ThemeSetting = () => {
  const themeLocalForage = localForage.getItemLocalForage(
    constants.LOCAL_FORAGE_KEYS.THEME
  );
  // hooks
  const dispatch = useDispatch();
  const { translate } = useTranslate();
  const [theme, setTheme] = useState(themeLocalForage);
  const [checked, setChecked] = useState(
    themeLocalForage === constants.THEMES.LIGHT ? false : true
  );
  // func
  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    setTheme(
      isChecked === false ? constants.THEMES.LIGHT : constants.THEMES.DARK
    );
    localForage.setItem(
      constants.LOCAL_FORAGE_KEYS.THEME,
      isChecked === false ? constants.THEMES.LIGHT : constants.THEMES.DARK
    );
  };
  // render
  useEffect(() => {
    dispatch(changeTheme(theme));
  }, [theme, dispatch, changeTheme]);

  return (
    <FormGroup>
      <Tooltip
        title={translate(`appBar.toolbar.setting.themes.${themeLocalForage}`)}
      >
        <FormControlLabel
          control={
            <ThemeSwitchMain
              size="medium"
              sx={{ m: 1 }}
              onChange={handleChange}
              checked={checked}
            />
          }
        />
      </Tooltip>
    </FormGroup>
  );
};

export default ThemeSetting;
