import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid, viVN, enUS } from '@mui/x-data-grid';
import { useTranslate } from '@hooks';
import { NoRowsCommon, LoadingCommon } from '@utilities';
import { other } from '@utils';
import constants from '@constants';

const useStyles = makeStyles((_) => ({
  root: {
    '& .MuiIconButton-root': {
      border: 'none !important',
      '&:hover': {
        background: 'none !important'
      }
    }
  }
}));

const TableGridCommon = ({
  loading,
  rows,
  rowCount,
  columns,
  page,
  pageSize,
  sortModel,
  onPageChange,
  onPageSizeChange,
  onSortModelChange,
  checkboxSelection,
  disableColumnMenu = true,
  onSelectionModelChange
}) => {
  const classes = useStyles();
  const { i18n } = useTranslate();

  return (
    <Box style={{ height: 400, width: '100%' }}>
      <DataGrid
        localeText={
          i18n.language === constants.LANGUAGES.EN
            ? enUS.components.MuiDataGrid.defaultProps.localeText
            : viVN.components.MuiDataGrid.defaultProps.localeText
        }
        loading={loading}
        rows={rows}
        rowCount={rowCount}
        columns={columns}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        rowsPerPageOptions={[5, 10, 20, 100]}
        pagination
        paginationMode="server"
        sortingMode="server"
        checkboxSelection={checkboxSelection}
        onSelectionModelChange={onSelectionModelChange}
        disableColumnMenu={disableColumnMenu}
        components={{
          NoRowsOverlay: NoRowsCommon,
          LoadingOverlay: LoadingCommon
        }}
        classes={{
          root: classes.root
        }}
        {...other}
      />
    </Box>
  );
};

export default TableGridCommon;
