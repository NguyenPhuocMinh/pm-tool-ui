import { useEffect, useState } from 'react';
// hooks
import { useTranslate } from '@hooks';
// redux
import { useDispatch } from 'react-redux';
import { changeTheme } from '@reduxStore/actions';
// material ui
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
// styles
import { makeStyles } from '@mui/styles';
import constants from '@constants';
import { localForage } from '@utils';

const useStyles = makeStyles((theme) => ({
  selected: {
    color: `${theme.palette.text.primary} !important`,
    borderColor: `${theme.palette.text.primary} !important`
  },
  rootIcon: {
    marginRight: '8px'
  }
}));

const ButtonGroupMain = () => {
  const themeLocalForage = localForage.getItemLocalForage(
    constants.LOCAL_FORAGE_KEYS.THEME
  );
  // hooks
  const dispatch = useDispatch();
  const { translate } = useTranslate();
  const [theme, setTheme] = useState(themeLocalForage);
  // func
  const handleChange = (event, newTheme) => {
    if (newTheme !== null) {
      setTheme(newTheme);
      localForage.setItem(constants.LOCAL_FORAGE_KEYS.THEME, newTheme);
    }
  };
  // render
  useEffect(() => {
    dispatch(changeTheme(theme));
  }, [theme, dispatch, changeTheme]);

  const classes = useStyles({ theme });

  return (
    <ToggleButtonGroup
      color="primary"
      value={theme}
      exclusive
      onChange={handleChange}
      fullWidth
    >
      <ToggleButton
        sx={{
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 700,
          justifyContent: 'center'
        }}
        classes={{
          selected: classes.selected
        }}
        value="light"
      >
        <WbSunnyIcon className={classes.rootIcon} />
        <Typography variant="inherit">
          {translate('toolbar.setting.themes.light')}
        </Typography>
      </ToggleButton>
      <ToggleButton
        sx={{
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 700,
          justifyContent: 'center'
        }}
        value="dark"
        classes={{
          selected: classes.selected
        }}
      >
        <NightsStayIcon className={classes.rootIcon} />
        <Typography variant="inherit">
          {translate('toolbar.setting.themes.dark')}
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ButtonGroupMain;
