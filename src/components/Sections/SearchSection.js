import { SearchSetting } from '@components/index';
import { useTranslate } from '@hooks';
import { useSelector } from 'react-redux';
import { Box, Paper, IconButton, InputBase, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { usePopupState, bindToggle } from 'material-ui-popup-state/hooks';
import { get } from 'lodash';

const SearchSection = () => {
  const { translate } = useTranslate();

  const popupState = usePopupState({
    variant: 'dialog',
    popupId: 'demo-popup-dialog'
  });

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  return (
    <Box width="auto" minWidth={50} mr={1}>
      <Paper
        {...bindToggle(popupState)}
        sx={{ p: '0px 4px', display: 'flex', alignItems: 'center', width: 256 }}
      >
        <IconButton
          type="button"
          sx={{ p: '10px', ':hover': { background: 'none' } }}
          aria-label="search"
        >
          <SearchIcon fontSize="small" />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={translate('common.search')}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          sx={{ p: '10px', color: color ? color.hex : 'inherit' }}
          aria-label="directions"
        >
          <DirectionsIcon fontSize="small" />
        </IconButton>
      </Paper>
      <SearchSetting popupState={popupState} />
    </Box>
  );
};

export default SearchSection;
