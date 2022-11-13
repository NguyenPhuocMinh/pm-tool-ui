import { DialogCustom, DialogTitleCustom } from '@utilities';
import {
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import { bindDialog } from 'material-ui-popup-state/hooks';

const SearchSetting = ({ popupState }) => {
  return (
    <DialogCustom
      {...bindDialog(popupState)}
      maxWidth="md"
      scroll="paper"
      aria-labelledby="search-dialog"
    >
      <DialogTitleCustom
        onClose={() => popupState.close()}
        id="search-dialog-title"
      >
        Modal title
      </DialogTitleCustom>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus>Save changes</Button>
      </DialogActions>
    </DialogCustom>
  );
};

export default SearchSetting;
