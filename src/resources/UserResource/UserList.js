import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate } from '@hooks';
import {
  resetRecordsUser,
  getAllUserAction,
  deleteUserByIdAction,
  showPopup
} from '@reduxStore/actions';
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridActionsCellItem, viVN, enUS } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { NoRowsCommon, LoadingCommon, PopupCommon } from '@components/commons';
import { ButtonCreate } from '@components/buttons';
import { SearchInput } from '@components/inputs';
import constants from '@constants';
import { other, dateTimeFormat } from '@utils';
import { validatorVerifyToDelete } from '@validators';

const useStyles = makeStyles((_) => ({
  input: {
    width: 256
  },
  dataGridRoot: {
    '& .MuiIconButton-root': {
      border: 'none !important'
    }
  },
  search: {
    width: 256
  }
}));

const UserList = () => {
  // states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
  const navigate = useNavigate();

  const handleOnPageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOnPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const dispatch = useDispatch();

  const initialValues = {
    search: ''
  };

  const formProps = useFormik({ initialValues });

  const queryOptions = useMemo(
    () => ({
      _start: page * pageSize,
      _end: page * pageSize + pageSize,
      search: formProps.values.search
    }),
    [page, pageSize, formProps.values.search]
  );

  const { refresh } = useSelector((state) => {
    return {
      refresh: get(state, 'common.refresh')
    };
  });

  useEffect(() => {
    dispatch(getAllUserAction(queryOptions));
  }, [dispatch, queryOptions, refresh]);

  useEffect(() => {
    dispatch(resetRecordsUser());
  }, []);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'user.data', []),
      total: get(state, 'user.total', 0),
      loading: get(state, 'user.loading', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/users/edit/${id}`);
    },
    [navigate]
  );

  const handleShowPopupDelete = useCallback(
    (id, name, query) => () => {
      dispatch(
        showPopup({
          open: true,
          title: 'resources.users.popup.title',
          content: 'resources.users.popup.content',
          verifyName: 'resources.users.popup.verifyName',
          validator: () => validatorVerifyToDelete(translate, name),
          onSubmit: () => dispatch(deleteUserByIdAction(id, query)),
          isLoading: loading,
          options: {
            userName: name
          }
        })
      );
    },
    [dispatch]
  );

  const columns = useMemo(() => {
    return [
      {
        field: 'fullName',
        headerName: translate('resources.users.fields.fullName'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueGetter: (params) =>
          `${params.row.firstName || ''} ${params.row.lastName || ''}`
      },
      {
        field: 'email',
        headerName: translate('resources.users.fields.email'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'isAdmin',
        headerName: translate('resources.users.fields.isAdmin'),
        type: 'boolean',
        flex: 0.5,
        sortable: false,
        resizable: false,
        filterable: false,
        hideMenu: false
      },
      {
        field: 'createdAt',
        headerName: translate('resources.permissions.fields.createdAt'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: ({ value }) => value && dateTimeFormat(value)
      },
      {
        field: 'updatedAt',
        headerName: translate('resources.permissions.fields.updatedAt'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: ({ value }) => value && dateTimeFormat(value)
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: translate('common.actions.title'),
        flex: 0.5,
        getActions: (params) => {
          const fullName = `${params.row.lastName} ${params.row.firstName}`;
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              onClick={handleShowPopupDelete(params.id, fullName, queryOptions)}
              label="common.label.delete"
              key={params.id}
            />,
            <GridActionsCellItem
              icon={<BorderColorIcon />}
              onClick={handleEdit(params.id)}
              label="common.label.edit"
              key={params.id}
            />
          ];
        }
      }
    ];
  }, [
    handleEdit,
    handleShowPopupDelete,
    queryOptions,
    translate,
    i18n.language
  ]);

  return (
    <Box display="block">
      <Box
        sx={{
          marginBottom: '1em',
          marginTop: '1em',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Paper elevation={1}>
          <SearchInput
            label="common.search"
            id="search"
            source="search"
            size="small"
            placeholder="resources.users.search"
            className={classes.search}
            {...formProps}
          />
        </Paper>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },
            flexWrap: 'wrap',
            justifyItems: 'center'
          }}
        >
          <Box width="auto" minWidth={50}>
            <ButtonCreate
              label="common.button.create"
              redirect="/users/create"
            />
          </Box>
        </Box>
      </Box>
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
              NoRowsOverlay: NoRowsCommon,
              LoadingOverlay: LoadingCommon
            }}
            classes={{
              root: classes.dataGridRoot
            }}
            {...other}
          />
        </Box>
      </Paper>
      <PopupCommon />
    </Box>
  );
};

export default UserList;
