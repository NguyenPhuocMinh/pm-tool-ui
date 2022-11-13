// redux
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '@reduxStore/actions';
// mui
import { Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReactCountryFlag from 'react-country-flag';
// utils
import { languages, localForage } from '@utils';
// hooks
import { useTranslate } from '@hooks';
import { get } from 'lodash';
import constants from '@constants';

const useStyles = makeStyles((_) => ({
  selected: {
    background: 'rgb(0 0 0 / 12%) !important'
  }
}));

const LanguageSetting = (props) => {
  const { open, anchorEl, handleClose } = props;

  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
  const dispatch = useDispatch();

  // func
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    localForage.setItem(constants.LOCAL_FORAGE_KEYS.LANGUAGE, language);
    dispatch(changeLanguage(language));
  };

  // store
  const { language } = useSelector((state) => {
    return {
      language: get(state, 'common.language')
    };
  });

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0
          }
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {languages.map((item) => (
        <MenuItem
          key={item.name}
          onClick={() => handleChangeLanguage(item.name)}
          selected={language === item.name}
          classes={{
            selected: classes.selected
          }}
          disabled={language === item.name}
        >
          <ListItemIcon>
            <ReactCountryFlag
              svg
              countryCode={item.countryCode}
              style={{
                fontSize: '1.25rem',
                width: '1em',
                height: '1em'
              }}
            />
          </ListItemIcon>
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'Josefin Sans',
              fontWeight: 'bold'
            }}
          >
            {translate(`toolbar.language.${item.name}`)}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default LanguageSetting;
