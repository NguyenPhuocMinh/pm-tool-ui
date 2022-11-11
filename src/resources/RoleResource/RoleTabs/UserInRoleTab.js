import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslate } from '@hooks';
import { get, isEmpty } from 'lodash';
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getUsersByRoleNameAction } from '@reduxStore/actions';
import { NoRowsCommon } from '@components';
import { DataGrid, GridActionsCellItem, viVN, enUS } from '@mui/x-data-grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { other } from '@utils';
import constants from '@constants';

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

const UserInRoleTab = (props) => {
  const { roleName } = props;
  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
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

  const dispatch = useDispatch();

  const queryOptions = useMemo(
    () => ({
      _start: page * pageSize,
      _end: page * pageSize + pageSize
    }),
    [page, pageSize]
  );

  useEffect(() => {
    dispatch(getUsersByRoleNameAction(roleName));
  }, [dispatch, roleName, queryOptions]);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'role.dataUsersInRole', []),
      total: get(state, 'role.totalUsersInRole', 0),
      loading: get(state, 'role.loadingUsersInRole', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/users/edit/${id}`);
    },
    [navigate]
  );

  const columns = useMemo(() => {
    return [
      {
        field: 'userName',
        headerName: translate('resources.users.fields.userName'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'lastName',
        headerName: translate('resources.users.fields.lastName'),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'firstName',
        headerName: translate('resources.users.fields.firstName'),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'email',
        headerName: translate('resources.users.fields.email'),
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

export default UserInRoleTab;
