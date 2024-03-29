import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslate, useAuth } from '@hooks';
import { get, isEmpty } from 'lodash';
import {
  resetRecordsPermission,
  getAllPermissionAction,
  deletePermissionByIdAction,
  showPopup
} from '@reduxStore/actions';
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  PopupCommon,
  SearchInput,
  ButtonCreate,
  CardListCommon,
  TableGridCommon
} from '@utilities';
import { GridActionsCellItem } from '@mui/x-data-grid';
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

const PermissionList = () => {
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
    dispatch(getAllPermissionAction(queryOptions));
  }, [dispatch, queryOptions, refresh]);

  useEffect(() => {
    dispatch(resetRecordsPermission());
  }, []);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'permission.data', []),
      total: get(state, 'permission.total', 0),
      loading: get(state, 'permission.loading', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/permissions/edit/${id}`);
    },
    [navigate]
  );

  const handleShowPopupDelete = useCallback(
    (id, name, query) => () => {
      dispatch(
        showPopup({
          open: true,
          title: 'resources.permissions.popup.title',
          content: 'resources.permissions.popup.content',
          verifyName: 'resources.permissions.popup.verifyName',
          validator: () => validatorVerifyToDelete(translate, name),
          onSubmit: () => dispatch(deletePermissionByIdAction(id, query)),
          isLoading: loading,
          options: {
            permissionName: name
          }
        })
      );
    },
    [dispatch]
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
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'activated',
        headerName: translate('resources.permissions.fields.activated'),
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
          if (
            authAllowed({
              whoami,
              permission: menuPermissions.permissions.GET_ID
            })
          ) {
            return [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                onClick={handleShowPopupDelete(
                  params.id,
                  params.row.name,
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
      <CardListCommon resource="permissions" />
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
          placeholder="resources.permissions.search"
          className={classes.search}
          {...formProps}
        />
        {authAllowed({
          whoami,
          permission: menuPermissions.permissions.CREATE
        }) && (
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
                redirect="/permissions/create"
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

export default PermissionList;
