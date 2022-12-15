import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate, useAuth } from '@hooks';
import {
  resetRecordsUser,
  getAllUserAction,
  deleteUserByIdAction,
  showPopup
} from '@reduxStore/actions';
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  PopupCommon,
  SearchInput,
  ButtonCreate,
  CardListCommon,
  TableGridCommon
} from '@utilities';
import { dateTimeFormat, authAllowed } from '@utils';
import { validatorVerifyToDelete } from '@validators';
import { menuPermissions } from '@permissions';

const useStyles = makeStyles((_) => ({
  input: {
    width: 256
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
  const { whoami } = useAuth();

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
          if (
            authAllowed({ whoami, permission: menuPermissions.users.GET_ID })
          ) {
            return [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                onClick={handleShowPopupDelete(
                  params.id,
                  fullName,
                  queryOptions
                )}
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
          return [];
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
      <CardListCommon resource="users" />
      <Box
        sx={{
          marginBottom: '1em',
          marginTop: '1em',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <SearchInput
          label="common.search"
          id="search"
          source="search"
          size="small"
          variant="standard"
          placeholder="resources.users.search"
          className={classes.search}
          {...formProps}
        />
        {authAllowed({ whoami, permission: menuPermissions.users.CREATE }) && (
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
                label="common.label.create"
                redirect="/users/create"
              />
            </Box>
          </Box>
        )}
      </Box>
      <Paper elevation={3}>
        <TableGridCommon
          loading={loading}
          rows={data}
          rowCount={total}
          columns={columns}
          page={page}
          pageSize={pageSize}
          onPageChange={handleOnPageChange}
          onPageSizeChange={handleOnPageSizeChange}
        />
      </Paper>
      <PopupCommon />
    </Box>
  );
};

export default UserList;
