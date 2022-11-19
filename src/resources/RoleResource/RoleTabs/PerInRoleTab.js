import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPermissionsByRoleIDAction } from '@reduxStore/actions';
import { get, isEmpty } from 'lodash';
import { useTranslate } from '@hooks';
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridActionsCellItem, viVN, enUS } from '@mui/x-data-grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { NoRowsCommon } from '@utilities';
import constants from '@constants';
import { other } from '@utils';

const useStyles = makeStyles({
  input: {
    width: 350
  },
  dataGridRoot: {
    '& .MuiIconButton-root': {
      border: 'none !important',
      '&:hover': {
        background: 'none !important'
      }
    }
  }
});

const PerInRoleTab = (props) => {
  const { roleID } = props;
  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handleOnPageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOnPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const queryOptions = useMemo(
    () => ({
      _start: page * pageSize,
      _end: page * pageSize + pageSize
    }),
    [page, pageSize]
  );

  useEffect(() => {
    dispatch(getPermissionsByRoleIDAction(roleID, queryOptions));
  }, [dispatch, roleID, queryOptions]);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'role.dataPermissionsInRole', []),
      total: get(state, 'role.totalPermissionsInRole', 0),
      loading: get(state, 'role.loading', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/permissions/edit/${id}`);
    },
    [navigate]
  );

  const columns = useMemo(() => {
    return [
      {
        field: 'name',
        headerName: translate('resources.permissions.fields.name'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'description',
        headerName: translate('resources.permissions.fields.description'),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: translate('common.actions.title'),
        flex: 0.5,
        getActions: (params) => {
          return [
            <GridActionsCellItem
              icon={<BorderColorIcon />}
              onClick={handleEdit(params.id)}
              label="Edit"
              key={params.id}
            />
          ];
        }
      }
    ];
  }, [handleEdit, queryOptions, translate, i18n.language]);

  return (
    <Box sx={{ minWidth: 400 }}>
      <Paper elevation={3}>
        <Box style={{ height: 400, width: '100%' }}>
          <DataGrid
            localeText={
              i18n.language === constants.LANGUAGES.EN
                ? enUS.components.MuiDataGrid.defaultProps.localeText
                : viVN.components.MuiDataGrid.defaultProps.localeText
            }
            loading={loading}
            rows={data}
            rowCount={total}
            columns={columns}
            page={page}
            pageSize={pageSize}
            onPageChange={handleOnPageChange}
            onPageSizeChange={handleOnPageSizeChange}
            rowsPerPageOptions={[5, 10, 20, 100]}
            pagination
            paginationMode="server"
            disableColumnMenu
            components={{
              NoRowsOverlay: NoRowsCommon
            }}
            classes={{
              root: classes.dataGridRoot
            }}
            {...other}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default PerInRoleTab;
