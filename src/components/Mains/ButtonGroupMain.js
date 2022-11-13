import { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '@reduxStore/actions';
// material ui
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
// styles
import { makeStyles } from '@mui/styles';
import { TypoCommon } from '@utilities';
import constants from '@constants';
import { localForage } from '@utils';
import { get } from 'lodash';

const useStyles = makeStyles((theme) => ({
  selected: {
    color: (props) =>
      props.color
        ? `${props.color.hex} !important`
        : `${theme.palette.text.primary} !important`,
    borderColor: (props) =>
      props.color
        ? `${props.color.hex} !important`
        : `${theme.palette.text.primary} !important`
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

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  const classes = useStyles({ theme, color });

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
        <TypoCommon
          fontWeight={600}
          variant="body2"
          label="toolbar.setting.themes.light"
        />
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
        <TypoCommon
          fontWeight={600}
          variant="body2"
          label="toolbar.setting.themes.dark"
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ButtonGroupMain;
