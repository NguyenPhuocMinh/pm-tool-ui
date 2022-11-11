import { useState } from 'react';
import { useTranslate } from '@hooks';
import { LanguageSetting } from '@components/index';
import { Box, Tooltip, IconButton } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

const LanguageSection = () => {
  const [anchorLanguage, setAnchorLanguage] = useState(null);
  const openPopupLanguage = Boolean(anchorLanguage);

  // hooks
  const { translate } = useTranslate();

  // func
  const handleClickChangeLng = (event) => {
    setAnchorLanguage(event.currentTarget);
  };

  const handleCloseChangeLng = () => {
    setAnchorLanguage(null);
  };

  return (
    <Box width="auto" minWidth={50}>
      <Tooltip title={translate('toolbar.tooltip.change_language')}>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleClickChangeLng}
          sx={{
            ':hover': {
              background: 'none'
            },
            p: '10px'
          }}
        >
          <TranslateIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <LanguageSetting
        open={openPopupLanguage}
        anchorEl={anchorLanguage}
        handleClose={handleCloseChangeLng}
      />
    </Box>
  );
};

export default LanguageSection;
