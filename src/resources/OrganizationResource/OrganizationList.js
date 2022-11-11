import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  showPopup,
  getAllOrganizationAction,
  deleteOrganizationByIdAction
} from '@reduxStore/actions';
import { get, isEmpty } from 'lodash';
import { useFormik } from 'formik';
import { useTranslate } from '@hooks';
import {
  NoRowsCommon,
  PopupCommon,
  SearchInput,
  ButtonCreate
} from '@components/index';
import constants from '@constants';
import { other, dateTimeFormat } from '@utils';
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridActionsCellItem, viVN, enUS } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const useStyles = makeStyles((_) => ({
  input: {
    width: 256
  },
  dataGridRoot: {
    '& .MuiIconButton-root': {
      border: 'none !important',
      '&:hover': {
        background: 'none !important'
      }
    }
  },
  search: {
    width: 256
  }
}));

const OrganizationList = () => {
  // states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState([
    {
      field: constants.SORT_DEFAULT,
      sort: constants.SORT_ORDER
    }
  ]);
  const [sort, setSort] = useState(sortModel[0]?.field);
  const [order, setOrder] = useState(sortModel[0]?.sort);

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

  const handleOnSortModelChange = useCallback((newSortModel) => {
    setSortModel(newSortModel);
    const _newSortModel = newSortModel[0];

    setSort(
      !isEmpty(_newSortModel) ? _newSortModel.field : constants.SORT_DEFAULT
    );
    setOrder(
      !isEmpty(_newSortModel) ? _newSortModel.sort : constants.SORT_ORDER
    );
  }, []);

  const dispatch = useDispatch();

  const initialValues = {
    search: ''
  };

  const formProps = useFormik({ initialValues });

  const queryOptions = useMemo(
    () => ({
      _start: page * pageSize,
      _end: page * pageSize + pageSize,
      _sort: sort,
      _order: order,
      search: formProps.values.search
    }),
    [page, pageSize, sort, order, formProps.values.search]
  );

  useEffect(() => {
    dispatch(getAllOrganizationAction(queryOptions));
  }, [dispatch, queryOptions]);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'organization.data', []),
      total: get(state, 'organization.total', 0),
      loading: get(state, 'organization.loading', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/organizations/edit/${id}`);
    },
    [navigate]
  );

  const handleShowPopupDelete = useCallback(
    (id, name, query) => () => {
      dispatch(
        showPopup({
          open: true,
          title: 'resources.organizations.popup.title',
          content: 'resources.organizations.popup.content',
          verifyName: 'resources.organizations.popup.verifyName',
          onSubmit: () => dispatch(deleteOrganizationByIdAction(id, query)),
          options: {
            organizationName: name
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
        headerName: translate('resources.organizations.fields.name'),
        flex: 0.5,
        resizable: false,
        filterable: false
      },
      {
        field: 'activated',
        headerName: translate('resources.organizations.fields.activated'),
        type: 'boolean',
        flex: 0.5,
        sortable: false,
        resizable: false,
        filterable: false,
        hideMenu: false
      },
      {
        field: 'createdAt',
        headerName: translate('resources.organizations.fields.createdAt'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: ({ value }) => value && dateTimeFormat(value)
      },
      {
        field: 'updatedAt',
        headerName: translate('resources.organizations.fields.updatedAt'),
        type: 'dateTime',
        flex: 0.5,
        resizable: false,
        filterable: false,
        hideMenu: false,
        valueGetter: ({ value }) => value && dateTimeFormat(value)
      },
      {
        field: 'actions',
        headerName: translate('common.actions.title'),
        type: 'actions',
        flex: 0.3,
        getActions: (params) => {
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
        <SearchInput
          label="common.search"
          id="search"
          source="search"
          size="small"
          placeholder="resources.organizations.search"
          className={classes.search}
          {...formProps}
        />
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
            <ButtonCreate redirect="/organizations/create" />
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
            sortModel={sortModel}
            onSortModelChange={handleOnSortModelChange}
            sortingMode="server"
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
      <PopupCommon />
    </Box>
  );
};

export default OrganizationList;
